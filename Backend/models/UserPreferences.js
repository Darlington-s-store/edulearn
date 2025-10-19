const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const UserPreferences = sequelize.define('UserPreferences', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  // Notification preferences
  emailNotifications: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  pushNotifications: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  assignmentReminders: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  classReminders: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  gradeUpdates: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  weeklyReport: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  // Appearance preferences
  theme: {
    type: DataTypes.ENUM('light', 'dark', 'auto'),
    defaultValue: 'light'
  },
  language: {
    type: DataTypes.STRING(10),
    defaultValue: 'en'
  },
  fontSize: {
    type: DataTypes.ENUM('small', 'medium', 'large'),
    defaultValue: 'medium'
  },
  // Additional settings
  timezone: {
    type: DataTypes.STRING(50),
    defaultValue: 'UTC'
  },
  dateFormat: {
    type: DataTypes.STRING(20),
    defaultValue: 'MM/DD/YYYY'
  }
}, {
  tableName: 'user_preferences',
  timestamps: true
});

module.exports = UserPreferences;
