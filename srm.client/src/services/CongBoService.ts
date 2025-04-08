import { CongBoData } from '../models/CongBoData';
import { PageData } from '../models/PageData';
import api from '../utils/api';

/**
 * Create a new CongBo
 * @param data CongBo data to create
 * @returns Promise with created data
 */
export const create = async (data: CongBoData): Promise<CongBoData> => {
  const response = await api.post<CongBoData>('/CongBo/create', data);
  return response.data;
};

/**
 * Update an existing CongBo
 * @param data CongBo data to update
 * @returns Promise with updated data
 */
export const update = async (data: CongBoData): Promise<CongBoData> => {
  const response = await api.post<CongBoData>('/CongBo/update', data);
  return response.data;
};

/**
 * Get a CongBo by ID
 * @param id ID of the CongBo to get
 * @returns Promise with CongBo data
 */
export const getById = async (id: string): Promise<CongBoData> => {
  const response = await api.get<CongBoData>(`/CongBo/${id}`);
  return response.data;
};

/**
 * Get a paged list of CongBo
 * @param pageIndex Current page index (1-based)
 * @param pageSize Number of items per page
 * @returns Promise with paged data
 */
export const getPage = async (pageIndex: number = 1, pageSize: number = 10): Promise<PageData<CongBoData>> => {
  const response = await api.get<PageData<CongBoData>>('/CongBo/page', {
    params: { pageIndex, pageSize }
  });
  return response.data;
};