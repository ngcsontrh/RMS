import { AuthData } from '../models/AuthData';
import { LoginData } from '../models/LoginData';
import { TokenData } from '../models/TokenData';
import api from '../utils/api';
import dayjs from '../utils/dateTime';

/**
 * Login with the provided credentials
 * @param loginData Login credentials
 * @returns Promise with token data
 */
export const login = async (loginData: LoginData): Promise<TokenData> => {
  const response = await api.post<TokenData>('/Auth/login', loginData);
  
  // Store token in localStorage for later use
  if (response.data) {
    localStorage.setItem('token', JSON.stringify(response.data));
  }
  
  return response.data;
};

/**
 * Get information about the current authenticated user
 * @returns Promise with user data
 */
export const me = async (): Promise<AuthData> => {
  const response = await api.get<AuthData>('/Auth/me');
  return response.data;
};

/**
 * Logout the current user by removing the stored token
 */
export const logout = (): void => {
  localStorage.removeItem('token');
};

/**
 * Check if the user is currently authenticated
 * @returns True if authenticated, false otherwise
 */
export const isAuthenticated = (): boolean => {
  const tokenDataStr = localStorage.getItem('token');
  if (tokenDataStr) {
    try {
      const tokenData: TokenData = JSON.parse(tokenDataStr);
      
      // Check if token exists
      if (!tokenData.accessToken) {
        return false;
      }
      
      // Check if token is expired using dayjs
      if (tokenData.expiration && dayjs(tokenData.expiration).isBefore(dayjs())) {
        // Token is expired, clear it
        logout();
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error parsing token data:', error);
      // If there's an error parsing the token, remove it
      logout();
      return false;
    }
  }
  return false;
};