const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const LiveClass = sequelize.define('LiveClass', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  teacherId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gradeLevel: {
    type: DataTypes.STRING,
    allowNull: true
  },
  scheduledDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  scheduledTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Duration in minutes'
  },
  meetingLink: {
    type: DataTypes.STRING,
    allowNull: true
  },
  maxAttendees: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  settings: {
    type: DataTypes.JSONB,
    defaultValue: {
      allowChat: true,
      allowScreenShare: true,
      allowWhiteboard: true,
      recordSession: false
    }
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'live', 'completed', 'cancelled'),
    defaultValue: 'scheduled'
  },
  startedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  endedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  recordingUrl: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'live_classes'
});

module.exports = LiveClass;
