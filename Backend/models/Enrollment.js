const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Enrollment = sequelize.define('Enrollment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  studentId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  courseId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'courses',
      key: 'id'
    }
  },
  moduleId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'modules',
      key: 'id'
    }
  },
  liveClassId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'live_classes',
      key: 'id'
    }
  },
  enrolledAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  progress: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 100
    }
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('active', 'completed', 'dropped'),
    defaultValue: 'active'
  }
}, {
  tableName: 'enrollments'
});

module.exports = Enrollment;
