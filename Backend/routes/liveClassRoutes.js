const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  createLiveClass,
  getLiveClasses,
  getLiveClass,
  updateLiveClass,
  deleteLiveClass,
  startLiveClass,
  endLiveClass,
  enrollInLiveClass,
  getMyEnrollments,
  getZoomSDKToken,
  getZoomParticipants,
  getZoomRecordings
} = require('../controllers/liveClassController');

router.route('/')
  .get(protect, getLiveClasses)
  .post(protect, authorize('teacher', 'admin'), createLiveClass);

router.get('/my-enrollments', protect, authorize('student', 'parent'), getMyEnrollments);

router.route('/:id')
  .get(protect, getLiveClass)
  .put(protect, authorize('teacher', 'admin'), updateLiveClass)
  .delete(protect, authorize('teacher', 'admin'), deleteLiveClass);

router.put('/:id/start', protect, authorize('teacher', 'admin'), startLiveClass);
router.put('/:id/end', protect, authorize('teacher', 'admin'), endLiveClass);
router.post('/:id/enroll', protect, authorize('student', 'parent'), enrollInLiveClass);

// Zoom-specific routes
router.post('/:id/zoom-token', protect, getZoomSDKToken);
router.get('/:id/participants', protect, authorize('teacher', 'admin'), getZoomParticipants);
router.get('/:id/recordings', protect, getZoomRecordings);

module.exports = router;
