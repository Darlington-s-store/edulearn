const { User, StudentProfile, TeacherProfile } = require('../models');
const { Op } = require('sequelize');

// @desc    Get platform statistics
// @route   GET /api/admin/stats
// @access  Private (Admin only)
exports.getPlatformStats = async (req, res) => {
  try {
    // Count users by role
    const totalStudents = await User.count({ where: { role: 'student' } });
    const totalTeachers = await User.count({ where: { role: 'teacher' } });
    const totalParents = await User.count({ where: { role: 'parent' } });
    const totalAdmins = await User.count({ where: { role: 'admin' } });
    
    // Get recent users (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const newStudents = await User.count({
      where: {
        role: 'student',
        createdAt: { [Op.gte]: thirtyDaysAgo }
      }
    });

    const newTeachers = await User.count({
      where: {
        role: 'teacher',
        createdAt: { [Op.gte]: thirtyDaysAgo }
      }
    });

    res.status(200).json({
      success: true,
      data: {
        users: {
          totalStudents,
          totalTeachers,
          totalParents,
          totalAdmins,
          newStudents,
          newTeachers,
          total: totalStudents + totalTeachers + totalParents + totalAdmins
        },
        content: {
          totalModules: 0,
          totalAssignments: 0,
          totalQuizzes: 0,
          totalLiveClasses: 0
        },
        activity: {
          totalEnrollments: 0,
          totalSubmissions: 0,
          pendingSubmissions: 0
        }
      }
    });
  } catch (error) {
    console.error('Get platform stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch platform statistics',
      error: error.message
    });
  }
};

// @desc    Get all users with filters
// @route   GET /api/admin/users
// @access  Private (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const { role, search, page = 1, limit = 20 } = req.query;
    
    const where = {};
    if (role) where.role = role;
    if (search) {
      where[Op.or] = [
        { firstName: { [Op.iLike]: `%${search}%` } },
        { lastName: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await User.findAndCountAll({
      where,
      include: [
        { model: StudentProfile, as: 'studentProfile' },
        { model: TeacherProfile, as: 'teacherProfile' }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin only)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent deleting other admins
    if (user.role === 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Cannot delete admin users'
      });
    }

    await user.destroy();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete user',
      error: error.message
    });
  }
};

// @desc    Update user status
// @route   PUT /api/admin/users/:id/status
// @access  Private (Admin only)
exports.updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await user.update({ status });

    res.status(200).json({
      success: true,
      message: 'User status updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user status',
      error: error.message
    });
  }
};

// @desc    Get recent activities
// @route   GET /api/admin/activities
// @access  Private (Admin only)
exports.getRecentActivities = async (req, res) => {
  try {
    const { limit = 20 } = req.query;

    // Get recent user registrations
    const recentUsers = await User.findAll({
      limit: parseInt(limit),
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'firstName', 'lastName', 'email', 'role', 'createdAt']
    });

    // Format activities
    const activities = recentUsers.map(user => ({
      type: 'registration',
      user: `${user.firstName} ${user.lastName}`,
      action: 'created account',
      subject: user.role,
      title: user.email,
      time: user.createdAt
    }));

    res.status(200).json({
      success: true,
      data: activities
    });
  } catch (error) {
    console.error('Get recent activities error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recent activities',
      error: error.message
    });
  }
};

module.exports = exports;
