const { Quiz, QuizAttempt, User, Notification } = require('../models');

// @desc    Create quiz
// @route   POST /api/quizzes
// @access  Private (Teacher only)
exports.createQuiz = async (req, res) => {
  try {
    const { title, description, subject, gradeLevel, questions, timeLimit, passingScore, totalPoints, allowRetake, showCorrectAnswers, dueDate } = req.body;

    const quiz = await Quiz.create({
      teacherId: req.user.id,
      title,
      description,
      subject,
      gradeLevel,
      questions,
      timeLimit,
      passingScore,
      totalPoints,
      allowRetake,
      showCorrectAnswers,
      dueDate
    });

    res.status(201).json({
      success: true,
      message: 'Quiz created successfully',
      data: quiz
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create quiz',
      error: error.message
    });
  }
};

// @desc    Get all quizzes
// @route   GET /api/quizzes
// @access  Private
exports.getQuizzes = async (req, res) => {
  try {
    const { subject, gradeLevel, status, teacherId } = req.query;
    
    const where = {};
    if (subject) where.subject = subject;
    if (gradeLevel) where.gradeLevel = gradeLevel;
    if (status) where.status = status;
    if (teacherId) where.teacherId = teacherId;

    // If student, only show published quizzes
    if (req.user.role === 'student' || req.user.role === 'parent') {
      where.status = 'published';
    }

    const quizzes = await Quiz.findAll({
      where,
      include: [
        {
          model: User,
          as: 'teacher',
          attributes: ['id', 'firstName', 'lastName']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    // Remove correct answers for students
    if (req.user.role === 'student' || req.user.role === 'parent') {
      quizzes.forEach(quiz => {
        if (!quiz.showCorrectAnswers) {
          quiz.questions = quiz.questions.map(q => {
            const { correctAnswer, ...rest } = q;
            return rest;
          });
        }
      });
    }

    res.status(200).json({
      success: true,
      count: quizzes.length,
      data: quizzes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch quizzes',
      error: error.message
    });
  }
};

// @desc    Get single quiz
// @route   GET /api/quizzes/:id
// @access  Private
exports.getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'teacher',
          attributes: ['id', 'firstName', 'lastName']
        }
      ]
    });

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // Remove correct answers for students if not allowed
    if ((req.user.role === 'student' || req.user.role === 'parent') && !quiz.showCorrectAnswers) {
      quiz.questions = quiz.questions.map(q => {
        const { correctAnswer, ...rest } = q;
        return rest;
      });
    }

    res.status(200).json({
      success: true,
      data: quiz
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch quiz',
      error: error.message
    });
  }
};

// @desc    Update quiz
// @route   PUT /api/quizzes/:id
// @access  Private (Teacher - own quizzes only)
exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    if (quiz.teacherId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this quiz'
      });
    }

    await quiz.update(req.body);

    res.status(200).json({
      success: true,
      message: 'Quiz updated successfully',
      data: quiz
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update quiz',
      error: error.message
    });
  }
};

// @desc    Delete quiz
// @route   DELETE /api/quizzes/:id
// @access  Private (Teacher - own quizzes only)
exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    if (quiz.teacherId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this quiz'
      });
    }

    await quiz.destroy();

    res.status(200).json({
      success: true,
      message: 'Quiz deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete quiz',
      error: error.message
    });
  }
};

// @desc    Publish quiz
// @route   PUT /api/quizzes/:id/publish
// @access  Private (Teacher - own quizzes only)
exports.publishQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    if (quiz.teacherId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to publish this quiz'
      });
    }

    await quiz.update({
      status: 'published',
      publishedAt: new Date()
    });

    res.status(200).json({
      success: true,
      message: 'Quiz published successfully',
      data: quiz
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to publish quiz',
      error: error.message
    });
  }
};

// @desc    Start quiz attempt
// @route   POST /api/quizzes/:id/attempt
// @access  Private (Student only)
exports.startQuizAttempt = async (req, res) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    if (quiz.status !== 'published') {
      return res.status(400).json({
        success: false,
        message: 'Quiz is not published'
      });
    }

    // Check if already attempted
    const existingAttempt = await QuizAttempt.findOne({
      where: {
        quizId: quiz.id,
        studentId: req.user.id,
        status: 'in_progress'
      }
    });

    if (existingAttempt) {
      return res.status(400).json({
        success: false,
        message: 'You have an ongoing attempt',
        data: existingAttempt
      });
    }

    // Check if retake is allowed
    if (!quiz.allowRetake) {
      const completedAttempt = await QuizAttempt.findOne({
        where: {
          quizId: quiz.id,
          studentId: req.user.id,
          status: 'completed'
        }
      });

      if (completedAttempt) {
        return res.status(400).json({
          success: false,
          message: 'Retake not allowed for this quiz'
        });
      }
    }

    const attempt = await QuizAttempt.create({
      quizId: quiz.id,
      studentId: req.user.id,
      totalQuestions: quiz.questions.length,
      answers: {}
    });

    res.status(201).json({
      success: true,
      message: 'Quiz attempt started',
      data: attempt
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to start quiz attempt',
      error: error.message
    });
  }
};

// @desc    Submit quiz attempt
// @route   PUT /api/quizzes/attempts/:id/submit
// @access  Private (Student only)
exports.submitQuizAttempt = async (req, res) => {
  try {
    const { answers } = req.body;
    const attempt = await QuizAttempt.findByPk(req.params.id, {
      include: [{ model: Quiz, as: 'quiz' }]
    });

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: 'Quiz attempt not found'
      });
    }

    if (attempt.studentId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    if (attempt.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Quiz already submitted'
      });
    }

    // Calculate score
    let correctAnswers = 0;
    attempt.quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = (correctAnswers / attempt.quiz.questions.length) * 100;
    const timeSpent = Math.floor((new Date() - new Date(attempt.startedAt)) / 1000);

    await attempt.update({
      answers,
      score,
      correctAnswers,
      timeSpent,
      completedAt: new Date(),
      status: 'completed'
    });

    res.status(200).json({
      success: true,
      message: 'Quiz submitted successfully',
      data: attempt
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to submit quiz',
      error: error.message
    });
  }
};

// @desc    Get student's quiz attempts
// @route   GET /api/quizzes/my-attempts
// @access  Private (Student only)
exports.getMyAttempts = async (req, res) => {
  try {
    const attempts = await QuizAttempt.findAll({
      where: { studentId: req.user.id },
      include: [
        {
          model: Quiz,
          as: 'quiz',
          include: [
            {
              model: User,
              as: 'teacher',
              attributes: ['id', 'firstName', 'lastName']
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: attempts.length,
      data: attempts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch quiz attempts',
      error: error.message
    });
  }
};
