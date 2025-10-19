const aiService = require('../utils/aiService');
const { Module, Quiz, Assignment, Submission, User, StudentProfile, QuizAttempt, Enrollment } = require('../models');
const { Op } = require('sequelize');

// @desc    Generate quiz questions using AI
// @route   POST /api/ai/generate-quiz
// @access  Private (Teacher only)
exports.generateQuiz = async (req, res) => {
  try {
    const { topic, difficulty, gradeLevel, numQuestions } = req.body;

    if (!topic || !difficulty || !gradeLevel) {
      return res.status(400).json({
        success: false,
        message: 'Topic, difficulty, and grade level are required'
      });
    }

    const questions = await aiService.generateQuizQuestions(
      topic,
      difficulty,
      gradeLevel,
      numQuestions || 5
    );

    // Transform questions to match our quiz format
    const formattedQuestions = questions.map((q, index) => ({
      id: index + 1,
      question: q.question,
      type: 'multiple-choice',
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      points: 1
    }));

    res.status(200).json({
      success: true,
      message: 'Quiz questions generated successfully',
      data: {
        questions: formattedQuestions,
        totalPoints: formattedQuestions.length
      }
    });
  } catch (error) {
    console.error('Generate quiz error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate quiz questions',
      error: error.message
    });
  }
};

// @desc    Get AI feedback for assignment submission
// @route   POST /api/ai/assignment-feedback/:submissionId
// @access  Private (Teacher only)
exports.getAssignmentFeedback = async (req, res) => {
  try {
    const submission = await Submission.findByPk(req.params.submissionId, {
      include: [
        {
          model: Assignment,
          as: 'assignment'
        }
      ]
    });

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    // Check authorization
    if (submission.assignment.teacherId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    const feedback = await aiService.generateAssignmentFeedback(
      submission.assignment.title,
      submission.assignment.instructions,
      submission.content,
      submission.assignment.totalPoints
    );

    res.status(200).json({
      success: true,
      message: 'AI feedback generated successfully',
      data: feedback
    });
  } catch (error) {
    console.error('Assignment feedback error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate feedback',
      error: error.message
    });
  }
};

// @desc    Get personalized content recommendations
// @route   GET /api/ai/recommendations
// @access  Private (Student only)
exports.getRecommendations = async (req, res) => {
  try {
    // Get student profile
    const studentProfile = await StudentProfile.findOne({
      where: { userId: req.user.id }
    });

    // Get enrolled modules
    const enrollments = await Enrollment.findAll({
      where: { studentId: req.user.id },
      include: [{ model: Module, as: 'module' }],
      order: [['createdAt', 'DESC']],
      limit: 5
    });

    // Get quiz attempts
    const quizAttempts = await QuizAttempt.findAll({
      where: { studentId: req.user.id },
      order: [['createdAt', 'DESC']],
      limit: 5
    });

    // Get available modules (not enrolled)
    const enrolledModuleIds = enrollments.map(e => e.moduleId);
    const availableModules = await Module.findAll({
      where: {
        status: 'published',
        id: { [Op.notIn]: enrolledModuleIds }
      },
      limit: 20
    });

    // Build recent activity summary
    const recentActivity = `
Recent Enrollments: ${enrollments.map(e => e.module?.title).join(', ') || 'None'}
Recent Quiz Scores: ${quizAttempts.map(a => `${a.score}%`).join(', ') || 'None'}
    `.trim();

    const recommendations = await aiService.generateContentRecommendations(
      {
        gradeLevel: studentProfile?.gradeLevel || req.user.gradeLevel || 'Not specified',
        interests: studentProfile?.interests || [],
        strengths: studentProfile?.strengths || [],
        goals: studentProfile?.goals || []
      },
      availableModules,
      recentActivity
    );

    // Enrich recommendations with full module data
    const enrichedRecommendations = recommendations.recommendations.map(rec => {
      const module = availableModules.find(m => m.id === rec.moduleId);
      return {
        ...rec,
        module
      };
    }).filter(rec => rec.module); // Filter out any that didn't match

    res.status(200).json({
      success: true,
      message: 'Recommendations generated successfully',
      data: enrichedRecommendations
    });
  } catch (error) {
    console.error('Recommendations error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate recommendations',
      error: error.message
    });
  }
};

// @desc    AI Study Assistant - Answer questions
// @route   POST /api/ai/study-assistant
// @access  Private (Student only)
exports.studyAssistant = async (req, res) => {
  try {
    const { question, moduleId } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: 'Question is required'
      });
    }

    let context = {};

    // If moduleId provided, get module content for context
    if (moduleId) {
      const module = await Module.findByPk(moduleId);
      if (module) {
        context.moduleContent = typeof module.content === 'string' 
          ? module.content 
          : JSON.stringify(module.content).substring(0, 1000); // Limit context size
      }
    }

    const answer = await aiService.answerStudentQuestion(question, context);

    res.status(200).json({
      success: true,
      message: 'Answer generated successfully',
      data: {
        question,
        answer,
        timestamp: new Date()
      }
    });
  } catch (error) {
    console.error('Study assistant error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate answer',
      error: error.message
    });
  }
};

// @desc    Get personalized study tips
// @route   GET /api/ai/study-tips
// @access  Private (Student only)
exports.getStudyTips = async (req, res) => {
  try {
    // Get student's quiz attempts
    const quizAttempts = await QuizAttempt.findAll({
      where: { studentId: req.user.id },
      include: [{ model: Quiz, as: 'quiz' }]
    });

    // Get student's submissions
    const submissions = await Submission.findAll({
      where: { studentId: req.user.id },
      include: [{ model: Assignment, as: 'assignment' }]
    });

    // Calculate performance metrics
    const avgQuizScore = quizAttempts.length > 0
      ? quizAttempts.reduce((sum, a) => sum + (a.score || 0), 0) / quizAttempts.length
      : 0;

    const completionRate = submissions.length > 0
      ? (submissions.filter(s => s.status === 'graded').length / submissions.length) * 100
      : 0;

    const subjects = [...new Set([
      ...quizAttempts.map(a => a.quiz?.subject).filter(Boolean),
      ...submissions.map(s => s.assignment?.subject).filter(Boolean)
    ])];

    // Identify struggling areas (quiz scores below 70%)
    const strugglingAreas = [...new Set(
      quizAttempts
        .filter(a => a.score < 70)
        .map(a => a.quiz?.subject)
        .filter(Boolean)
    )];

    // Identify strong areas (quiz scores above 85%)
    const strongAreas = [...new Set(
      quizAttempts
        .filter(a => a.score >= 85)
        .map(a => a.quiz?.subject)
        .filter(Boolean)
    )];

    const performanceData = {
      avgQuizScore: Math.round(avgQuizScore),
      completionRate: Math.round(completionRate),
      subjects,
      strugglingAreas,
      strongAreas
    };

    const tips = await aiService.generateStudyTips(performanceData);

    res.status(200).json({
      success: true,
      message: 'Study tips generated successfully',
      data: {
        performance: performanceData,
        tips: tips.tips
      }
    });
  } catch (error) {
    console.error('Study tips error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate study tips',
      error: error.message
    });
  }
};

// @desc    Summarize module content
// @route   POST /api/ai/summarize/:moduleId
// @access  Private
exports.summarizeModule = async (req, res) => {
  try {
    const module = await Module.findByPk(req.params.moduleId);

    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Module not found'
      });
    }

    // Check if student is enrolled or if user is teacher/admin
    if (req.user.role === 'student') {
      const enrollment = await Enrollment.findOne({
        where: {
          studentId: req.user.id,
          moduleId: module.id
        }
      });

      if (!enrollment) {
        return res.status(403).json({
          success: false,
          message: 'You must be enrolled to access this module'
        });
      }
    }

    const contentToSummarize = typeof module.content === 'string'
      ? module.content
      : JSON.stringify(module.content);

    const summary = await aiService.summarizeContent(contentToSummarize, 200);

    res.status(200).json({
      success: true,
      message: 'Summary generated successfully',
      data: {
        moduleId: module.id,
        moduleTitle: module.title,
        summary
      }
    });
  } catch (error) {
    console.error('Summarize module error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate summary',
      error: error.message
    });
  }
};

module.exports = exports;
