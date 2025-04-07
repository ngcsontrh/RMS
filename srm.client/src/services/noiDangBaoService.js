import apiClient from '../utils/axiosInterceptor';

const noiDangBaoService = {
  add: (data) => apiClient.post('/api/noidangbao/create', data),
  update: (data) => apiClient.post('/api/noidangbao/update', data),
  delete: (id) => apiClient.post('/api/noidangbao/delete', { id }),
  getList: () => apiClient.get('/api/noidangbao/list'),
  getById: (id) => apiClient.get(`/api/noidangbao/${id}`),
  getPage: (pageIndex, pageSize) => apiClient.get('/api/noidangbao/page', { params: { pageIndex, pageSize } }),
};

export default noiDangBaoService;