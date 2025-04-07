import apiClient from '../utils/axiosInterceptor';

const donViService = {
  add: (data) => apiClient.post('/api/donvi/create', data),
  update: (data) => apiClient.post('/api/donvi/update', data),
  delete: (id) => apiClient.post('/api/donvi/delete', { id }),
  getList: () => apiClient.get('/api/donvi/list'),
  getById: (id) => apiClient.get(`/api/donvi/${id}`),
  getPage: (pageIndex, pageSize) => apiClient.get('/api/donvi/page', { params: { pageIndex, pageSize } }),
};

export default donViService;