import apiClient from '../utils/axiosInterceptor';

const deTaiService = {
  add: (data) => apiClient.post('/api/detai/create', data),
  update: (data) => apiClient.post('/api/detai/update', data),
  getById: (id) => apiClient.get(`/api/detai/${id}`),
  getPage: (pageIndex, pageSize) => apiClient.get('/api/detai/page', { params: { pageIndex, pageSize } }),
};

export default deTaiService;