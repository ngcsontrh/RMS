import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'?: string;
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'?: string;
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'?: string;
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string;
    exp?: number;
    iss?: string;
    aud?: string;
}

// Định nghĩa state của store
interface AuthState {
    isAuthenticated: boolean;
    role: string;
    userName: string;
    userId: string;
    userEmail: string | null;
    setAuth: (token: string) => void;
    clearAuth: () => void;
}

// Cấu hình Zustand store
export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    role: '',
    userName: '',
    userId: '',
    userEmail: null,

    setAuth: (token) => {
        try {
            const decoded: JwtPayload = jwtDecode(token);
            const { 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': userId,
                'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': userName,
                'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': userEmail,
                'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': role
            } = decoded;

            set({
                isAuthenticated: true,
                role: role || '',
                userName: userName || '',
                userId: userId || '',
                userEmail: userEmail || null,
            });
            localStorage.setItem("accessToken", token);
            localStorage.setItem("tokenExpiry", (decoded.exp! * 1000).toString());
        } catch (error) {
            console.error('Invalid token:', error);
            set({
                isAuthenticated: false,
                role: '',
                userName: '',
                userId: '',
                userEmail: null,
            });
        }
    },

    clearAuth: () => {
        set({
            isAuthenticated: false,
            role: '',
            userName: '',
            userId: '',
            userEmail: null,
        });
        localStorage.removeItem("accessToken");
    }
}));
