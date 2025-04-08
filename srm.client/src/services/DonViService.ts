import { DonViData } from '../models/DonViData';
import { GuidData } from '../models/GuidData';
import { PageData } from '../models/PageData';
import api from '../utils/api';

/**
 * Create a new DonVi
 * @param data DonVi data to create
 * @returns Promise with created data
 */
export const create = async (data: DonViData): Promise<DonViData> => {
  const response = await api.post<DonViData>('/DonVi/create', data);
  return response.data;
};

/**
 * Update an existing DonVi
 * @param data DonVi data to update
 * @returns Promise with updated data
 */
export const update = async (data: DonViData): Promise<DonViData> => {
  const response = await api.post<DonViData>('/DonVi/update', data);
  return response.data;
};

/**
 * Delete a DonVi by ID
 * @param id ID of the DonVi to delete
 */
export const remove = async (id: string): Promise<void> => {
  const guidData: GuidData = { id };
  await api.post('/DonVi/delete', guidData);
};

/**
 * Get a list of all DonVi
 * @returns Promise with list of DonVi
 */
export const list = async (): Promise<DonViData[]> => {
  const response = await api.get<DonViData[]>('/DonVi/list');
  return response.data;
};

/**
 * Get a DonVi by ID
 * @param id ID of the DonVi to get
 * @returns Promise with DonVi data
 */
export const getById = async (id: string): Promise<DonViData> => {
  const response = await api.get<DonViData>(`/DonVi/${id}`);
  return response.data;
};

/**
 * Get a paged list of DonVi
 * @param pageIndex Current page index (1-based)
 * @param pageSize Number of items per page
 * @returns Promise with paged data
 */
export const getPage = async (pageIndex: number = 1, pageSize: number = 10): Promise<PageData<DonViData>> => {
  const response = await api.get<PageData<DonViData>>('/DonVi/page', {
    params: { pageIndex, pageSize }
  });
  return response.data;
};