const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/adminAuth');
const {
  getPlatformStats,
  getAllUsers,
  deleteUser,
  updateUserStatus,
  getRecentActivities
} = require('../controllers/adminController');

// All routes require authentication and admin role
router.use(protect);
router.use(adminOnly);

// Platform statistics
router.get('/stats', getPlatformStats);

// User management
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/status', updateUserStatus);

// Activity logs
router.get('/activities', getRecentActivities);

module.exports = router;
