import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import { AuthData } from '../models/data';

// Định nghĩa interface cho payload của JWT
interface JwtPayload {
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'?: string;
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'?: string;
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'?: string;
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string | string[];
    exp?: number;
    iss?: string;
    aud?: string;
}

// Định nghĩa state của store
interface AuthState {
    isAuthenticated: boolean;
    authData: AuthData | null;
    setAuth: (token: string) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: !!localStorage.getItem('accessToken'),
    authData: (() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                const decoded = jwtDecode<JwtPayload>(token);
                if (decoded.exp && Date.now() >= decoded.exp * 1000) {
                    localStorage.removeItem('accessToken');
                    return null;
                }
                return {
                    userId: Number(decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'])!,
                    userName: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || '',
                    roles: Array.isArray(decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
                        ? decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
                        : [decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']].filter(Boolean) || [],
                };
            } catch (error) {
                console.error('Error decoding token:', error);
                return null;
            }
        }
        return null;
    })(),

    setAuth: (token: string) => {
        try {
            localStorage.setItem('accessToken', token);

            const decoded = jwtDecode<JwtPayload>(token);
            if (decoded.exp && Date.now() >= decoded.exp * 1000) {
                localStorage.removeItem('accessToken');
                set({ isAuthenticated: false, authData: null });
                throw new Error('Token đã hết hạn');
            }

            const authData: AuthData = {
                userId: Number(decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']) || 0,
                userName: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || '',
                roles: Array.isArray(decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
                    ? decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
                    : [decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']].filter(Boolean) || [],
            };

            set({ isAuthenticated: true, authData });
        } catch (error) {
            console.error('Error decoding token:', error);
            set({ isAuthenticated: false, authData: null });
            throw error; // Ném lỗi để component xử lý
        }
    },

    // Xóa auth
    clearAuth: () => {
        localStorage.removeItem('accessToken');
        set({ isAuthenticated: false, authData: null });
    },
}));
