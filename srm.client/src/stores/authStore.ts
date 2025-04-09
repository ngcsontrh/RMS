/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthData } from '../models/AuthData';
import { LoginData } from '../models/LoginData';
import * as AuthService from '../services/AuthService';
import axios from 'axios';

// Define the auth store state
interface AuthState {
  // State
  user: AuthData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (credentials: LoginData) => Promise<boolean>;
  logout: () => void;
  fetchUser: () => Promise<void>;
  clearError: () => void;
}

// Create the auth store with persist middleware to keep auth state on refresh
export const useAuthStore = create<AuthState>()(
  persist(
    (set, _get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials: LoginData) => {
        set({ isLoading: true, error: null });
        try {
          // Use the existing AuthService
          const tokenData = await AuthService.login(credentials);
          
          // If we got a token, fetch the user profile
          if (tokenData.accessToken) {
            try {
              const user = await AuthService.me();
              set({ user, isAuthenticated: true, isLoading: false });
              return true;
            } catch (profileError) {
              console.error('Error fetching user profile:', profileError);
              // If we couldn't fetch the profile, still fail but with a specific message
              const errorMessage = profileError instanceof Error ? profileError.message : 'Failed to fetch user profile';
              set({ isLoading: false, error: errorMessage, isAuthenticated: false });
              return false;
            }
          }
          
          set({ isLoading: false, error: 'Login failed - Invalid credentials', isAuthenticated: false });
          return false;
        } catch (error) {
          console.error('Login error:', error);
          // Provide more specific error messages based on error type if possible
          let errorMessage = 'Login failed';
          if (error instanceof Error) {
            errorMessage = error.message;
          } else if (axios.isAxiosError(error)) {
            // Handle Axios errors specifically
            if (error.response?.status === 401) {
              errorMessage = 'Invalid username or password';
            } else if (error.response?.status === 403) {
              errorMessage = 'Account is locked or disabled';
            } else if (error.response?.data?.message) {
              errorMessage = error.response.data.message;
            } else if (error.message) {
              errorMessage = error.message;
            }
          }
          
          set({ isLoading: false, error: errorMessage, isAuthenticated: false });
          return false;
        }
      },
      
      logout: () => {
        // Call the service to remove token from storage
        AuthService.logout();
        set({ user: null, isAuthenticated: false, error: null });
      },
      
      fetchUser: async () => {
        // Check if we're already authenticated first
        if (!AuthService.isAuthenticated()) {
          set({ user: null, isAuthenticated: false });
          return;
        }
        
        set({ isLoading: true });
        try {
          const user = await AuthService.me();
          set({ user, isAuthenticated: true, isLoading: false });
        } catch {
          // If there's an error fetching the user, we log them out
          AuthService.logout();
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      },
      
      clearError: () => set({ error: null })
    }),
    {
      name: 'auth-storage', // name of the persisted storage
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);