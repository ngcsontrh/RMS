import apiClient from '../utils/axiosInterceptor';

const thanhQuaService = {
  add: (data) => apiClient.post('/api/thanhqua/create', data),
  update: (data) => apiClient.post('/api/thanhqua/update', data),
  delete: (id) => apiClient.post('/api/thanhqua/delete', { id }),
  getList: () => apiClient.get('/api/thanhqua/list'),
  getById: (id) => apiClient.get(`/api/thanhqua/${id}`),
  getPage: (pageIndex, pageSize) => apiClient.get('/api/thanhqua/page', { params: { pageIndex, pageSize } }),
};

export default thanhQuaService;