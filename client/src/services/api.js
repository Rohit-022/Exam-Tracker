import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Add authorization token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
export const getProfile = () => API.get('/auth/profile');
export const updateProfile = (data) => API.put('/auth/profile', data);

// Exam APIs
export const getAllExams = () => API.get('/exams');
export const getExamById = (id) => API.get(`/exams/${id}`);
export const selectExam = (examId) => API.post('/exams/select', { examId });
export const deselectExam = (examId) => API.post('/exams/deselect', { examId });

// Study Plan APIs
export const createStudyPlan = (data) => API.post('/study-plans', data);
export const getStudyPlans = () => API.get('/study-plans');
export const getStudyPlanById = (id) => API.get(`/study-plans/${id}`);
export const updateStudyPlan = (id, data) => API.put(`/study-plans/${id}`, data);
export const deleteStudyPlan = (id) => API.delete(`/study-plans/${id}`);

// Task APIs
export const createTask = (data) => API.post('/tasks', data);
export const getTasks = (studyPlanId) => API.get('/tasks', { params: { studyPlanId } });
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

// Notification APIs
export const getAllNotifications = () => API.get('/notifications');
export const getNotificationsByExam = (examId) => API.get(`/notifications/exam/${examId}`);
export const createNotification = (data) => API.post('/notifications', data);
export const deleteNotification = (id) => API.delete(`/notifications/${id}`);

export default API;
