const { Assignment, Submission, User, Notification } = require('../models');

// @desc    Create assignment
// @route   POST /api/assignments
// @access  Private (Teacher only)
exports.createAssignment = async (req, res) => {
  try {
    const { title, description, subject, gradeLevel, dueDate, totalPoints, instructions, attachments } = req.body;

    const assignment = await Assignment.create({
      teacherId: req.user.id,
      title,
      description,
      subject,
      gradeLevel,
      dueDate,
      totalPoints,
      instructions,
      attachments
    });

    res.status(201).json({
      success: true,
      message: 'Assignment created successfully',
      data: assignment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create assignment',
      error: error.message
    });
  }
};

// @desc    Get all assignments
// @route   GET /api/assignments
// @access  Private
exports.getAssignments = async (req, res) => {
  try {
    const { subject, gradeLevel, status, teacherId } = req.query;
    
    const where = {};
    if (subject) where.subject = subject;
    if (gradeLevel) where.gradeLevel = gradeLevel;
    if (status) where.status = status;
    if (teacherId) where.teacherId = teacherId;

    // If student, only show published assignments
    if (req.user.role === 'student' || req.user.role === 'parent') {
      where.status = 'published';
    }

    const assignments = await Assignment.findAll({
      where,
      include: [
        {
          model: User,
          as: 'teacher',
          attributes: ['id', 'firstName', 'lastName']
        }
      ],
      order: [['dueDate', 'ASC']]
    });

    res.status(200).json({
      success: true,
      count: assignments.length,
      data: assignments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch assignments',
      error: error.message
    });
  }
};

// @desc    Get single assignment
// @route   GET /api/assignments/:id
// @access  Private
exports.getAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'teacher',
          attributes: ['id', 'firstName', 'lastName']
        },
        {
          model: Submission,
          as: 'submissions',
          include: [
            {
              model: User,
              as: 'student',
              attributes: ['id', 'firstName', 'lastName']
            }
          ]
        }
      ]
    });

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: assignment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch assignment',
      error: error.message
    });
  }
};

// @desc    Update assignment
// @route   PUT /api/assignments/:id
// @access  Private (Teacher - own assignments only)
exports.updateAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByPk(req.params.id);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }

    if (assignment.teacherId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this assignment'
      });
    }

    await assignment.update(req.body);

    res.status(200).json({
      success: true,
      message: 'Assignment updated successfully',
      data: assignment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update assignment',
      error: error.message
    });
  }
};

// @desc    Delete assignment
// @route   DELETE /api/assignments/:id
// @access  Private (Teacher - own assignments only)
exports.deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByPk(req.params.id);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }

    if (assignment.teacherId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this assignment'
      });
    }

    await assignment.destroy();

    res.status(200).json({
      success: true,
      message: 'Assignment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete assignment',
      error: error.message
    });
  }
};

// @desc    Publish assignment
// @route   PUT /api/assignments/:id/publish
// @access  Private (Teacher - own assignments only)
exports.publishAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByPk(req.params.id);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }

    if (assignment.teacherId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to publish this assignment'
      });
    }

    await assignment.update({
      status: 'published',
      publishedAt: new Date()
    });

    res.status(200).json({
      success: true,
      message: 'Assignment published successfully',
      data: assignment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to publish assignment',
      error: error.message
    });
  }
};

// @desc    Submit assignment
// @route   POST /api/assignments/:id/submit
// @access  Private (Student only)
exports.submitAssignment = async (req, res) => {
  try {
    const { content, attachments } = req.body;
    const assignment = await Assignment.findByPk(req.params.id);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }

    if (assignment.status !== 'published') {
      return res.status(400).json({
        success: false,
        message: 'Assignment is not published'
      });
    }

    // Check if already submitted
    const existingSubmission = await Submission.findOne({
      where: {
        assignmentId: assignment.id,
        studentId: req.user.id
      }
    });

    if (existingSubmission) {
      // Update existing submission
      await existingSubmission.update({
        content,
        attachments,
        submittedAt: new Date(),
        status: 'submitted'
      });

      return res.status(200).json({
        success: true,
        message: 'Assignment resubmitted successfully',
        data: existingSubmission
      });
    }

    // Create new submission
    const submission = await Submission.create({
      assignmentId: assignment.id,
      studentId: req.user.id,
      content,
      attachments
    });

    res.status(201).json({
      success: true,
      message: 'Assignment submitted successfully',
      data: submission
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to submit assignment',
      error: error.message
    });
  }
};

// @desc    Grade submission
// @route   PUT /api/assignments/submissions/:id/grade
// @access  Private (Teacher only)
exports.gradeSubmission = async (req, res) => {
  try {
    const { grade, feedback } = req.body;
    const submission = await Submission.findByPk(req.params.id, {
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

    // Check if teacher owns the assignment
    if (submission.assignment.teacherId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to grade this submission'
      });
    }

    await submission.update({
      grade,
      feedback,
      status: 'graded',
      gradedAt: new Date()
    });

    // Create notification for student
    await Notification.create({
      userId: submission.studentId,
      type: 'grade',
      title: 'Assignment Graded',
      message: `Your assignment "${submission.assignment.title}" has been graded. Score: ${grade}`,
      data: { submissionId: submission.id, assignmentId: submission.assignmentId, grade }
    });

    res.status(200).json({
      success: true,
      message: 'Submission graded successfully',
      data: submission
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to grade submission',
      error: error.message
    });
  }
};

// @desc    Get student's submissions
// @route   GET /api/assignments/my-submissions
// @access  Private (Student only)
exports.getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.findAll({
      where: { studentId: req.user.id },
      include: [
        {
          model: Assignment,
          as: 'assignment',
          include: [
            {
              model: User,
              as: 'teacher',
              attributes: ['id', 'firstName', 'lastName']
            }
          ]
        }
      ],
      order: [['submittedAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch submissions',
      error: error.message
    });
  }
};
