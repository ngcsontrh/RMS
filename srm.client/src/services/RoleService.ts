import { RoleData } from '../models/RoleData';
import { GuidData } from '../models/GuidData';
import { PageData } from '../models/PageData';
import api from '../utils/api';

/**
 * Create a new Role
 * @param data Role data to create
 * @returns Promise with created data
 */
export const create = async (data: RoleData): Promise<RoleData> => {
  const response = await api.post<RoleData>('/Role/create', data);
  return response.data;
};

/**
 * Update an existing Role
 * @param data Role data to update
 * @returns Promise with updated data
 */
export const update = async (data: RoleData): Promise<RoleData> => {
  const response = await api.post<RoleData>('/Role/update', data);
  return response.data;
};

/**
 * Delete a Role by ID
 * @param id ID of the Role to delete
 */
export const remove = async (id: string): Promise<void> => {
  const guidData: GuidData = { id };
  await api.post('/Role/delete', guidData);
};

/**
 * Get a list of all Roles
 * @returns Promise with list of Roles
 */
export const list = async (): Promise<RoleData[]> => {
  const response = await api.get<RoleData[]>('/Role/list');
  return response.data;
};

/**
 * Get a Role by ID
 * @param id ID of the Role to get
 * @returns Promise with Role data
 */
export const getById = async (id: string): Promise<RoleData> => {
  const response = await api.get<RoleData>(`/Role/${id}`);
  return response.data;
};

/**
 * Get a paged list of Roles
 * @param pageIndex Current page index (1-based)
 * @param pageSize Number of items per page
 * @returns Promise with paged data
 */
export const getPage = async (pageIndex: number = 1, pageSize: number = 10): Promise<PageData<RoleData>> => {
  const response = await api.get<PageData<RoleData>>('/Role/page', {
    params: { pageIndex, pageSize }
  });
  return response.data;
};