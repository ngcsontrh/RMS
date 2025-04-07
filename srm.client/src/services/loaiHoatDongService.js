import apiClient from '../utils/axiosInterceptor';

const loaiHoatDongService = {
  add: (data) => apiClient.post('/api/loaihoatdong/create', data),
  update: (data) => apiClient.post('/api/loaihoatdong/update', data),
  delete: (id) => apiClient.post('/api/loaihoatdong/delete', { id }),
  getList: () => apiClient.get('/api/loaihoatdong/list'),
  getById: (id) => apiClient.get(`/api/loaihoatdong/${id}`),
  getPage: (pageIndex, pageSize) => apiClient.get('/api/loaihoatdong/page', { params: { pageIndex, pageSize } }),
};

export default loaiHoatDongService;