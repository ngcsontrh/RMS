import React from 'react';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';

// Import actual page components from pages folder
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import NotFoundPage from '../pages/NotFoundPage';
import AdminDashboard from '../pages/AdminDashboard';
import ContactPage from '../pages/ContactPage';
import DeTaiListPage from '../pages/DeTaiListPage';
import DeTaiDetailPage from '../pages/DeTaiDetailPage';
import DeTaiFormPage from '../pages/DeTaiFormPage';
import CongBoListPage from '../pages/CongBoListPage';
import CongBoDetailPage from '../pages/CongBoDetailPage';
import CongBoFormPage from '../pages/CongBoFormPage';

// Import admin page components
import CapDeTaiPage from '../pages/admin/CapDeTaiPage';
import DonViPage from '../pages/admin/DonViPage';
import DonViChuTriPage from '../pages/admin/DonViChuTriPage';
import LoaiHoatDongPage from '../pages/admin/LoaiHoatDongPage';
import NoiDangBaoPage from '../pages/admin/NoiDangBaoPage';
import ThanhQuaPage from '../pages/admin/ThanhQuaPage';

// Import ProtectedRoute from its dedicated file
import ProtectedRoute from './ProtectedRoute';

// Define route structure
interface RouteConfig {
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[];
}

// Public routes
export const publicRoutes: RouteConfig[] = [
  {
    path: '/',
    element: (
      <MainLayout>
        <HomePage />
      </MainLayout>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/contact',
    element: (
      <MainLayout>
        <ContactPage />
      </MainLayout>
    ),
  },
  // DeTai public routes (list and detail views)
  {
    path: '/detai',
    element: (
      <MainLayout>
        <DeTaiListPage />
      </MainLayout>
    ),
  },
  {
    path: '/detai/:id',
    element: (
      <MainLayout>
        <DeTaiDetailPage />
      </MainLayout>
    ),
  },
  // CongBo public routes (list and detail views)
  {
    path: '/congbo',
    element: (
      <MainLayout>
        <CongBoListPage />
      </MainLayout>
    ),
  },
  {
    path: '/congbo/:id',
    element: (
      <MainLayout>
        <CongBoDetailPage />
      </MainLayout>
    ),
  },
];

// Protected routes (require authentication)
export const protectedRoutes: RouteConfig[] = [
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <MainLayout>
          <ProfilePage />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  // DeTai protected routes (create and edit)
  {
    path: '/detai/create',
    element: (
      <ProtectedRoute>
        <MainLayout>
          <DeTaiFormPage />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/detai/:id/edit',
    element: (
      <ProtectedRoute>
        <MainLayout>
          <DeTaiFormPage />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  // CongBo protected routes (create and edit)
  {
    path: '/congbo/create',
    element: (
      <ProtectedRoute>
        <MainLayout>
          <CongBoFormPage />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/congbo/:id/edit',
    element: (
      <ProtectedRoute>
        <MainLayout>
          <CongBoFormPage />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
];

// Admin routes (require authentication and admin role)
export const adminRoutes: RouteConfig[] = [
  {
    path: '/admin/dashboard',
    element: (
      <ProtectedRoute requiredRoles={['admin']}>
        <AdminLayout>
          <AdminDashboard />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/users',
    element: (
      <ProtectedRoute requiredRoles={['admin']}>
        <AdminLayout>
          <div>Quản lý Người dùng</div>
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/roles',
    element: (
      <ProtectedRoute requiredRoles={['admin']}>
        <AdminLayout>
          <div>Quản lý Vai trò</div>
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/detai',
    element: (
      <ProtectedRoute requiredRoles={['admin']}>
        <AdminLayout>
          <div>Quản lý Đề tài</div>
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/capdetai',
    element: (
      <ProtectedRoute requiredRoles={['admin']}>
        <AdminLayout>
          <CapDeTaiPage />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/thanhqua',
    element: (
      <ProtectedRoute requiredRoles={['admin']}>
        <AdminLayout>
          <ThanhQuaPage />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/congbo',
    element: (
      <ProtectedRoute requiredRoles={['admin']}>
        <AdminLayout>
          <div>Quản lý Công bố</div>
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/noidangbao',
    element: (
      <ProtectedRoute requiredRoles={['admin']}>
        <AdminLayout>
          <NoiDangBaoPage />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/donvi',
    element: (
      <ProtectedRoute requiredRoles={['admin']}>
        <AdminLayout>
          <DonViPage />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/donvichutri',
    element: (
      <ProtectedRoute requiredRoles={['admin']}>
        <AdminLayout>
          <DonViChuTriPage />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/loaihoatdong',
    element: (
      <ProtectedRoute requiredRoles={['admin']}>
        <AdminLayout>
          <LoaiHoatDongPage />
        </AdminLayout>
      </ProtectedRoute>
    ),
  }
];

// Not found route
export const notFoundRoute: RouteConfig = {
  path: '*',
  element: (
    <MainLayout>
      <NotFoundPage />
    </MainLayout>
  ),
};

// All routes combined
export const routes: RouteConfig[] = [
  ...publicRoutes,
  ...protectedRoutes,
  ...adminRoutes,
  notFoundRoute
];