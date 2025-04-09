import { HoatDongData } from '../models/HoatDongData';
import { PageData } from '../models/PageData';
import api from '../utils/api';

/**
 * Create a new HoatDong
 * @param data HoatDong data to create
 * @returns Promise with created data
 */
export const create = async (data: HoatDongData): Promise<HoatDongData> => {
  const response = await api.post<HoatDongData>('/HoatDong/create', data);
  return response.data;
};

/**
 * Update an existing HoatDong
 * @param data HoatDong data to update
 * @returns Promise with updated data
 */
export const update = async (data: HoatDongData): Promise<HoatDongData> => {
  const response = await api.post<HoatDongData>('/HoatDong/update', data);
  return response.data;
};

/**
 * Get a HoatDong by ID
 * @param id ID of the HoatDong to get
 * @returns Promise with HoatDong data
 */
export const getById = async (id: string): Promise<HoatDongData> => {
  const response = await api.get<HoatDongData>(`/HoatDong/${id}`);
  return response.data;
};

/**
 * Get a paged list of HoatDong
 * @param pageIndex Current page index (1-based)
 * @param pageSize Number of items per page
 * @returns Promise with paged data
 */
export const getPage = async (pageIndex: number = 1, pageSize: number = 10): Promise<PageData<HoatDongData>> => {
  const response = await api.get<PageData<HoatDongData>>('/HoatDong/page', {
    params: { pageIndex, pageSize }
  });
  return response.data;
};