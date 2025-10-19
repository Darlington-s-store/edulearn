const { Module, Enrollment, User } = require('../models');
const { Op } = require('sequelize');

// @desc    Create new module
// @route   POST /api/modules
// @access  Private (Teacher only)
exports.createModule = async (req, res) => {
  try {
    const { title, description, subject, gradeLevel, difficulty, content, thumbnail, duration } = req.body;

    const module = await Module.create({
      teacherId: req.user.id,
      title,
      description,
      subject,
      gradeLevel,
      difficulty,
      content,
      thumbnail,
      duration
    });

    res.status(201).json({
      success: true,
      message: 'Module created successfully',
      data: module
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create module',
      error: error.message
    });
  }
};

// @desc    Get all modules
// @route   GET /api/modules
// @access  Public
exports.getModules = async (req, res) => {
  try {
    const { subject, gradeLevel, difficulty, status, teacherId } = req.query;
    
    const where = {};
    if (subject) where.subject = subject;
    if (gradeLevel) where.gradeLevel = gradeLevel;
    if (difficulty) where.difficulty = difficulty;
    if (status) where.status = status;
    if (teacherId) where.teacherId = teacherId;

    const modules = await Module.findAll({
      where,
      include: [
        {
          model: User,
          as: 'teacher',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: modules.length,
      data: modules
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch modules',
      error: error.message
    });
  }
};

// @desc    Get single module
// @route   GET /api/modules/:id
// @access  Public
exports.getModule = async (req, res) => {
  try {
    const module = await Module.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'teacher',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ]
    });

    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Module not found'
      });
    }

    res.status(200).json({
      success: true,
      data: module
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch module',
      error: error.message
    });
  }
};

// @desc    Update module
// @route   PUT /api/modules/:id
// @access  Private (Teacher - own modules only)
exports.updateModule = async (req, res) => {
  try {
    const module = await Module.findByPk(req.params.id);

    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Module not found'
      });
    }

    // Check ownership
    if (module.teacherId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this module'
      });
    }

    await module.update(req.body);

    res.status(200).json({
      success: true,
      message: 'Module updated successfully',
      data: module
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update module',
      error: error.message
    });
  }
};

// @desc    Delete module
// @route   DELETE /api/modules/:id
// @access  Private (Teacher - own modules only)
exports.deleteModule = async (req, res) => {
  try {
    const module = await Module.findByPk(req.params.id);

    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Module not found'
      });
    }

    // Check ownership
    if (module.teacherId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this module'
      });
    }

    await module.destroy();

    res.status(200).json({
      success: true,
      message: 'Module deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete module',
      error: error.message
    });
  }
};

// @desc    Publish module
// @route   PUT /api/modules/:id/publish
// @access  Private (Teacher - own modules only)
exports.publishModule = async (req, res) => {
  try {
    const module = await Module.findByPk(req.params.id);

    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Module not found'
      });
    }

    // Check ownership
    if (module.teacherId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to publish this module'
      });
    }

    await module.update({
      status: 'published',
      publishedAt: new Date()
    });

    res.status(200).json({
      success: true,
      message: 'Module published successfully',
      data: module
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to publish module',
      error: error.message
    });
  }
};

// @desc    Enroll in module
// @route   POST /api/modules/:id/enroll
// @access  Private (Student only)
exports.enrollInModule = async (req, res) => {
  try {
    console.log('Enrollment attempt:', {
      moduleId: req.params.id,
      userId: req.user?.id,
      userRole: req.user?.role
    });

    const module = await Module.findByPk(req.params.id);

    if (!module) {
      console.log('Module not found:', req.params.id);
      return res.status(404).json({
        success: false,
        message: 'Module not found'
      });
    }

    console.log('Module found:', { id: module.id, status: module.status });

    if (module.status !== 'published') {
      console.log('Module not published:', module.status);
      return res.status(400).json({
        success: false,
        message: `Module is not published (status: ${module.status})`
      });
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      where: {
        studentId: req.user.id,
        moduleId: module.id
      }
    });

    if (existingEnrollment) {
      console.log('Already enrolled:', existingEnrollment.id);
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this module'
      });
    }

    const enrollment = await Enrollment.create({
      studentId: req.user.id,
      moduleId: module.id
    });

    console.log('Enrollment successful:', enrollment.id);

    res.status(201).json({
      success: true,
      message: 'Enrolled successfully',
      data: enrollment
    });
  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({
      success: false,
      message: 'Enrollment failed',
      error: error.message
    });
  }
};

// @desc    Get student's enrolled modules
// @route   GET /api/modules/my-enrollments
// @access  Private (Student only)
exports.getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll({
      where: { studentId: req.user.id, moduleId: { [Op.ne]: null } },
      include: [
        {
          model: Module,
          as: 'module',
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
      count: enrollments.length,
      data: enrollments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch enrollments',
      error: error.message
    });
  }
};
