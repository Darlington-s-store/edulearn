import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if admin is already logged in on mount
  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const storedAdmin = localStorage.getItem('adminUser');

        if (token && storedAdmin) {
          const adminData = JSON.parse(storedAdmin);
          
          // Verify token is still valid with backend
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await api.get('/auth/me');
          
          if (response.data.success && response.data.data.role === 'admin') {
            setAdmin(response.data.data);
            setIsAuthenticated(true);
            console.log('AdminAuth: Admin session restored');
          } else {
            // Invalid admin session
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            delete api.defaults.headers.common['Authorization'];
          }
        }
      } catch (error) {
        console.error('AdminAuth: Session check failed:', error);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        delete api.defaults.headers.common['Authorization'];
      } finally {
        setLoading(false);
      }
    };

    checkAdminAuth();
  }, []);

  const adminLogin = async (email, password) => {
    setLoading(true);
    
    try {
      console.log('AdminAuth: Attempting admin login...');
      
      const response = await api.post('/auth/login', {
        email,
        password,
        role: 'admin'
      });
      
      console.log('AdminAuth: Login response:', response.data);
      
      if (response.data.success) {
        const { user, token } = response.data.data;
        
        // Verify user is actually an admin
        if (user.role !== 'admin') {
          console.error('AdminAuth: User is not an admin');
          return { 
            success: false, 
            error: 'Access denied. Admin privileges required.' 
          };
        }
        
        console.log('AdminAuth: Admin login successful');
        
        // Store admin token and data separately from regular users
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminUser', JSON.stringify(user));
        
        // Set authorization header
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Update state
        setAdmin(user);
        setIsAuthenticated(true);
        
        // Navigate to admin dashboard
        console.log('AdminAuth: Navigating to admin dashboard');
        navigate('/admin/dashboard', { replace: true });
        
        return { success: true, admin: user };
      } else {
        console.error('AdminAuth: Login failed - response not successful');
        return { 
          success: false, 
          error: 'Login failed. Please try again.'
        };
      }
    } catch (error) {
      console.error('AdminAuth: Login error:', error);
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      return { 
        success: false, 
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  const adminLogout = () => {
    console.log('AdminAuth: Logging out admin');
    
    // Clear admin data
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    delete api.defaults.headers.common['Authorization'];
    
    // Reset state
    setAdmin(null);
    setIsAuthenticated(false);
    
    // Redirect to admin login
    navigate('/admin/login', { replace: true });
  };

  const value = {
    admin,
    isAuthenticated,
    loading,
    adminLogin,
    adminLogout
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
