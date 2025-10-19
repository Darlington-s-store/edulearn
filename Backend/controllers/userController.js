const { User, StudentProfile, TeacherProfile, UserPreferences } = require('../models');
const bcrypt = require('bcryptjs');

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone, avatar, age, grade, school, subject, institution, bio } = req.body;

    // Update user basic info
    await req.user.update({
      firstName: firstName || req.user.firstName,
      lastName: lastName || req.user.lastName,
      phone: phone || req.user.phone,
      avatar: avatar || req.user.avatar
    });

    // Update role-specific profile
    if (req.user.role === 'student' || req.user.role === 'parent') {
      let profile = await StudentProfile.findOne({ where: { userId: req.user.id } });
      
      if (!profile) {
        // Create profile if doesn't exist
        profile = await StudentProfile.create({
          userId: req.user.id,
          age: age || null,
          grade: grade || null,
          school: school || null
        });
      } else {
        await profile.update({
          age: age !== undefined ? age : profile.age,
          grade: grade !== undefined ? grade : profile.grade,
          school: school !== undefined ? school : profile.school
        });
      }
    } else if (req.user.role === 'teacher') {
      let profile = await TeacherProfile.findOne({ where: { userId: req.user.id } });
      
      if (!profile) {
        profile = await TeacherProfile.create({
          userId: req.user.id,
          subject: subject || null,
          institution: institution || null,
          bio: bio || null
        });
      } else {
        await profile.update({
          subject: subject !== undefined ? subject : profile.subject,
          institution: institution !== undefined ? institution : profile.institution,
          bio: bio !== undefined ? bio : profile.bio
        });
      }
    }

    // Fetch updated user with profile
    const updatedUser = await User.findByPk(req.user.id, {
      include: [
        { model: StudentProfile, as: 'studentProfile' },
        { model: TeacherProfile, as: 'teacherProfile' }
      ]
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message
    });
  }
};

// @desc    Change password
// @route   PUT /api/users/change-password
// @access  Private
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide current and new password'
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 8 characters long'
      });
    }

    // Get user with password
    const user = await User.findByPk(req.user.id);

    // Verify current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash and update new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to change password',
      error: error.message
    });
  }
};

// @desc    Get user preferences
// @route   GET /api/users/preferences
// @access  Private
exports.getPreferences = async (req, res) => {
  try {
    let preferences = await UserPreferences.findOne({
      where: { userId: req.user.id }
    });

    // Create default preferences if don't exist
    if (!preferences) {
      preferences = await UserPreferences.create({
        userId: req.user.id
      });
    }

    res.status(200).json({
      success: true,
      data: preferences
    });
  } catch (error) {
    console.error('Get preferences error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch preferences',
      error: error.message
    });
  }
};

// @desc    Update notification preferences
// @route   PUT /api/users/preferences/notifications
// @access  Private
exports.updateNotificationPreferences = async (req, res) => {
  try {
    const {
      emailNotifications,
      pushNotifications,
      assignmentReminders,
      classReminders,
      gradeUpdates,
      weeklyReport
    } = req.body;

    let preferences = await UserPreferences.findOne({
      where: { userId: req.user.id }
    });

    if (!preferences) {
      preferences = await UserPreferences.create({
        userId: req.user.id,
        emailNotifications,
        pushNotifications,
        assignmentReminders,
        classReminders,
        gradeUpdates,
        weeklyReport
      });
    } else {
      await preferences.update({
        emailNotifications: emailNotifications !== undefined ? emailNotifications : preferences.emailNotifications,
        pushNotifications: pushNotifications !== undefined ? pushNotifications : preferences.pushNotifications,
        assignmentReminders: assignmentReminders !== undefined ? assignmentReminders : preferences.assignmentReminders,
        classReminders: classReminders !== undefined ? classReminders : preferences.classReminders,
        gradeUpdates: gradeUpdates !== undefined ? gradeUpdates : preferences.gradeUpdates,
        weeklyReport: weeklyReport !== undefined ? weeklyReport : preferences.weeklyReport
      });
    }

    res.status(200).json({
      success: true,
      message: 'Notification preferences updated successfully',
      data: preferences
    });
  } catch (error) {
    console.error('Update notification preferences error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update notification preferences',
      error: error.message
    });
  }
};

// @desc    Update appearance preferences
// @route   PUT /api/users/preferences/appearance
// @access  Private
exports.updateAppearancePreferences = async (req, res) => {
  try {
    const { theme, language, fontSize, timezone, dateFormat } = req.body;

    let preferences = await UserPreferences.findOne({
      where: { userId: req.user.id }
    });

    if (!preferences) {
      preferences = await UserPreferences.create({
        userId: req.user.id,
        theme,
        language,
        fontSize,
        timezone,
        dateFormat
      });
    } else {
      await preferences.update({
        theme: theme || preferences.theme,
        language: language || preferences.language,
        fontSize: fontSize || preferences.fontSize,
        timezone: timezone || preferences.timezone,
        dateFormat: dateFormat || preferences.dateFormat
      });
    }

    res.status(200).json({
      success: true,
      message: 'Appearance preferences updated successfully',
      data: preferences
    });
  } catch (error) {
    console.error('Update appearance preferences error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update appearance preferences',
      error: error.message
    });
  }
};

module.exports = exports;
