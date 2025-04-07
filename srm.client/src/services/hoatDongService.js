import apiClient from '../utils/axiosInterceptor';

const hoatDongService = {
  add: (data) => apiClient.post('/api/hoatdong/create', data),
  update: (data) => apiClient.post('/api/hoatdong/update', data),
  getById: (id) => apiClient.get(`/api/hoatdong/${id}`),
  getPage: (pageIndex, pageSize) => apiClient.get('/api/hoatdong/page', { params: { pageIndex, pageSize } }),
};

export default hoatDongService;