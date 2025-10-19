const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Subscription = sequelize.define('Subscription', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  planType: {
    type: DataTypes.ENUM('individual', 'family', 'pro', 'enterprise'),
    allowNull: false,
    defaultValue: 'individual'
  },
  billingCycle: {
    type: DataTypes.ENUM('monthly', 'yearly'),
    allowNull: false,
    defaultValue: 'monthly'
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING(3),
    defaultValue: 'GHS'
  },
  status: {
    type: DataTypes.ENUM('active', 'cancelled', 'expired', 'pending'),
    defaultValue: 'pending'
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  paymentReference: {
    type: DataTypes.STRING,
    allowNull: true
  },
  paymentMethod: {
    type: DataTypes.STRING,
    defaultValue: 'paystack'
  },
  autoRenew: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  metadata: {
    type: DataTypes.JSON,
    defaultValue: {}
  }
}, {
  tableName: 'subscriptions',
  indexes: [
    { fields: ['userId'] },
    { fields: ['status'] },
    { fields: ['paymentReference'] }
  ]
});

module.exports = Subscription;
