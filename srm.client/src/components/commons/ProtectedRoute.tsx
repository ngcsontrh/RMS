﻿import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

const ProtectedRoute: React.FC = () => {
    const { isAuthenticated } = useAuthStore();
    if (!isAuthenticated) {
        return <Navigate to="/dang-nhap" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;