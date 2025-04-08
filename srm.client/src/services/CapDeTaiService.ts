import { CapDeTaiData } from '../models/CapDeTaiData';
import { GuidData } from '../models/GuidData';
import { PageData } from '../models/PageData';
import api from '../utils/api';

/**
 * Create a new CapDeTai
 * @param data CapDeTai data to create
 * @returns Promise with created data
 */
export const create = async (data: CapDeTaiData): Promise<CapDeTaiData> => {
  const response = await api.post<CapDeTaiData>('/CapDeTai/create', data);
  return response.data;
};

/**
 * Update an existing CapDeTai
 * @param data CapDeTai data to update
 * @returns Promise with updated data
 */
export const update = async (data: CapDeTaiData): Promise<CapDeTaiData> => {
  const response = await api.post<CapDeTaiData>('/CapDeTai/update', data);
  return response.data;
};

/**
 * Delete a CapDeTai by ID
 * @param id ID of the CapDeTai to delete
 */
export const remove = async (id: string): Promise<void> => {
  const guidData: GuidData = { id };
  await api.post('/CapDeTai/delete', guidData);
};

/**
 * Get a list of all CapDeTai
 * @returns Promise with list of CapDeTai
 */
export const list = async (): Promise<CapDeTaiData[]> => {
  const response = await api.get<CapDeTaiData[]>('/CapDeTai/list');
  return response.data;
};

/**
 * Get a CapDeTai by ID
 * @param id ID of the CapDeTai to get
 * @returns Promise with CapDeTai data
 */
export const getById = async (id: string): Promise<CapDeTaiData> => {
  const response = await api.get<CapDeTaiData>(`/CapDeTai/${id}`);
  return response.data;
};

/**
 * Get a paged list of CapDeTai
 * @param pageIndex Current page index (1-based)
 * @param pageSize Number of items per page
 * @returns Promise with paged data
 */
export const getPage = async (pageIndex: number = 1, pageSize: number = 10): Promise<PageData<CapDeTaiData>> => {
  const response = await api.get<PageData<CapDeTaiData>>('/CapDeTai/page', {
    params: { pageIndex, pageSize }
  });
  return response.data;
};