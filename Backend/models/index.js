const { sequelize } = require('../config/database');
const User = require('./User');
const StudentProfile = require('./StudentProfile');
const TeacherProfile = require('./TeacherProfile');
const Module = require('./Module');
const Assignment = require('./Assignment');
const Submission = require('./Submission');
const Quiz = require('./Quiz');
const QuizAttempt = require('./QuizAttempt');
const LiveClass = require('./LiveClass');
const Enrollment = require('./Enrollment');
const Notification = require('./Notification');
const UserPreferences = require('./UserPreferences');

// Define associations

// User associations
User.hasOne(StudentProfile, { foreignKey: 'userId', as: 'studentProfile' });
StudentProfile.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasOne(TeacherProfile, { foreignKey: 'userId', as: 'teacherProfile' });
TeacherProfile.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Teacher content associations
User.hasMany(Module, { foreignKey: 'teacherId', as: 'modules' });
Module.belongsTo(User, { foreignKey: 'teacherId', as: 'teacher' });

User.hasMany(Assignment, { foreignKey: 'teacherId', as: 'assignments' });
Assignment.belongsTo(User, { foreignKey: 'teacherId', as: 'teacher' });

User.hasMany(Quiz, { foreignKey: 'teacherId', as: 'quizzes' });
Quiz.belongsTo(User, { foreignKey: 'teacherId', as: 'teacher' });

User.hasMany(LiveClass, { foreignKey: 'teacherId', as: 'liveClasses' });
LiveClass.belongsTo(User, { foreignKey: 'teacherId', as: 'teacher' });

// Student submission associations
User.hasMany(Submission, { foreignKey: 'studentId', as: 'submissions' });
Submission.belongsTo(User, { foreignKey: 'studentId', as: 'student' });

Assignment.hasMany(Submission, { foreignKey: 'assignmentId', as: 'submissions' });
Submission.belongsTo(Assignment, { foreignKey: 'assignmentId', as: 'assignment' });

// Quiz attempt associations
User.hasMany(QuizAttempt, { foreignKey: 'studentId', as: 'quizAttempts' });
QuizAttempt.belongsTo(User, { foreignKey: 'studentId', as: 'student' });

Quiz.hasMany(QuizAttempt, { foreignKey: 'quizId', as: 'attempts' });
QuizAttempt.belongsTo(Quiz, { foreignKey: 'quizId', as: 'quiz' });

// Enrollment associations
User.hasMany(Enrollment, { foreignKey: 'studentId', as: 'enrollments' });
Enrollment.belongsTo(User, { foreignKey: 'studentId', as: 'student' });

Module.hasMany(Enrollment, { foreignKey: 'moduleId', as: 'enrollments' });
Enrollment.belongsTo(Module, { foreignKey: 'moduleId', as: 'module' });

LiveClass.hasMany(Enrollment, { foreignKey: 'liveClassId', as: 'enrollments' });
Enrollment.belongsTo(LiveClass, { foreignKey: 'liveClassId', as: 'liveClass' });

// Notification associations
User.hasMany(Notification, { foreignKey: 'userId', as: 'notifications' });
Notification.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// User preferences associations
User.hasOne(UserPreferences, { foreignKey: 'userId', as: 'preferences' });
UserPreferences.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {
  sequelize,
  User,
  StudentProfile,
  TeacherProfile,
  Module,
  Assignment,
  Submission,
  Quiz,
  QuizAttempt,
  LiveClass,
  Enrollment,
  Notification,
  UserPreferences
};
