import apiClient from '../utils/axiosInterceptor';

const authService = {
  login: (data) => apiClient.post('/api/auth/login', data),
  getMe: () => apiClient.get('/api/auth/me'),
};

export default authService;