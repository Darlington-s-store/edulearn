const { LiveClass, Enrollment, User } = require('../models');
const { Op } = require('sequelize');
const zoomService = require('../utils/zoomService');

// @desc    Create live class with Zoom meeting
// @route   POST /api/live-classes
// @access  Private (Teacher only)
exports.createLiveClass = async (req, res) => {
  try {
    const { title, description, subject, gradeLevel, scheduledDate, scheduledTime, duration, maxAttendees, settings, useZoom, password } = req.body;

    let meetingLink = req.body.meetingLink;
    let zoomMeetingId = null;
    let zoomPassword = password;

    // Create Zoom meeting if requested
    if (useZoom) {
      try {
        const startDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
        
        const zoomMeeting = await zoomService.createZoomMeeting({
          title,
          description,
          startTime: startDateTime.toISOString(),
          duration: duration || 60,
          recordSession: settings?.recordSession || false,
          waitingRoom: settings?.waitingRoom || false,
          password: password
        });

        meetingLink = zoomMeeting.joinUrl;
        zoomMeetingId = zoomMeeting.meetingId;
        zoomPassword = zoomMeeting.password;
      } catch (zoomError) {
        console.error('Zoom creation error:', zoomError);
        // Continue without Zoom if it fails
      }
    }

    const liveClass = await LiveClass.create({
      teacherId: req.user.id,
      title,
      description,
      subject,
      gradeLevel,
      scheduledDate,
      scheduledTime,
      duration,
      meetingLink,
      maxAttendees,
      settings: {
        ...settings,
        zoomMeetingId,
        zoomPassword,
        useZoom: !!zoomMeetingId
      }
    });

    res.status(201).json({
      success: true,
      message: 'Live class created successfully',
      data: liveClass
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create live class',
      error: error.message
    });
  }
};

// @desc    Get all live classes
// @route   GET /api/live-classes
// @access  Private
exports.getLiveClasses = async (req, res) => {
  try {
    const { subject, gradeLevel, status, teacherId } = req.query;
    
    const where = {};
    if (subject) where.subject = subject;
    if (gradeLevel) where.gradeLevel = gradeLevel;
    if (status) where.status = status;
    if (teacherId) where.teacherId = teacherId;

    const liveClasses = await LiveClass.findAll({
      where,
      include: [
        {
          model: User,
          as: 'teacher',
          attributes: ['id', 'firstName', 'lastName']
        },
        {
          model: Enrollment,
          as: 'enrollments',
          include: [
            {
              model: User,
              as: 'student',
              attributes: ['id', 'firstName', 'lastName']
            }
          ]
        }
      ],
      order: [['scheduledDate', 'ASC'], ['scheduledTime', 'ASC']]
    });

    res.status(200).json({
      success: true,
      count: liveClasses.length,
      data: liveClasses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch live classes',
      error: error.message
    });
  }
};

// @desc    Get single live class
// @route   GET /api/live-classes/:id
// @access  Private
exports.getLiveClass = async (req, res) => {
  try {
    const liveClass = await LiveClass.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'teacher',
          attributes: ['id', 'firstName', 'lastName', 'email']
        },
        {
          model: Enrollment,
          as: 'enrollments',
          include: [
            {
              model: User,
              as: 'student',
              attributes: ['id', 'firstName', 'lastName']
            }
          ]
        }
      ]
    });

    if (!liveClass) {
      return res.status(404).json({
        success: false,
        message: 'Live class not found'
      });
    }

    res.status(200).json({
      success: true,
      data: liveClass
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch live class',
      error: error.message
    });
  }
};

// @desc    Update live class
// @route   PUT /api/live-classes/:id
// @access  Private (Teacher - own classes only)
exports.updateLiveClass = async (req, res) => {
  try {
    const liveClass = await LiveClass.findByPk(req.params.id);

    if (!liveClass) {
      return res.status(404).json({
        success: false,
        message: 'Live class not found'
      });
    }

    if (liveClass.teacherId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this live class'
      });
    }

    await liveClass.update(req.body);

    res.status(200).json({
      success: true,
      message: 'Live class updated successfully',
      data: liveClass
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update live class',
      error: error.message
    });
  }
};

// @desc    Delete live class
// @route   DELETE /api/live-classes/:id
// @access  Private (Teacher - own classes only)
exports.deleteLiveClass = async (req, res) => {
  try {
    const liveClass = await LiveClass.findByPk(req.params.id);

    if (!liveClass) {
      return res.status(404).json({
        success: false,
        message: 'Live class not found'
      });
    }

    if (liveClass.teacherId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this live class'
      });
    }

    await liveClass.destroy();

    res.status(200).json({
      success: true,
      message: 'Live class deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete live class',
      error: error.message
    });
  }
};

// @desc    Start live class
// @route   PUT /api/live-classes/:id/start
// @access  Private (Teacher - own classes only)
exports.startLiveClass = async (req, res) => {
  try {
    const liveClass = await LiveClass.findByPk(req.params.id);

    if (!liveClass) {
      return res.status(404).json({
        success: false,
        message: 'Live class not found'
      });
    }

    if (liveClass.teacherId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to start this live class'
      });
    }

    await liveClass.update({
      status: 'live',
      startedAt: new Date()
    });

    res.status(200).json({
      success: true,
      message: 'Live class started successfully',
      data: liveClass
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to start live class',
      error: error.message
    });
  }
};

// @desc    End live class
// @route   PUT /api/live-classes/:id/end
// @access  Private (Teacher - own classes only)
exports.endLiveClass = async (req, res) => {
  try {
    const { recordingUrl } = req.body;
    const liveClass = await LiveClass.findByPk(req.params.id);

    if (!liveClass) {
      return res.status(404).json({
        success: false,
        message: 'Live class not found'
      });
    }

    if (liveClass.teacherId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to end this live class'
      });
    }

    await liveClass.update({
      status: 'completed',
      endedAt: new Date(),
      recordingUrl
    });

    res.status(200).json({
      success: true,
      message: 'Live class ended successfully',
      data: liveClass
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to end live class',
      error: error.message
    });
  }
};

// @desc    Enroll in live class
// @route   POST /api/live-classes/:id/enroll
// @access  Private (Student only)
exports.enrollInLiveClass = async (req, res) => {
  try {
    const liveClass = await LiveClass.findByPk(req.params.id, {
      include: [
        {
          model: Enrollment,
          as: 'enrollments'
        }
      ]
    });

    if (!liveClass) {
      return res.status(404).json({
        success: false,
        message: 'Live class not found'
      });
    }

    if (liveClass.status === 'completed' || liveClass.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Cannot enroll in this live class'
      });
    }

    // Check max attendees
    if (liveClass.maxAttendees && liveClass.enrollments.length >= liveClass.maxAttendees) {
      return res.status(400).json({
        success: false,
        message: 'Live class is full'
      });
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      where: {
        studentId: req.user.id,
        liveClassId: liveClass.id
      }
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this live class'
      });
    }

    const enrollment = await Enrollment.create({
      studentId: req.user.id,
      liveClassId: liveClass.id
    });

    res.status(201).json({
      success: true,
      message: 'Enrolled successfully',
      data: enrollment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Enrollment failed',
      error: error.message
    });
  }
};

// @desc    Get student's enrolled live classes
// @route   GET /api/live-classes/my-enrollments
// @access  Private (Student only)
exports.getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll({
      where: { studentId: req.user.id, liveClassId: { [Op.ne]: null } },
      include: [
        {
          model: LiveClass,
          as: 'liveClass',
          include: [
            {
              model: User,
              as: 'teacher',
              attributes: ['id', 'firstName', 'lastName']
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch enrollments',
      error: error.message
    });
  }
};

// @desc    Get Zoom SDK token for joining meeting
// @route   POST /api/live-classes/:id/zoom-token
// @access  Private
exports.getZoomSDKToken = async (req, res) => {
  try {
    const liveClass = await LiveClass.findByPk(req.params.id);

    if (!liveClass) {
      return res.status(404).json({
        success: false,
        message: 'Live class not found'
      });
    }

    const zoomMeetingId = liveClass.settings?.zoomMeetingId;
    if (!zoomMeetingId) {
      return res.status(400).json({
        success: false,
        message: 'This class does not have a Zoom meeting'
      });
    }

    // Determine role: 1 for host (teacher), 0 for participant (student)
    const role = liveClass.teacherId === req.user.id ? 1 : 0;

    const sdkToken = zoomService.generateZoomSDKJWT(zoomMeetingId, role);

    res.status(200).json({
      success: true,
      data: {
        sdkToken,
        meetingNumber: zoomMeetingId,
        password: liveClass.settings?.zoomPassword,
        role,
        userName: `${req.user.firstName} ${req.user.lastName}`,
        userEmail: req.user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate Zoom token',
      error: error.message
    });
  }
};

// @desc    Get Zoom meeting participants
// @route   GET /api/live-classes/:id/participants
// @access  Private (Teacher only)
exports.getZoomParticipants = async (req, res) => {
  try {
    const liveClass = await LiveClass.findByPk(req.params.id);

    if (!liveClass) {
      return res.status(404).json({
        success: false,
        message: 'Live class not found'
      });
    }

    if (liveClass.teacherId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    const zoomMeetingId = liveClass.settings?.zoomMeetingId;
    if (!zoomMeetingId) {
      return res.status(400).json({
        success: false,
        message: 'This class does not have a Zoom meeting'
      });
    }

    const participants = await zoomService.getMeetingParticipants(zoomMeetingId);

    res.status(200).json({
      success: true,
      data: participants
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch participants',
      error: error.message
    });
  }
};

// @desc    Get Zoom meeting recordings
// @route   GET /api/live-classes/:id/recordings
// @access  Private
exports.getZoomRecordings = async (req, res) => {
  try {
    const liveClass = await LiveClass.findByPk(req.params.id);

    if (!liveClass) {
      return res.status(404).json({
        success: false,
        message: 'Live class not found'
      });
    }

    const zoomMeetingId = liveClass.settings?.zoomMeetingId;
    if (!zoomMeetingId) {
      return res.status(400).json({
        success: false,
        message: 'This class does not have a Zoom meeting'
      });
    }

    const recordings = await zoomService.getMeetingRecordings(zoomMeetingId);

    res.status(200).json({
      success: true,
      data: recordings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recordings',
      error: error.message
    });
  }
};
