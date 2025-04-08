/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { TokenData } from '../models/TokenData';

// Create an axios instance with default config
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Add authorization token if available
    const tokenDataStr = localStorage.getItem('token');
    if (tokenDataStr) {
      try {
        const tokenData: TokenData = JSON.parse(tokenDataStr);
        if (tokenData.accessToken) {
          config.headers.Authorization = `Bearer ${tokenData.accessToken}`;
        }
      } catch (error) {
        console.error('Error parsing token data:', error);
      }
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors here (e.g., 401 Unauthorized, etc.)
    if (error.response?.status === 401) {
      // Redirect to login or refresh token
      console.error('Unauthorized request. Please log in again.');
      // Remove token from storage if it's invalid
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default api;