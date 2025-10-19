const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  createModule,
  getModules,
  getModule,
  updateModule,
  deleteModule,
  publishModule,
  enrollInModule,
  getMyEnrollments
} = require('../controllers/moduleController');

router.route('/')
  .get(getModules)
  .post(protect, authorize('teacher', 'admin'), createModule);

router.get('/my-enrollments', protect, authorize('student', 'parent'), getMyEnrollments);

router.route('/:id')
  .get(getModule)
  .put(protect, authorize('teacher', 'admin'), updateModule)
  .delete(protect, authorize('teacher', 'admin'), deleteModule);

router.put('/:id/publish', protect, authorize('teacher', 'admin'), publishModule);
router.post('/:id/enroll', protect, authorize('student', 'parent'), enrollInModule);

module.exports = router;
