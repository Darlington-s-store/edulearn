const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  updateProfile,
  changePassword,
  getPreferences,
  updateNotificationPreferences,
  updateAppearancePreferences
} = require('../controllers/userController');

// All routes require authentication
router.use(protect);

// Profile routes
router.put('/profile', updateProfile);
router.put('/change-password', changePassword);

// Preferences routes
router.get('/preferences', getPreferences);
router.put('/preferences/notifications', updateNotificationPreferences);
router.put('/preferences/appearance', updateAppearancePreferences);

module.exports = router;
