import { DeTaiData } from '../models/DeTaiData';
import { PageData } from '../models/PageData';
import api from '../utils/api';

/**
 * Create a new DeTai
 * @param data DeTai data to create
 * @returns Promise with created data
 */
export const create = async (data: DeTaiData): Promise<DeTaiData> => {
  const response = await api.post<DeTaiData>('/DeTai/create', data);
  return response.data;
};

/**
 * Update an existing DeTai
 * @param data DeTai data to update
 * @returns Promise with updated data
 */
export const update = async (data: DeTaiData): Promise<DeTaiData> => {
  const response = await api.post<DeTaiData>('/DeTai/update', data);
  return response.data;
};

/**
 * Get a DeTai by ID
 * @param id ID of the DeTai to get
 * @returns Promise with DeTai data
 */
export const getById = async (id: string): Promise<DeTaiData> => {
  const response = await api.get<DeTaiData>(`/DeTai/${id}`);
  return response.data;
};

/**
 * Get a paged list of DeTai
 * @param pageIndex Current page index (1-based)
 * @param pageSize Number of items per page
 * @param searchText Optional search text for filtering results
 * @returns Promise with paged data
 */
export const getPage = async (pageIndex: number = 1, pageSize: number = 10, searchText?: string): Promise<PageData<DeTaiData>> => {
  const response = await api.get<PageData<DeTaiData>>('/DeTai/page', {
    params: { pageIndex, pageSize, searchText }
  });
  return response.data;
};