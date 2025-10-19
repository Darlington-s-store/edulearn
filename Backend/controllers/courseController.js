const Course = require('../models/Course');
const Module = require('../models/Module');
const Enrollment = require('../models/Enrollment');
const User = require('../models/User');

const courseController = {
  async createCourse(req, res) {
    try {
      const { title, description, subject, gradeLevel, difficulty, thumbnail } = req.body;
      const teacherId = req.user.id;

      const course = await Course.create({
        teacherId,
        title,
        description,
        subject,
        gradeLevel,
        difficulty: difficulty || 'beginner',
        thumbnail,
        isPublished: false,
        enrollmentCount: 0
      });

      res.status(201).json({
        success: true,
        message: 'Course created successfully',
        data: course
      });
    } catch (error) {
      console.error('Create course error:', error);
      res.status(500).json({
        success: false,
        message: 'Error creating course',
        error: error.message
      });
    }
  },

  async getAllCourses(req, res) {
    try {
      const { subject, difficulty, search, published } = req.query;
      const where = {};

      if (subject) where.subject = subject;
      if (difficulty) where.difficulty = difficulty;
      if (published !== undefined) where.isPublished = published === 'true';
      if (search) {
        where[Op.or] = [
          { title: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } }
        ];
      }

      const courses = await Course.findAll({
        where,
        include: [{
          model: User,
          as: 'Teacher',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }],
        order: [['createdAt', 'DESC']]
      });

      res.json({
        success: true,
        data: courses
      });
    } catch (error) {
      console.error('Get courses error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching courses',
        error: error.message
      });
    }
  },

  async getCourseById(req, res) {
    try {
      const { id } = req.params;

      const course = await Course.findByPk(id, {
        include: [
          {
            model: User,
            as: 'Teacher',
            attributes: ['id', 'firstName', 'lastName', 'email', 'avatar']
          },
          {
            model: Module,
            as: 'Modules',
            order: [['order', 'ASC']]
          }
        ]
      });

      if (!course) {
        return res.status(404).json({
          success: false,
          message: 'Course not found'
        });
      }

      res.json({
        success: true,
        data: course
      });
    } catch (error) {
      console.error('Get course error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching course',
        error: error.message
      });
    }
  },

  async getTeacherCourses(req, res) {
    try {
      const teacherId = req.user.id;

      const courses = await Course.findAll({
        where: { teacherId },
        include: [{
          model: Module,
          as: 'Modules'
        }],
        order: [['createdAt', 'DESC']]
      });

      res.json({
        success: true,
        data: courses
      });
    } catch (error) {
      console.error('Get teacher courses error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching teacher courses',
        error: error.message
      });
    }
  },

  async updateCourse(req, res) {
    try {
      const { id } = req.params;
      const teacherId = req.user.id;
      const updates = req.body;

      const course = await Course.findOne({
        where: { id, teacherId }
      });

      if (!course) {
        return res.status(404).json({
          success: false,
          message: 'Course not found or unauthorized'
        });
      }

      await course.update(updates);

      res.json({
        success: true,
        message: 'Course updated successfully',
        data: course
      });
    } catch (error) {
      console.error('Update course error:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating course',
        error: error.message
      });
    }
  },

  async publishCourse(req, res) {
    try {
      const { id } = req.params;
      const teacherId = req.user.id;

      const course = await Course.findOne({
        where: { id, teacherId }
      });

      if (!course) {
        return res.status(404).json({
          success: false,
          message: 'Course not found or unauthorized'
        });
      }

      course.isPublished = true;
      await course.save();

      res.json({
        success: true,
        message: 'Course published successfully',
        data: course
      });
    } catch (error) {
      console.error('Publish course error:', error);
      res.status(500).json({
        success: false,
        message: 'Error publishing course',
        error: error.message
      });
    }
  },

  async deleteCourse(req, res) {
    try {
      const { id } = req.params;
      const teacherId = req.user.id;

      const course = await Course.findOne({
        where: { id, teacherId }
      });

      if (!course) {
        return res.status(404).json({
          success: false,
          message: 'Course not found or unauthorized'
        });
      }

      await course.destroy();

      res.json({
        success: true,
        message: 'Course deleted successfully'
      });
    } catch (error) {
      console.error('Delete course error:', error);
      res.status(500).json({
        success: false,
        message: 'Error deleting course',
        error: error.message
      });
    }
  }
};

module.exports = courseController;
