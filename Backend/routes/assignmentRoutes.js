const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  createAssignment,
  getAssignments,
  getAssignment,
  updateAssignment,
  deleteAssignment,
  publishAssignment,
  submitAssignment,
  gradeSubmission,
  getMySubmissions
} = require('../controllers/assignmentController');

router.route('/')
  .get(protect, getAssignments)
  .post(protect, authorize('teacher', 'admin'), createAssignment);

router.get('/my-submissions', protect, authorize('student', 'parent'), getMySubmissions);

router.route('/:id')
  .get(protect, getAssignment)
  .put(protect, authorize('teacher', 'admin'), updateAssignment)
  .delete(protect, authorize('teacher', 'admin'), deleteAssignment);

router.put('/:id/publish', protect, authorize('teacher', 'admin'), publishAssignment);
router.post('/:id/submit', protect, authorize('student', 'parent'), submitAssignment);
router.put('/submissions/:id/grade', protect, authorize('teacher', 'admin'), gradeSubmission);

module.exports = router;
