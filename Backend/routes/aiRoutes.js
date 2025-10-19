const express = require('express');
const router = express.Router();
const {
  generateQuiz,
  getAssignmentFeedback,
  getRecommendations,
  studyAssistant,
  getStudyTips,
  summarizeModule
} = require('../controllers/aiController');
const { protect, authorize } = require('../middleware/auth');

// Teacher routes
router.post('/generate-quiz', protect, authorize('teacher', 'admin'), generateQuiz);
router.post('/assignment-feedback/:submissionId', protect, authorize('teacher', 'admin'), getAssignmentFeedback);

// Student routes
router.get('/recommendations', protect, authorize('student'), getRecommendations);
router.post('/study-assistant', protect, authorize('student'), studyAssistant);
router.get('/study-tips', protect, authorize('student'), getStudyTips);

// Both teacher and student
router.post('/summarize/:moduleId', protect, summarizeModule);

module.exports = router;
