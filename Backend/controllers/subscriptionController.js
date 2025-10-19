const Subscription = require('../models/Subscription');
const User = require('../models/User');

const subscriptionController = {
  async createSubscription(req, res) {
    try {
      const { planType, billingCycle, amount, currency, paymentReference } = req.body;
      const userId = req.user.id;

      const existingActive = await Subscription.findOne({
        where: { userId, status: 'active' }
      });

      if (existingActive) {
        return res.status(400).json({
          success: false,
          message: 'User already has an active subscription'
        });
      }

      const startDate = new Date();
      const endDate = new Date();
      if (billingCycle === 'monthly') {
        endDate.setMonth(endDate.getMonth() + 1);
      } else {
        endDate.setFullYear(endDate.getFullYear() + 1);
      }

      const subscription = await Subscription.create({
        userId,
        planType,
        billingCycle,
        amount,
        currency: currency || 'GHS',
        status: 'pending',
        startDate,
        endDate,
        paymentReference,
        paymentMethod: 'paystack'
      });

      res.status(201).json({
        success: true,
        message: 'Subscription created successfully',
        data: subscription
      });
    } catch (error) {
      console.error('Create subscription error:', error);
      res.status(500).json({
        success: false,
        message: 'Error creating subscription',
        error: error.message
      });
    }
  },

  async verifyPayment(req, res) {
    try {
      const { reference } = req.body;
      const userId = req.user.id;

      const subscription = await Subscription.findOne({
        where: { paymentReference: reference, userId }
      });

      if (!subscription) {
        return res.status(404).json({
          success: false,
          message: 'Subscription not found'
        });
      }

      subscription.status = 'active';
      await subscription.save();

      await User.update(
        { subscriptionStatus: 'active', subscriptionPlan: subscription.planType },
        { where: { id: userId } }
      );

      res.json({
        success: true,
        message: 'Payment verified and subscription activated',
        data: subscription
      });
    } catch (error) {
      console.error('Verify payment error:', error);
      res.status(500).json({
        success: false,
        message: 'Error verifying payment',
        error: error.message
      });
    }
  },

  async getUserSubscription(req, res) {
    try {
      const userId = req.user.id;

      const subscription = await Subscription.findOne({
        where: { userId, status: 'active' },
        order: [['createdAt', 'DESC']]
      });

      res.json({
        success: true,
        data: subscription
      });
    } catch (error) {
      console.error('Get subscription error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching subscription',
        error: error.message
      });
    }
  },

  async cancelSubscription(req, res) {
    try {
      const userId = req.user.id;

      const subscription = await Subscription.findOne({
        where: { userId, status: 'active' }
      });

      if (!subscription) {
        return res.status(404).json({
          success: false,
          message: 'No active subscription found'
        });
      }

      subscription.status = 'cancelled';
      subscription.autoRenew = false;
      await subscription.save();

      res.json({
        success: true,
        message: 'Subscription cancelled successfully',
        data: subscription
      });
    } catch (error) {
      console.error('Cancel subscription error:', error);
      res.status(500).json({
        success: false,
        message: 'Error cancelling subscription',
        error: error.message
      });
    }
  },

  async getAllSubscriptions(req, res) {
    try {
      const { page = 1, limit = 20, status } = req.query;
      const offset = (page - 1) * limit;

      const where = {};
      if (status) where.status = status;

      const { count, rows: subscriptions } = await Subscription.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        include: [{
          model: User,
          attributes: ['id', 'email', 'firstName', 'lastName']
        }],
        order: [['createdAt', 'DESC']]
      });

      res.json({
        success: true,
        data: {
          subscriptions,
          pagination: {
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            pages: Math.ceil(count / limit)
          }
        }
      });
    } catch (error) {
      console.error('Get all subscriptions error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching subscriptions',
        error: error.message
      });
    }
  }
};

module.exports = subscriptionController;
