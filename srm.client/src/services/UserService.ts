import { UserData } from '../models/UserData';
import { PageData } from '../models/PageData';
import api from '../utils/api';

/**
 * Create a new user
 * @param data User data to create
 * @returns Promise with created user data
 */
export const create = async (data: UserData): Promise<UserData> => {
  const response = await api.post<UserData>('/User/create', data);
  return response.data;
};

/**
 * Update an existing user
 * @param data User data to update
 * @returns Promise with updated user data
 */
export const update = async (data: UserData): Promise<UserData> => {
  const response = await api.post<UserData>('/User/update', data);
  return response.data;
};

/**
 * Get a user by ID
 * @param id ID of the user to get
 * @returns Promise with user data
 */
export const getById = async (id: string): Promise<UserData> => {
  const response = await api.get<UserData>(`/User/${id}`);
  return response.data;
};

/**
 * Get a list of all users with basic information
 * @returns Promise with list of users
 */
export const getListBasicInfo = async (): Promise<UserData[]> => {
  const response = await api.get<UserData[]>('/User/list-basic-info');
  return response.data;
};

/**
 * Get a paged list of users
 * @param pageIndex Current page index (1-based)
 * @param pageSize Number of items per page
 * @returns Promise with paged data
 */
export const getPage = async (pageIndex: number = 1, pageSize: number = 10): Promise<PageData<UserData>> => {
  const response = await api.get<PageData<UserData>>('/User/page', {
    params: { pageIndex, pageSize }
  });
  return response.data;
};