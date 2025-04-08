import { ThanhQuaData } from '../models/ThanhQuaData';
import { GuidData } from '../models/GuidData';
import { PageData } from '../models/PageData';
import api from '../utils/api';

/**
 * Create a new ThanhQua
 * @param data ThanhQua data to create
 * @returns Promise with created data
 */
export const create = async (data: ThanhQuaData): Promise<ThanhQuaData> => {
  const response = await api.post<ThanhQuaData>('/ThanhQua/create', data);
  return response.data;
};

/**
 * Update an existing ThanhQua
 * @param data ThanhQua data to update
 * @returns Promise with updated data
 */
export const update = async (data: ThanhQuaData): Promise<ThanhQuaData> => {
  const response = await api.post<ThanhQuaData>('/ThanhQua/update', data);
  return response.data;
};

/**
 * Delete a ThanhQua by ID
 * @param id ID of the ThanhQua to delete
 */
export const remove = async (id: string): Promise<void> => {
  const guidData: GuidData = { id };
  await api.post('/ThanhQua/delete', guidData);
};

/**
 * Get a list of all ThanhQua
 * @returns Promise with list of ThanhQua
 */
export const list = async (): Promise<ThanhQuaData[]> => {
  const response = await api.get<ThanhQuaData[]>('/ThanhQua/list');
  return response.data;
};

/**
 * Get a ThanhQua by ID
 * @param id ID of the ThanhQua to get
 * @returns Promise with ThanhQua data
 */
export const getById = async (id: string): Promise<ThanhQuaData> => {
  const response = await api.get<ThanhQuaData>(`/ThanhQua/${id}`);
  return response.data;
};

/**
 * Get a paged list of ThanhQua
 * @param pageIndex Current page index (1-based)
 * @param pageSize Number of items per page
 * @returns Promise with paged data
 */
export const getPage = async (pageIndex: number = 1, pageSize: number = 10): Promise<PageData<ThanhQuaData>> => {
  const response = await api.get<PageData<ThanhQuaData>>('/ThanhQua/page', {
    params: { pageIndex, pageSize }
  });
  return response.data;
};