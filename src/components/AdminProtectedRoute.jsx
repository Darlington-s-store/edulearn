import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';

const AdminProtectedRoute = ({ children }) => {
  const { admin, isAuthenticated, loading } = useAdminAuth();

  console.log('AdminProtectedRoute: checking access', { 
    isAuthenticated, 
    loading, 
    adminRole: admin?.role 
  });

  if (loading) {
    console.log('AdminProtectedRoute: Still loading...');
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="w-8 h-8 bg-white rounded-full"></div>
          </div>
          <p className="text-white font-medium">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !admin || admin.role !== 'admin') {
    console.log('AdminProtectedRoute: Not authenticated or not admin, redirecting to admin login');
    return <Navigate to="/admin/login" replace />;
  }

  console.log('AdminProtectedRoute: Access granted!');
  return children;
};

export default AdminProtectedRoute;
