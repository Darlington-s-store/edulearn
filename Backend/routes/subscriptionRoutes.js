const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const { protect } = require('../middleware/auth');

router.post('/create', protect, subscriptionController.createSubscription);
router.post('/verify-payment', protect, subscriptionController.verifyPayment);
router.get('/my-subscription', protect, subscriptionController.getUserSubscription);
router.post('/cancel', protect, subscriptionController.cancelSubscription);
router.get('/all', protect, subscriptionController.getAllSubscriptions);

module.exports = router;
