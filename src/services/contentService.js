import api from '../utils/api';

// Module Services
export const moduleService = {
  getAll: (params) => api.get('/modules', { params }),
  getById: (id) => api.get(`/modules/${id}`),
  create: (data) => api.post('/modules', data),
  update: (id, data) => api.put(`/modules/${id}`, data),
  delete: (id) => api.delete(`/modules/${id}`),
  publish: (id) => api.put(`/modules/${id}/publish`),
  enroll: (id) => api.post(`/modules/${id}/enroll`),
  getMyEnrollments: () => api.get('/modules/my-enrollments')
};

// Assignment Services
export const assignmentService = {
  getAll: (params) => api.get('/assignments', { params }),
  getById: (id) => api.get(`/assignments/${id}`),
  create: (data) => api.post('/assignments', data),
  update: (id, data) => api.put(`/assignments/${id}`, data),
  delete: (id) => api.delete(`/assignments/${id}`),
  publish: (id) => api.put(`/assignments/${id}/publish`),
  submit: (id, data) => api.post(`/assignments/${id}/submit`, data),
  gradeSubmission: (submissionId, data) => api.put(`/assignments/submissions/${submissionId}/grade`, data),
  getMySubmissions: () => api.get('/assignments/my-submissions')
};

// Quiz Services
export const quizService = {
  getAll: (params) => api.get('/quizzes', { params }),
  getById: (id) => api.get(`/quizzes/${id}`),
  create: (data) => api.post('/quizzes', data),
  update: (id, data) => api.put(`/quizzes/${id}`, data),
  delete: (id) => api.delete(`/quizzes/${id}`),
  publish: (id) => api.put(`/quizzes/${id}/publish`),
  startAttempt: (id) => api.post(`/quizzes/${id}/attempt`),
  submitAttempt: (attemptId, data) => api.put(`/quizzes/attempts/${attemptId}/submit`, data),
  getMyAttempts: () => api.get('/quizzes/my-attempts')
};

// Live Class Services
export const liveClassService = {
  getAll: (params) => api.get('/live-classes', { params }),
  getById: (id) => api.get(`/live-classes/${id}`),
  create: (data) => api.post('/live-classes', data),
  update: (id, data) => api.put(`/live-classes/${id}`, data),
  delete: (id) => api.delete(`/live-classes/${id}`),
  start: (id) => api.put(`/live-classes/${id}/start`),
  end: (id, data) => api.put(`/live-classes/${id}/end`, data),
  enroll: (id) => api.post(`/live-classes/${id}/enroll`),
  getMyEnrollments: () => api.get('/live-classes/my-enrollments')
};

// Notification Services
export const notificationService = {
  getAll: (params) => api.get('/notifications', { params }),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/read-all'),
  delete: (id) => api.delete(`/notifications/${id}`),
  getUnreadCount: () => api.get('/notifications/unread-count')
};
