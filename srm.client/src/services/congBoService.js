import apiClient from '../utils/axiosInterceptor';

const congBoService = {
  add: (data) => apiClient.post('/api/congbo/create', data),
  update: (data) => apiClient.post('/api/congbo/update', data),
  getById: (id) => apiClient.get(`/api/congbo/${id}`),
  getPage: (pageIndex, pageSize) => apiClient.get('/api/congbo/page', { params: { pageIndex, pageSize } }),
};

export default congBoService;