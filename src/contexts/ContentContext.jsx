import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  moduleService, 
  assignmentService, 
  quizService, 
  liveClassService, 
  notificationService 
} from '../services/contentService';

const ContentContext = createContext();

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export const ContentProvider = ({ children }) => {
  const [publishedContent, setPublishedContent] = useState({
    assignments: [],
    quizzes: [],
    liveClasses: [],
    modules: []
  });

  const [notifications, setNotifications] = useState([]);
  const [liveClassUpdates, setLiveClassUpdates] = useState({});
  const [activePolls, setActivePolls] = useState({});
  const [classChatMessages, setClassChatMessages] = useState({});
  const [classAnnouncements, setClassAnnouncements] = useState({});
  const [loading, setLoading] = useState(false);

  // Load notifications on mount
  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await notificationService.getAll();
      if (response.data.success) {
        setNotifications(response.data.data);
      }
    } catch (error) {
      console.error('Failed to load notifications:', error);
    }
  };

  // Teacher functions - Publish content
  const publishAssignment = async (assignment) => {
    try {
      const response = await assignmentService.create(assignment);
      if (response.data.success) {
        const newAssignment = response.data.data;
        
        // Optionally publish immediately
        if (assignment.status === 'published') {
          await assignmentService.publish(newAssignment.id);
        }
        
        // Refresh assignments list
        await loadAssignments();
        return newAssignment;
      }
    } catch (error) {
      console.error('Failed to create assignment:', error);
      throw error;
    }
  };
  
  const updateAssignment = (assignmentId, updatedData) => {
    setPublishedContent(prev => ({
      ...prev,
      assignments: prev.assignments.map(assignment =>
        assignment.id === assignmentId
          ? { ...assignment, ...updatedData, updatedAt: new Date().toISOString() }
          : assignment
      )
    }));
    
    // Notify students about the update
    addNotification({
      id: Date.now(),
      type: 'assignment_updated',
      title: 'Assignment Updated',
      message: `${updatedData.title || 'An assignment'} has been updated`,
      assignmentId: assignmentId,
      createdAt: new Date().toISOString(),
      read: false
    });
  };
  
  const deleteAssignment = (assignmentId) => {
    setPublishedContent(prev => ({
      ...prev,
      assignments: prev.assignments.filter(assignment => assignment.id !== assignmentId)
    }));
  };

  const publishQuiz = (quiz) => {
    const newQuiz = {
      id: Date.now(),
      ...quiz,
      publishedAt: new Date().toISOString(),
      status: 'published',
      attempts: []
    };
    
    setPublishedContent(prev => ({
      ...prev,
      quizzes: [...prev.quizzes, newQuiz]
    }));

    // Create notification for students
    addNotification({
      id: Date.now(),
      type: 'quiz',
      title: 'New Quiz Available',
      message: `${quiz.title} - Time limit: ${quiz.timeLimit} minutes`,
      data: newQuiz,
      createdAt: new Date().toISOString(),
      read: false
    });

    return newQuiz;
  };
  
  const updateQuiz = (quizId, updatedData) => {
    setPublishedContent(prev => ({
      ...prev,
      quizzes: prev.quizzes.map(quiz =>
        quiz.id === quizId
          ? { ...quiz, ...updatedData, updatedAt: new Date().toISOString() }
          : quiz
      )
    }));
    
    // Notify students about the update
    addNotification({
      id: Date.now(),
      type: 'quiz_updated',
      title: 'Quiz Updated',
      message: `${updatedData.title || 'A quiz'} has been updated`,
      quizId: quizId,
      createdAt: new Date().toISOString(),
      read: false
    });
  };
  
  const deleteQuiz = (quizId) => {
    setPublishedContent(prev => ({
      ...prev,
      quizzes: prev.quizzes.filter(quiz => quiz.id !== quizId)
    }));
  };

  const publishLiveClass = (liveClass) => {
    const newLiveClass = {
      id: Date.now(),
      ...liveClass,
      publishedAt: new Date().toISOString(),
      status: 'scheduled',
      attendees: []
    };
    
    setPublishedContent(prev => ({
      ...prev,
      liveClasses: [...prev.liveClasses, newLiveClass]
    }));

    // Create notification for students
    addNotification({
      id: Date.now(),
      type: 'liveClass',
      title: 'New Live Class Scheduled',
      message: `${liveClass.title} - ${liveClass.scheduledDate} at ${liveClass.scheduledTime}`,
      data: newLiveClass,
      createdAt: new Date().toISOString(),
      read: false
    });

    return newLiveClass;
  };

  const publishModule = (module) => {
    const newModule = {
      id: Date.now(),
      ...module,
      publishedAt: new Date().toISOString(),
      status: 'published',
      enrollments: []
    };
    
    setPublishedContent(prev => ({
      ...prev,
      modules: [...prev.modules, newModule]
    }));

    // Create notification for students
    addNotification({
      id: Date.now(),
      type: 'module',
      title: 'New Course Module Available',
      message: `${module.title} - ${module.description}`,
      data: newModule,
      createdAt: new Date().toISOString(),
      read: false
    });

    return newModule;
  };

  // Student functions - Access content
  const getStudentAssignments = (studentId) => {
    return publishedContent.assignments.map(assignment => ({
      ...assignment,
      studentSubmission: assignment.submissions.find(sub => sub.studentId === studentId)
    }));
  };

  const getStudentQuizzes = (studentId) => {
    return publishedContent.quizzes.map(quiz => ({
      ...quiz,
      studentAttempt: quiz.attempts.find(attempt => attempt.studentId === studentId)
    }));
  };

  const getStudentLiveClasses = (studentId) => {
    return publishedContent.liveClasses.map(liveClass => ({
      ...liveClass,
      isEnrolled: liveClass.attendees.includes(studentId)
    }));
  };

  const getStudentModules = (studentId) => {
    return publishedContent.modules.map(module => ({
      ...module,
      isEnrolled: module.enrollments.includes(studentId),
      progress: module.enrollments.find(enrollment => enrollment.studentId === studentId)?.progress || 0
    }));
  };

  // Submission functions
  const submitAssignment = (assignmentId, studentId, submission) => {
    setPublishedContent(prev => ({
      ...prev,
      assignments: prev.assignments.map(assignment => 
        assignment.id === assignmentId 
          ? {
              ...assignment,
              submissions: [...assignment.submissions.filter(sub => sub.studentId !== studentId), {
                studentId,
                submission,
                submittedAt: new Date().toISOString(),
                status: 'submitted'
              }]
            }
          : assignment
      )
    }));
  };

  // Teacher grading function
  const gradeAssignment = (assignmentId, studentId, grade, feedback) => {
    setPublishedContent(prev => ({
      ...prev,
      assignments: prev.assignments.map(assignment => {
        if (assignment.id !== assignmentId) return assignment;
        const updatedSubmissions = assignment.submissions.map(sub =>
          sub.studentId === studentId
            ? { ...sub, grade, feedback, gradedAt: new Date().toISOString(), status: 'graded' }
            : sub
        );
        return { ...assignment, submissions: updatedSubmissions };
      })
    }));

    // Optional: notify the student
    addNotification({
      id: Date.now(),
      type: 'assignment',
      title: 'Assignment Graded',
      message: `Your assignment has been graded (Score: ${grade})`,
      data: { assignmentId, studentId, grade, feedback },
      createdAt: new Date().toISOString(),
      read: false
    });
  };

  const attemptQuiz = (quizId, studentId, answers) => {
    setPublishedContent(prev => ({
      ...prev,
      quizzes: prev.quizzes.map(quiz => 
        quiz.id === quizId 
          ? {
              ...quiz,
              attempts: [...quiz.attempts.filter(attempt => attempt.studentId !== studentId), {
                studentId,
                answers,
                attemptedAt: new Date().toISOString(),
                score: calculateQuizScore(quiz, answers)
              }]
            }
          : quiz
      )
    }));
  };

  const enrollInLiveClass = (liveClassId, studentId) => {
    setPublishedContent(prev => ({
      ...prev,
      liveClasses: prev.liveClasses.map(liveClass => 
        liveClass.id === liveClassId 
          ? {
              ...liveClass,
              attendees: liveClass.attendees.includes(studentId) 
                ? liveClass.attendees 
                : [...liveClass.attendees, studentId]
            }
          : liveClass
      )
    }));
  };
  
  // Real-time class management functions
  const startLiveClass = (classId) => {
    setPublishedContent(prev => ({
      ...prev,
      liveClasses: prev.liveClasses.map(liveClass =>
        liveClass.id === classId
          ? { ...liveClass, status: 'live', startedAt: new Date().toISOString() }
          : liveClass
      )
    }));
    
    addNotification({
      id: Date.now(),
      type: 'class_started',
      title: 'Live Class Started',
      message: 'A live class you enrolled in has started',
      classId: classId,
      createdAt: new Date().toISOString(),
      read: false
    });
  };
  
  const endLiveClass = (classId) => {
    setPublishedContent(prev => ({
      ...prev,
      liveClasses: prev.liveClasses.map(liveClass =>
        liveClass.id === classId
          ? { ...liveClass, status: 'completed', endedAt: new Date().toISOString() }
          : liveClass
      )
    }));
  };
  
  const updateClassSettings = (classId, settings) => {
    setLiveClassUpdates(prev => ({
      ...prev,
      [classId]: { ...prev[classId], settings, timestamp: Date.now() }
    }));
  };
  
  const createPoll = (classId, poll) => {
    const newPoll = {
      id: Date.now(),
      ...poll,
      votes: {},
      createdAt: new Date().toISOString()
    };
    
    setActivePolls(prev => ({
      ...prev,
      [classId]: [...(prev[classId] || []), newPoll]
    }));
    
    setLiveClassUpdates(prev => ({
      ...prev,
      [classId]: { ...prev[classId], newPoll: newPoll, timestamp: Date.now() }
    }));
  };
  
  const votePoll = (classId, pollId, optionIndex, studentId) => {
    setActivePolls(prev => ({
      ...prev,
      [classId]: prev[classId].map(poll =>
        poll.id === pollId
          ? { ...poll, votes: { ...poll.votes, [studentId]: optionIndex } }
          : poll
      )
    }));
  };
  
  const sendClassMessage = (classId, message, sender, isTeacher = false) => {
    const newMessage = {
      id: Date.now(),
      message,
      sender,
      isTeacher,
      timestamp: new Date().toISOString()
    };
    
    setClassChatMessages(prev => ({
      ...prev,
      [classId]: [...(prev[classId] || []), newMessage]
    }));
    
    setLiveClassUpdates(prev => ({
      ...prev,
      [classId]: { ...prev[classId], newMessage: newMessage, timestamp: Date.now() }
    }));
  };
  
  const sendAnnouncement = (classId, announcement) => {
    const newAnnouncement = {
      id: Date.now(),
      message: announcement,
      timestamp: new Date().toISOString()
    };
    
    setClassAnnouncements(prev => ({
      ...prev,
      [classId]: [...(prev[classId] || []), newAnnouncement]
    }));
    
    setLiveClassUpdates(prev => ({
      ...prev,
      [classId]: { ...prev[classId], announcement: newAnnouncement, timestamp: Date.now() }
    }));
    
    addNotification({
      id: Date.now(),
      type: 'class_announcement',
      title: 'Class Announcement',
      message: announcement,
      classId: classId,
      createdAt: new Date().toISOString(),
      read: false
    });
  };
  
  const muteStudent = (classId, studentId) => {
    setLiveClassUpdates(prev => ({
      ...prev,
      [classId]: { 
        ...prev[classId], 
        mutedStudents: [...(prev[classId]?.mutedStudents || []), studentId],
        timestamp: Date.now() 
      }
    }));
  };
  
  const unmuteStudent = (classId, studentId) => {
    setLiveClassUpdates(prev => ({
      ...prev,
      [classId]: { 
        ...prev[classId], 
        mutedStudents: (prev[classId]?.mutedStudents || []).filter(id => id !== studentId),
        timestamp: Date.now() 
      }
    }));
  };
  
  const enableFeature = (classId, feature, enabled) => {
    setLiveClassUpdates(prev => ({
      ...prev,
      [classId]: { 
        ...prev[classId], 
        features: { ...prev[classId]?.features, [feature]: enabled },
        timestamp: Date.now() 
      }
    }));
  };
  
  const shareScreen = (classId, isSharing, screenData = null) => {
    setLiveClassUpdates(prev => ({
      ...prev,
      [classId]: { 
        ...prev[classId], 
        screenShare: { isSharing, data: screenData },
        timestamp: Date.now() 
      }
    }));
  };
  
  const updateWhiteboard = (classId, whiteboardData) => {
    setLiveClassUpdates(prev => ({
      ...prev,
      [classId]: { 
        ...prev[classId], 
        whiteboard: whiteboardData,
        timestamp: Date.now() 
      }
    }));
  };
  
  const createBreakoutRooms = (classId, rooms) => {
    setLiveClassUpdates(prev => ({
      ...prev,
      [classId]: { 
        ...prev[classId], 
        breakoutRooms: rooms,
        timestamp: Date.now() 
      }
    }));
  };
  
  const assignToBreakoutRoom = (classId, studentId, roomId) => {
    setLiveClassUpdates(prev => ({
      ...prev,
      [classId]: { 
        ...prev[classId], 
        breakoutAssignments: { 
          ...prev[classId]?.breakoutAssignments, 
          [studentId]: roomId 
        },
        timestamp: Date.now() 
      }
    }));
  };
  
  const getClassUpdates = (classId) => {
    return liveClassUpdates[classId] || {};
  };
  
  const getClassPolls = (classId) => {
    return activePolls[classId] || [];
  };
  
  const getClassMessages = (classId) => {
    return classChatMessages[classId] || [];
  };
  
  const getClassAnnouncements = (classId) => {
    return classAnnouncements[classId] || [];
  };

  const enrollInModule = (moduleId, studentId) => {
    setPublishedContent(prev => ({
      ...prev,
      modules: prev.modules.map(module => 
        module.id === moduleId 
          ? {
              ...module,
              enrollments: module.enrollments.includes(studentId) 
                ? module.enrollments 
                : [...module.enrollments, { studentId, enrolledAt: new Date().toISOString(), progress: 0 }]
            }
          : module
      )
    }));
  };

  // Notification functions
  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const getUnreadNotifications = () => {
    return notifications.filter(notification => !notification.read);
  };

  // Helper function to calculate quiz score
  const calculateQuizScore = (quiz, answers) => {
    let correct = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / quiz.questions.length) * 100);
  };

  const value = {
    // Content data
    publishedContent,
    notifications,
    
    // Teacher functions
    publishAssignment,
    updateAssignment,
    deleteAssignment,
    publishQuiz,
    updateQuiz,
    deleteQuiz,
    publishLiveClass,
    publishModule,
    
    // Student functions
    getStudentAssignments,
    getStudentQuizzes,
    getStudentLiveClasses,
    getStudentModules,
    
    // Submission functions
    submitAssignment,
    attemptQuiz,
    enrollInLiveClass,
    enrollInModule,
    gradeAssignment,
    
    // Real-time class management
    startLiveClass,
    endLiveClass,
    updateClassSettings,
    createPoll,
    votePoll,
    sendClassMessage,
    sendAnnouncement,
    muteStudent,
    unmuteStudent,
    enableFeature,
    shareScreen,
    updateWhiteboard,
    createBreakoutRooms,
    assignToBreakoutRoom,
    getClassUpdates,
    getClassPolls,
    getClassMessages,
    getClassAnnouncements,
    
    // Notification functions
    addNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    getUnreadNotifications
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};
