const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');
const { protect } = require('../middleware/auth');

router.post('/enroll', protect, enrollmentController.enrollInCourse);
router.get('/my-enrollments', protect, enrollmentController.getStudentEnrollments);
router.get('/course/:courseId', protect, enrollmentController.getCourseEnrollments);
router.put('/:enrollmentId/progress', protect, enrollmentController.updateProgress);
router.delete('/:enrollmentId/drop', protect, enrollmentController.dropCourse);

module.exports = router;
