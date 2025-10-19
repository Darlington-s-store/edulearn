const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  createQuiz,
  getQuizzes,
  getQuiz,
  updateQuiz,
  deleteQuiz,
  publishQuiz,
  startQuizAttempt,
  submitQuizAttempt,
  getMyAttempts
} = require('../controllers/quizController');

router.route('/')
  .get(protect, getQuizzes)
  .post(protect, authorize('teacher', 'admin'), createQuiz);

router.get('/my-attempts', protect, authorize('student', 'parent'), getMyAttempts);

router.route('/:id')
  .get(protect, getQuiz)
  .put(protect, authorize('teacher', 'admin'), updateQuiz)
  .delete(protect, authorize('teacher', 'admin'), deleteQuiz);

router.put('/:id/publish', protect, authorize('teacher', 'admin'), publishQuiz);
router.post('/:id/attempt', protect, authorize('student', 'parent'), startQuizAttempt);
router.put('/attempts/:id/submit', protect, authorize('student', 'parent'), submitQuizAttempt);

module.exports = router;
