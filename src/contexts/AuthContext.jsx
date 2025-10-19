import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // Safe fallback to avoid crashes if provider isn't mounted yet
    return {
      user: null,
      login: async () => ({ success: false }),
      signup: async () => ({ success: false }),
      logout: () => {},
      updateUser: () => {},
      loading: false,
      isAuthenticated: false,
      authMessage: '',
      clearAuthMessage: () => {}
    };
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authMessage, setAuthMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session on app load
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      
      // Don't check if admin is logged in (admin uses separate storage)
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken) {
        setLoading(false);
        return;
      }
      
      if (token && savedUser) {
        try {
          // Verify token is still valid by fetching current user
          const response = await api.get('/auth/me');
          const userData = response.data.data;
          
          // Ensure this is not an admin user
          if (userData.role === 'admin') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
          } else {
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
          }
        } catch (error) {
          // Token invalid, clear storage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        }
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email, password, userType) => {
    setLoading(true);
    
    try {
      console.log('AuthContext: Attempting login with role:', userType);
      const response = await api.post('/auth/login', {
        email,
        password,
        role: userType
      });
      
      console.log('AuthContext: Login response:', response.data);
      
      if (response.data.success) {
        const { user, token } = response.data.data;
        
        console.log('AuthContext: Login successful, user:', user);
        
        // Store token and user
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        
        // Success message
        setAuthMessage(`Signed in as ${user.firstName || user.email}`);
        
        console.log('AuthContext: Navigating based on role:', userType);
        
        // Navigate based on role
        switch (userType) {
          case 'parent': {
            const pending = localStorage.getItem('pendingPlan');
            if (pending) {
              const { plan, billing } = JSON.parse(pending);
              navigate(`/subscribe?plan=${plan}&billing=${billing}`);
            } else {
              navigate('/subscribe');
            }
            break;
          }
          case 'student':
            navigate('/student/dashboard');
            break;
          case 'teacher':
            navigate('/teacher/dashboard');
            break;
          default:
            navigate('/');
        }
        
        return { success: true, user };
      } else {
        console.error('AuthContext: Login failed - response not successful');
        return { 
          success: false, 
          error: 'Login failed. Please try again.'
        };
      }
    } catch (error) {
      console.error('AuthContext: Login error:', error);
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      return { 
        success: false, 
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (formData, userType) => {
    setLoading(true);
    
    try {
      const response = await api.post('/auth/register', {
        email: formData.email,
        password: formData.password,
        role: userType,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        age: formData.age,
        grade: formData.grade,
        school: formData.school,
        subject: formData.subject,
        institution: formData.school || formData.institution
      });
      
      if (response.data.success) {
        const { user, token } = response.data.data;
        
        // Store token and user
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        
        // Success message
        setAuthMessage(`Welcome, ${user.firstName}!`);
        
        // Navigate based on role
        switch (userType) {
          case 'parent':
            navigate('/subscribe');
            break;
          case 'student':
            navigate('/student/dashboard');
            break;
          case 'teacher':
            navigate('/teacher/dashboard');
            break;
          default:
            navigate('/');
        }
        
        return { success: true };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      return { 
        success: false, 
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const clearAuthMessage = () => setAuthMessage('');

  const updateUser = async (updates) => {
    try {
      const response = await api.put('/auth/profile', updates);
      
      if (response.data.success) {
        const updatedUser = response.data.data;
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return { success: true };
      }
    } catch (error) {
      console.error('Profile update failed:', error);
      return { success: false, error: error.response?.data?.message || 'Update failed' };
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateUser,
    loading,
    isAuthenticated: !!user,
    authMessage,
    clearAuthMessage
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
