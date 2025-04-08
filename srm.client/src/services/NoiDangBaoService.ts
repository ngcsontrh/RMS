import { NoiDangBaoData } from '../models/NoiDangBaoData';
import { GuidData } from '../models/GuidData';
import { PageData } from '../models/PageData';
import api from '../utils/api';

/**
 * Create a new NoiDangBao
 * @param data NoiDangBao data to create
 * @returns Promise with created data
 */
export const create = async (data: NoiDangBaoData): Promise<NoiDangBaoData> => {
  const response = await api.post<NoiDangBaoData>('/NoiDangBao/create', data);
  return response.data;
};

/**
 * Update an existing NoiDangBao
 * @param data NoiDangBao data to update
 * @returns Promise with updated data
 */
export const update = async (data: NoiDangBaoData): Promise<NoiDangBaoData> => {
  const response = await api.post<NoiDangBaoData>('/NoiDangBao/update', data);
  return response.data;
};

/**
 * Delete a NoiDangBao by ID
 * @param id ID of the NoiDangBao to delete
 */
export const remove = async (id: string): Promise<void> => {
  const guidData: GuidData = { id };
  await api.post('/NoiDangBao/delete', guidData);
};

/**
 * Get a list of all NoiDangBao
 * @returns Promise with list of NoiDangBao
 */
export const list = async (): Promise<NoiDangBaoData[]> => {
  const response = await api.get<NoiDangBaoData[]>('/NoiDangBao/list');
  return response.data;
};

/**
 * Get a NoiDangBao by ID
 * @param id ID of the NoiDangBao to get
 * @returns Promise with NoiDangBao data
 */
export const getById = async (id: string): Promise<NoiDangBaoData> => {
  const response = await api.get<NoiDangBaoData>(`/NoiDangBao/${id}`);
  return response.data;
};

/**
 * Get a paged list of NoiDangBao
 * @param pageIndex Current page index (1-based)
 * @param pageSize Number of items per page
 * @returns Promise with paged data
 */
export const getPage = async (pageIndex: number = 1, pageSize: number = 10): Promise<PageData<NoiDangBaoData>> => {
  const response = await api.get<PageData<NoiDangBaoData>>('/NoiDangBao/page', {
    params: { pageIndex, pageSize }
  });
  return response.data;
};