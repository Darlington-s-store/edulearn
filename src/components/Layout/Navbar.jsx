import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Menu, X, Heart, Sparkles, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, authMessage, clearAuthMessage, logout } = useAuth();
  const userMenuRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const getDashboardPath = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'student':
      case 'parent':
        return '/student/dashboard';
      case 'teacher':
        return '/teacher/dashboard';
      default:
        return '/';
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {authMessage && (
          <div className="mb-3 mt-3 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-xl flex items-center justify-between">
            <span className="text-sm font-medium">{authMessage}</span>
            <button onClick={clearAuthMessage} className="text-xs underline">Dismiss</button>
          </div>
        )}
        <div className="flex justify-between items-center h-18">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Heart className="w-7 h-7 text-white group-hover:animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <span className="font-bold text-2xl text-gray-800 font-playful group-hover:scale-105 transition-transform duration-300">
              Edu-Learn
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary-600 font-medium transition-colors duration-200 relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-primary-600 font-medium transition-colors duration-200 relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/" className="text-gray-600 hover:text-primary-600 font-medium transition-colors duration-200 relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/pricing" className="text-gray-600 hover:text-primary-600 font-medium transition-colors duration-200 relative group">
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-primary-600 font-medium transition-colors duration-200 relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            {user && user.role !== 'admin' ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="font-medium">{user.firstName || user.email}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
                    <div className="p-3 border-b border-gray-100 bg-gradient-to-r from-primary-50 to-purple-50">
                      <p className="text-sm font-semibold text-gray-800">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-gray-600 truncate">{user.email}</p>
                      <p className="text-xs text-primary-600 capitalize mt-1 font-medium">{user.role}</p>
                    </div>
                    
                    <div className="py-2">
                      <Link
                        to={getDashboardPath()}
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        <span className="text-sm font-medium">Dashboard</span>
                      </Link>
                      
                      <Link
                        to={`/${user.role}/profile`}
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span className="text-sm font-medium">Profile</span>
                      </Link>
                      
                      <div className="border-t border-gray-100 my-2"></div>
                      
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          if (window.confirm('Are you sure you want to logout?')) {
                            logout();
                          }
                        }}
                        className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login/student" className="btn-secondary px-4 py-2">Login</Link>
                <Link to="/signup/student" className="btn-primary px-6 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1">Get Started</Link>
              </>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 bg-white/95 backdrop-blur-md">
            <div className="flex flex-col space-y-2">
              <Link to="/" className="p-3 text-gray-600 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors duration-200">
                Home
              </Link>
              <Link to="/about" className="p-3 text-gray-600 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors duration-200">
                About
              </Link>
              <Link to="/" className="p-3 text-gray-600 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors duration-200">
                Features
              </Link>
              <Link to="/pricing" className="p-3 text-gray-600 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors duration-200">
                Pricing
              </Link>
              <Link to="/contact" className="p-3 text-gray-600 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors duration-200">
                Contact
              </Link>
              <div className="pt-2 border-t border-gray-100">
                {user && user.role !== 'admin' ? (
                  <>
                    <div className="p-3 bg-gradient-to-r from-primary-50 to-purple-50 rounded-lg mb-2">
                      <p className="text-sm font-semibold text-gray-800">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-gray-600 truncate">{user.email}</p>
                      <p className="text-xs text-primary-600 capitalize mt-1 font-medium">{user.role}</p>
                    </div>
                    
                    <Link 
                      to={getDashboardPath()} 
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 p-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-lg transition-colors duration-200"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                    
                    <Link 
                      to={`/${user.role}/profile`}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 p-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-lg transition-colors duration-200"
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    
                    <button 
                      onClick={() => {
                        setIsMenuOpen(false);
                        if (window.confirm('Are you sure you want to logout?')) {
                          logout();
                        }
                      }} 
                      className="flex items-center gap-3 w-full p-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login/student" className="block p-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200">Login</Link>
                    <Link to="/signup/student" className="block mx-3 mt-2 btn-primary text-center">Get Started</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
