import { DonViChuTriData } from '../models/DonViChuTriData';
import { GuidData } from '../models/GuidData';
import { PageData } from '../models/PageData';
import api from '../utils/api';

/**
 * Create a new DonViChuTri
 * @param data DonViChuTri data to create
 * @returns Promise with created data
 */
export const create = async (data: DonViChuTriData): Promise<DonViChuTriData> => {
  const response = await api.post<DonViChuTriData>('/DonViChuTri/create', data);
  return response.data;
};

/**
 * Update an existing DonViChuTri
 * @param data DonViChuTri data to update
 * @returns Promise with updated data
 */
export const update = async (data: DonViChuTriData): Promise<DonViChuTriData> => {
  const response = await api.post<DonViChuTriData>('/DonViChuTri/update', data);
  return response.data;
};

/**
 * Delete a DonViChuTri by ID
 * @param id ID of the DonViChuTri to delete
 */
export const remove = async (id: string): Promise<void> => {
  const guidData: GuidData = { id };
  await api.post('/DonViChuTri/delete', guidData);
};

/**
 * Get a list of all DonViChuTri
 * @returns Promise with list of DonViChuTri
 */
export const list = async (): Promise<DonViChuTriData[]> => {
  const response = await api.get<DonViChuTriData[]>('/DonViChuTri/list');
  return response.data;
};

/**
 * Get a DonViChuTri by ID
 * @param id ID of the DonViChuTri to get
 * @returns Promise with DonViChuTri data
 */
export const getById = async (id: string): Promise<DonViChuTriData> => {
  const response = await api.get<DonViChuTriData>(`/DonViChuTri/${id}`);
  return response.data;
};

/**
 * Get a paged list of DonViChuTri
 * @param pageIndex Current page index (1-based)
 * @param pageSize Number of items per page
 * @returns Promise with paged data
 */
export const getPage = async (pageIndex: number = 1, pageSize: number = 10): Promise<PageData<DonViChuTriData>> => {
  const response = await api.get<PageData<DonViChuTriData>>('/DonViChuTri/page', {
    params: { pageIndex, pageSize }
  });
  return response.data;
};