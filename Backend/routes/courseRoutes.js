const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { protect } = require('../middleware/auth');

router.post('/create', protect, courseController.createCourse);
router.get('/all', courseController.getAllCourses);
router.get('/my-courses', protect, courseController.getTeacherCourses);
router.get('/:id', courseController.getCourseById);
router.put('/:id', protect, courseController.updateCourse);
router.post('/:id/publish', protect, courseController.publishCourse);
router.delete('/:id', protect, courseController.deleteCourse);

module.exports = router;
