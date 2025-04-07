import apiClient from '../utils/axiosInterceptor';

const capDeTaiService = {
  add: (data) => apiClient.post('/api/capdetai/create', data),
  update: (data) => apiClient.post('/api/capdetai/update', data),
  delete: (id) => apiClient.post('/api/capdetai/delete', { id }),
  getList: () => apiClient.get('/api/capdetai/list'),
  getById: (id) => apiClient.get(`/api/capdetai/${id}`),
  getPage: (pageIndex, pageSize) => apiClient.get('/api/capdetai/page', { params: { pageIndex, pageSize } }),
};

export default capDeTaiService;