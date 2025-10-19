const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const Module = require('../models/Module');
const User = require('../models/User');

const enrollmentController = {
  async enrollInCourse(req, res) {
    try {
      const { courseId, moduleId } = req.body;
      const studentId = req.user.id;

      if (courseId) {
        const existingEnrollment = await Enrollment.findOne({
          where: { studentId, courseId }
        });

        if (existingEnrollment) {
          return res.status(400).json({
            success: false,
            message: 'Already enrolled in this course'
          });
        }
      }

      const enrollment = await Enrollment.create({
        studentId,
        courseId: courseId || null,
        moduleId: moduleId || null,
        enrolledAt: new Date(),
        progress: 0,
        status: 'active'
      });

      if (courseId) {
        await Course.increment('enrollmentCount', { where: { id: courseId } });
      }

      res.status(201).json({
        success: true,
        message: 'Enrolled successfully',
        data: enrollment
      });
    } catch (error) {
      console.error('Enroll error:', error);
      res.status(500).json({
        success: false,
        message: 'Error enrolling in course',
        error: error.message
      });
    }
  },

  async getStudentEnrollments(req, res) {
    try {
      const studentId = req.user.id;

      const enrollments = await Enrollment.findAll({
        where: { studentId, status: 'active' },
        include: [
          {
            model: Course,
            attributes: ['id', 'title', 'description', 'subject', 'thumbnail', 'difficulty']
          },
          {
            model: Module,
            attributes: ['id', 'title', 'description', 'content', 'order']
          }
        ],
        order: [['enrolledAt', 'DESC']]
      });

      res.json({
        success: true,
        data: enrollments
      });
    } catch (error) {
      console.error('Get enrollments error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching enrollments',
        error: error.message
      });
    }
  },

  async getCourseEnrollments(req, res) {
    try {
      const { courseId } = req.params;
      const teacherId = req.user.id;

      const course = await Course.findOne({
        where: { id: courseId, teacherId }
      });

      if (!course) {
        return res.status(404).json({
          success: false,
          message: 'Course not found or unauthorized'
        });
      }

      const enrollments = await Enrollment.findAll({
        where: { courseId, status: 'active' },
        include: [{
          model: User,
          as: 'Student',
          attributes: ['id', 'email', 'firstName', 'lastName', 'avatar']
        }],
        order: [['enrolledAt', 'DESC']]
      });

      res.json({
        success: true,
        data: enrollments
      });
    } catch (error) {
      console.error('Get course enrollments error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching course enrollments',
        error: error.message
      });
    }
  },

  async updateProgress(req, res) {
    try {
      const { enrollmentId } = req.params;
      const { progress } = req.body;
      const studentId = req.user.id;

      const enrollment = await Enrollment.findOne({
        where: { id: enrollmentId, studentId }
      });

      if (!enrollment) {
        return res.status(404).json({
          success: false,
          message: 'Enrollment not found'
        });
      }

      enrollment.progress = Math.min(Math.max(progress, 0), 100);

      if (enrollment.progress === 100 && !enrollment.completedAt) {
        enrollment.completedAt = new Date();
        enrollment.status = 'completed';
      }

      await enrollment.save();

      res.json({
        success: true,
        message: 'Progress updated successfully',
        data: enrollment
      });
    } catch (error) {
      console.error('Update progress error:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating progress',
        error: error.message
      });
    }
  },

  async dropCourse(req, res) {
    try {
      const { enrollmentId } = req.params;
      const studentId = req.user.id;

      const enrollment = await Enrollment.findOne({
        where: { id: enrollmentId, studentId }
      });

      if (!enrollment) {
        return res.status(404).json({
          success: false,
          message: 'Enrollment not found'
        });
      }

      enrollment.status = 'dropped';
      await enrollment.save();

      res.json({
        success: true,
        message: 'Course dropped successfully'
      });
    } catch (error) {
      console.error('Drop course error:', error);
      res.status(500).json({
        success: false,
        message: 'Error dropping course',
        error: error.message
      });
    }
  }
};

module.exports = enrollmentController;
