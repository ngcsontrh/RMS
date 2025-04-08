import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requiredRoles?: string[];
}

/**
 * A component that protects routes from unauthorized access.
 * Redirects to login page if the user is not authenticated.
 * Can also check for specific roles if requiredRoles is provided.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/login',
  requiredRoles = []
}) => {
  const { isAuthenticated, user } = useAuthStore();
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }
  
  // Check roles if requiredRoles are specified
  if (requiredRoles.length > 0) {
    // If no user or no roles, reject access
    if (!user || !user.roles) {
      return <Navigate to="/" />;
    }
    
    // Check if user has at least one of the required roles
    const hasRequiredRole = user.roles.some(role => 
      requiredRoles.includes(role.toLowerCase())
    );
    
    if (!hasRequiredRole) {
      return <Navigate to="/" />;
    }
  }
  
  // Render children if authenticated and authorized
  return <>{children}</>;
};

export default ProtectedRoute;