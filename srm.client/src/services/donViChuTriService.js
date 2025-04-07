import apiClient from '../utils/axiosInterceptor';

const donViChuTriService = {
  add: (data) => apiClient.post('/api/donvichutri/create', data),
  update: (data) => apiClient.post('/api/donvichutri/update', data),
  delete: (id) => apiClient.post('/api/donvichutri/delete', { id }),
  getList: () => apiClient.get('/api/donvichutri/list'),
  getById: (id) => apiClient.get(`/api/donvichutri/${id}`),
  getPage: (pageIndex, pageSize) => apiClient.get('/api/donvichutri/page', { params: { pageIndex, pageSize } }),
};

export default donViChuTriService;