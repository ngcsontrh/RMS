import { LoaiHoatDongData } from '../models/LoaiHoatDongData';
import { GuidData } from '../models/GuidData';
import { PageData } from '../models/PageData';
import api from '../utils/api';

/**
 * Create a new LoaiHoatDong
 * @param data LoaiHoatDong data to create
 * @returns Promise with created data
 */
export const create = async (data: LoaiHoatDongData): Promise<LoaiHoatDongData> => {
  const response = await api.post<LoaiHoatDongData>('/LoaiHoatDong/create', data);
  return response.data;
};

/**
 * Update an existing LoaiHoatDong
 * @param data LoaiHoatDong data to update
 * @returns Promise with updated data
 */
export const update = async (data: LoaiHoatDongData): Promise<LoaiHoatDongData> => {
  const response = await api.post<LoaiHoatDongData>('/LoaiHoatDong/update', data);
  return response.data;
};

/**
 * Delete a LoaiHoatDong by ID
 * @param id ID of the LoaiHoatDong to delete
 */
export const remove = async (id: string): Promise<void> => {
  const guidData: GuidData = { id };
  await api.post('/LoaiHoatDong/delete', guidData);
};

/**
 * Get a list of all LoaiHoatDong
 * @returns Promise with list of LoaiHoatDong
 */
export const list = async (): Promise<LoaiHoatDongData[]> => {
  const response = await api.get<LoaiHoatDongData[]>('/LoaiHoatDong/list');
  return response.data;
};

/**
 * Get a LoaiHoatDong by ID
 * @param id ID of the LoaiHoatDong to get
 * @returns Promise with LoaiHoatDong data
 */
export const getById = async (id: string): Promise<LoaiHoatDongData> => {
  const response = await api.get<LoaiHoatDongData>(`/LoaiHoatDong/${id}`);
  return response.data;
};

/**
 * Get a paged list of LoaiHoatDong
 * @param pageIndex Current page index (1-based)
 * @param pageSize Number of items per page
 * @returns Promise with paged data
 */
export const getPage = async (pageIndex: number = 1, pageSize: number = 10): Promise<PageData<LoaiHoatDongData>> => {
  const response = await api.get<PageData<LoaiHoatDongData>>('/LoaiHoatDong/page', {
    params: { pageIndex, pageSize }
  });
  return response.data;
};