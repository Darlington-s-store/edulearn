const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Quiz = sequelize.define('Quiz', {
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
  questions: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: []
  },
  timeLimit: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Time limit in minutes'
  },
  passingScore: {
    type: DataTypes.INTEGER,
    defaultValue: 60
  },
  totalPoints: {
    type: DataTypes.INTEGER,
    defaultValue: 100
  },
  allowRetake: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  showCorrectAnswers: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  status: {
    type: DataTypes.ENUM('draft', 'published', 'closed'),
    defaultValue: 'draft'
  },
  publishedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'quizzes'
});

module.exports = Quiz;
