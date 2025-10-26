import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  getProfile: () => api.get('/user/profile'),
};

// Quiz API
export const quizAPI = {
  generateQuiz: (data) => api.post('/quiz/generate', data),
  submitQuiz: (data) => api.post('/quiz/submit', data),
  getHistory: () => api.get('/quiz/history'),
  getLeaderboard: () => api.get('/quiz/leaderboard'),
};

// Chat API
export const chatAPI = {
  sendMessage: (data) => api.post('/chat/message', data),
  getChats: () => api.get('/chat'),
  getChat: (id) => api.get(`/chat/${id}`),
  deleteChat: (id) => api.delete(`/chat/${id}`),
};

// Summarizer API
export const summarizerAPI = {
  uploadPaper: (formData) => api.post('/summarizer/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getPapers: () => api.get('/summarizer/papers'),
  getPaper: (id) => api.get(`/summarizer/papers/${id}`),
  deletePaper: (id) => api.delete(`/summarizer/papers/${id}`),
};

// Interaction API
export const interactionAPI = {
  checkInteractions: (data) => api.post('/interaction/check', data),
  getDrugInfo: (name) => api.get(`/interaction/drug/${name}`),
};

// User API
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
  getStats: () => api.get('/user/stats'),
  uploadAvatar: (formData) => api.post('/user/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getActivity: () => api.get('/user/activity'),
};

export default api;
