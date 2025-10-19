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
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [publishedContent, setPublishedContent] = useState({
    assignments: [],
    quizzes: [],
    modules: [],
    liveClasses: []
  });

  // Load content only when needed, not on every mount
  // This prevents unnecessary API calls on login
  useEffect(() => {
    // Don't auto-load on mount to prevent errors on login
    // Content will be loaded when pages need it
  }, []);

  // Load all published content for teachers
  const loadPublishedContent = async () => {
    try {
      const [assignments, modules, liveClasses] = await Promise.all([
        assignmentService.getAll().catch(() => ({ data: { data: [] } })),
        moduleService.getAll().catch(() => ({ data: { data: [] } })),
        liveClassService.getAll().catch(() => ({ data: { data: [] } }))
      ]);

      setPublishedContent({
        assignments: assignments?.data?.data || [],
        quizzes: [], // Quizzes are part of modules
        modules: modules?.data?.data || [],
        liveClasses: liveClasses?.data?.data || []
      });
    } catch (error) {
      console.log('Failed to load published content');
      // Set empty arrays on error to prevent undefined issues
      setPublishedContent({
        assignments: [],
        quizzes: [],
        modules: [],
        liveClasses: []
      });
    }
  };

  const loadNotifications = async () => {
    try {
      const response = await notificationService.getAll();
      if (response.data.success) {
        setNotifications(response.data.data || []);
      }
    } catch (error) {
      // Silently fail - notifications are not critical
      console.log('Notifications not available');
      setNotifications([]);
    }
  };

  // ========== ASSIGNMENT FUNCTIONS ==========
  
  const publishAssignment = async (assignment) => {
    try {
      setLoading(true);
      const response = await assignmentService.create(assignment);
      if (response.data.success) {
        const newAssignment = response.data.data;
        
        // Publish if status is published
        if (assignment.status === 'published') {
          await assignmentService.publish(newAssignment.id);
        }
        
        // Reload published content
        await loadPublishedContent();
        
        return newAssignment;
      }
    } catch (error) {
      console.error('Failed to create assignment:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateAssignment = async (assignmentId, updatedData) => {
    try {
      const response = await assignmentService.update(assignmentId, updatedData);
      return response.data;
    } catch (error) {
      console.error('Failed to update assignment:', error);
      throw error;
    }
  };

  const deleteAssignment = async (assignmentId) => {
    try {
      await assignmentService.delete(assignmentId);
    } catch (error) {
      console.error('Failed to delete assignment:', error);
      throw error;
    }
  };

  const submitAssignment = async (assignmentId, submission) => {
    try {
      const response = await assignmentService.submit(assignmentId, submission);
      return response.data;
    } catch (error) {
      console.error('Failed to submit assignment:', error);
      throw error;
    }
  };

  const gradeAssignment = async (submissionId, grade, feedback) => {
    try {
      const response = await assignmentService.gradeSubmission(submissionId, { grade, feedback });
      return response.data;
    } catch (error) {
      console.error('Failed to grade assignment:', error);
      throw error;
    }
  };

  const getStudentAssignments = async () => {
    try {
      const response = await assignmentService.getAll();
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to get assignments:', error);
      return [];
    }
  };

  // ========== QUIZ FUNCTIONS ==========

  const publishQuiz = async (quiz) => {
    try {
      setLoading(true);
      const response = await quizService.create(quiz);
      if (response.data.success) {
        const newQuiz = response.data.data;
        
        if (quiz.status === 'published') {
          await quizService.publish(newQuiz.id);
        }
        
        return newQuiz;
      }
    } catch (error) {
      console.error('Failed to create quiz:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateQuiz = async (quizId, updatedData) => {
    try {
      const response = await quizService.update(quizId, updatedData);
      return response.data;
    } catch (error) {
      console.error('Failed to update quiz:', error);
      throw error;
    }
  };

  const deleteQuiz = async (quizId) => {
    try {
      await quizService.delete(quizId);
    } catch (error) {
      console.error('Failed to delete quiz:', error);
      throw error;
    }
  };

  const attemptQuiz = async (quizId, answers) => {
    try {
      // Start attempt
      const startResponse = await quizService.startAttempt(quizId);
      const attemptId = startResponse.data.data.id;
      
      // Submit answers
      const submitResponse = await quizService.submitAttempt(attemptId, { answers });
      return submitResponse.data;
    } catch (error) {
      console.error('Failed to attempt quiz:', error);
      throw error;
    }
  };

  const getStudentQuizzes = async () => {
    try {
      const response = await quizService.getAll();
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to get quizzes:', error);
      return [];
    }
  };

  // ========== MODULE FUNCTIONS ==========

  const publishModule = async (module) => {
    try {
      setLoading(true);
      const response = await moduleService.create(module);
      if (response.data.success) {
        const newModule = response.data.data;
        
        if (module.status === 'published') {
          await moduleService.publish(newModule.id);
        }
        
        // Reload published content so it shows up immediately
        await loadPublishedContent();
        
        return newModule;
      }
    } catch (error) {
      console.error('Failed to create module:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const enrollInModule = async (moduleId) => {
    try {
      const response = await moduleService.enroll(moduleId);
      return response.data;
    } catch (error) {
      console.error('Failed to enroll in module:', error);
      throw error;
    }
  };

  const getStudentModules = async () => {
    try {
      const response = await moduleService.getAll({ status: 'published' });
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to get modules:', error);
      return [];
    }
  };

  // ========== LIVE CLASS FUNCTIONS ==========

  const publishLiveClass = async (liveClass) => {
    try {
      setLoading(true);
      const response = await liveClassService.create(liveClass);
      
      // Reload published content so it shows up immediately
      await loadPublishedContent();
      
      return response.data.data;
    } catch (error) {
      console.error('Failed to create live class:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const enrollInLiveClass = async (liveClassId) => {
    try {
      const response = await liveClassService.enroll(liveClassId);
      return response.data;
    } catch (error) {
      console.error('Failed to enroll in live class:', error);
      throw error;
    }
  };

  const startLiveClass = async (classId) => {
    try {
      const response = await liveClassService.start(classId);
      return response.data;
    } catch (error) {
      console.error('Failed to start live class:', error);
      throw error;
    }
  };

  const endLiveClass = async (classId, recordingUrl = null) => {
    try {
      const response = await liveClassService.end(classId, { recordingUrl });
      return response.data;
    } catch (error) {
      console.error('Failed to end live class:', error);
      throw error;
    }
  };

  const getStudentLiveClasses = async () => {
    try {
      const response = await liveClassService.getAll();
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to get live classes:', error);
      return [];
    }
  };

  // ========== NOTIFICATION FUNCTIONS ==========

  const addNotification = async (notification) => {
    // Notifications are created by backend automatically
    await loadNotifications();
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      await notificationService.markAsRead(notificationId);
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const markAllNotificationsAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  const getUnreadNotifications = () => {
    return notifications.filter(notification => !notification.read);
  };

  // ========== REAL-TIME CLASS MANAGEMENT (Keep local state for now) ==========
  
  const [liveClassUpdates, setLiveClassUpdates] = useState({});
  const [activePolls, setActivePolls] = useState({});
  const [classChatMessages, setClassChatMessages] = useState({});
  const [classAnnouncements, setClassAnnouncements] = useState({});

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
  };

  const getClassUpdates = (classId) => liveClassUpdates[classId] || {};
  const getClassPolls = (classId) => activePolls[classId] || [];
  const getClassMessages = (classId) => classChatMessages[classId] || [];
  const getClassAnnouncements = (classId) => classAnnouncements[classId] || [];

  const value = {
    // State
    notifications,
    loading,
    publishedContent,
    loadPublishedContent,
    
    // Assignment functions
    publishAssignment,
    updateAssignment,
    deleteAssignment,
    submitAssignment,
    gradeAssignment,
    getStudentAssignments,
    
    // Quiz functions
    publishQuiz,
    updateQuiz,
    deleteQuiz,
    attemptQuiz,
    getStudentQuizzes,
    
    // Module functions
    publishModule,
    enrollInModule,
    getStudentModules,
    
    // Live class functions
    publishLiveClass,
    enrollInLiveClass,
    startLiveClass,
    endLiveClass,
    getStudentLiveClasses,
    
    // Notification functions
    addNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    getUnreadNotifications,
    
    // Real-time class management
    updateClassSettings,
    createPoll,
    votePoll,
    sendClassMessage,
    sendAnnouncement,
    getClassUpdates,
    getClassPolls,
    getClassMessages,
    getClassAnnouncements
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};
