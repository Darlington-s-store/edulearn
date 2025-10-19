# ⚛️ Frontend Guide - Edu-Learn Platform

Complete guide for frontend development on the Edu-Learn platform.

---

## 📑 Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Component Architecture](#component-architecture)
- [State Management](#state-management)
- [Routing](#routing)
- [Styling Guide](#styling-guide)
- [API Integration](#api-integration)
- [Authentication Flow](#authentication-flow)
- [Component Library](#component-library)
- [Page Components](#page-components)
- [Custom Hooks](#custom-hooks)
- [Best Practices](#best-practices)
- [Performance Optimization](#performance-optimization)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

The Edu-Learn frontend is a modern React single-page application (SPA) built with Vite, featuring:

- **React 18** with functional components and hooks
- **React Router v6** for client-side routing
- **Tailwind CSS** for styling
- **Context API** for state management
- **Axios** for API communication
- **Lucide React** for icons
- **Vite** for fast development and optimized builds

### Key Features

- Role-based dashboards (Student, Teacher, Admin, Parent)
- Real-time notifications
- AI-powered learning assistance
- Zoom integration for live classes
- Responsive design (mobile, tablet, desktop)
- Protected routes with authentication
- Modern UI/UX with Tailwind CSS

---

## 🛠️ Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI Framework |
| React Router DOM | 6.8.1 | Client-side routing |
| Vite | 4.3.9 | Build tool & dev server |
| Tailwind CSS | 3.3.2 | Utility-first CSS |
| Lucide React | 0.263.1 | Icon library |
| Axios | 1.6.2 | HTTP client |
| PostCSS | 8.4.24 | CSS processing |
| Autoprefixer | 10.4.14 | CSS vendor prefixes |

---

## 📁 Project Structure

```
src/
├── components/                      # Reusable components
│   ├── Layout/                      # Layout components
│   │   ├── Navbar.jsx              # Public navigation bar
│   │   ├── Footer.jsx              # Footer component
│   │   ├── DashboardSidebar.jsx    # Dashboard sidebar navigation
│   │   └── DashboardTopbar.jsx     # Dashboard top bar
│   │
│   ├── AI Components/               # AI-powered features
│   │   ├── AIStudyAssistant.jsx    # 24/7 AI tutor chat
│   │   ├── AIQuizGenerator.jsx     # Auto quiz generation
│   │   ├── AIAssignmentFeedback.jsx # AI grading assistance
│   │   ├── AIRecommendations.jsx   # Personalized recommendations
│   │   └── AIStudyTips.jsx         # Study tips generator
│   │
│   ├── Zoom Components/             # Video conferencing
│   │   ├── ZoomMeeting.jsx         # Embedded Zoom meeting
│   │   ├── ZoomMeetingButton.jsx   # Join meeting button
│   │   └── LiveClassSetupModal.jsx # Live class setup
│   │
│   └── ProtectedRoute.jsx          # Route authentication
│
├── contexts/                        # React Context providers
│   ├── AuthContext.jsx             # Authentication state
│   ├── ContentContext.jsx          # Mock data (development)
│   └── ContentContextAPI.jsx       # API integration (production)
│
├── pages/                           # Page components
│   ├── auth/                        # Authentication pages
│   │   ├── Login.jsx               # Login page
│   │   └── Signup.jsx              # Registration page
│   │
│   ├── dashboards/                  # Dashboard pages
│   │   ├── StudentDashboard.jsx    # Student main dashboard
│   │   ├── TeacherDashboard.jsx    # Teacher main dashboard
│   │   └── AdminDashboard.jsx      # Admin main dashboard
│   │
│   ├── student/                     # Student-specific pages
│   │   ├── Modules.jsx             # Browse modules
│   │   ├── Assignments.jsx         # View assignments
│   │   ├── Courses.jsx             # Course catalog
│   │   ├── CourseDetail.jsx        # Course details
│   │   ├── LessonViewer.jsx        # Lesson content viewer
│   │   ├── LiveClass.jsx           # Live class page
│   │   ├── Leaderboard.jsx         # Gamification leaderboard
│   │   ├── Points.jsx              # Points & badges
│   │   ├── Rewards.jsx             # Rewards system
│   │   └── AITutor.jsx             # AI tutor page
│   │
│   ├── teacher/                     # Teacher-specific pages
│   │   ├── PostModule.jsx          # Create/edit modules
│   │   ├── PublishContent.jsx      # Content management
│   │   ├── Assignments.jsx         # Assignment management
│   │   ├── Quizzes.jsx             # Quiz management
│   │   ├── LiveClasses.jsx         # Live class scheduling
│   │   └── Reports.jsx             # Analytics & reports
│   │
│   ├── admin/                       # Admin-specific pages
│   │   ├── Students.jsx            # Student management
│   │   ├── Teachers.jsx            # Teacher management
│   │   ├── Payments.jsx            # Payment management
│   │   └── ActivityLogs.jsx        # System activity logs
│   │
│   ├── Home.jsx                     # Landing page
│   ├── About.jsx                    # About page
│   ├── Contact.jsx                  # Contact page
│   ├── Pricing.jsx                  # Pricing page
│   ├── Profile.jsx                  # User profile
│   └── Subscribe.jsx                # Subscription page
│
├── services/                        # API service layer
│   └── contentService.js           # API call functions
│
├── utils/                           # Utility functions
│   └── api.js                      # Axios configuration
│
├── app.jsx                          # Main app component
├── main.jsx                         # Application entry point
└── index.css                        # Global styles & Tailwind
```

---

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Environment Variables

Create `.env` in project root:

```env
VITE_API_URL=http://localhost:5000/api
```

**Note:** Vite requires `VITE_` prefix for environment variables to be exposed to the client.

### Accessing Environment Variables

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 🏗️ Component Architecture

### Component Types

#### 1. Layout Components
Structural components that define the page layout.

**Example: Navbar**
```javascript
// src/components/Layout/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">
              Edu-Learn
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-gray-700 hover:text-blue-600">
              About
            </Link>
            <Link to="/pricing" className="text-gray-700 hover:text-blue-600">
              Pricing
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600">
              Contact
            </Link>
            <Link to="/login" className="btn-primary">
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/about" className="mobile-nav-link">
              About
            </Link>
            {/* More links */}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
```

#### 2. Page Components
Full-page components that represent routes.

**Example: Student Dashboard**
```javascript
// src/pages/dashboards/StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import DashboardSidebar from '../../components/Layout/DashboardSidebar';
import DashboardTopbar from '../../components/Layout/DashboardTopbar';
import AIStudyAssistant from '../../components/AIStudyAssistant';

// Import page components
import Overview from './Overview';
import Modules from '../student/Modules';
import Assignments from '../student/Assignments';
import LiveClass from '../student/LiveClass';

function StudentDashboard() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        role="student"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <DashboardTopbar
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          user={user}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/live-class" element={<LiveClass />} />
            {/* More routes */}
          </Routes>
        </main>
      </div>

      {/* AI Assistant (Floating) */}
      <AIStudyAssistant />
    </div>
  );
}

export default StudentDashboard;
```

#### 3. Feature Components
Reusable components with specific functionality.

**Example: AI Study Assistant**
```javascript
// src/components/AIStudyAssistant.jsx
import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import api from '../utils/api';

function AIStudyAssistant({ moduleId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await api.post('/ai/study-assistant', {
        question: input,
        moduleId
      });

      const aiMessage = {
        role: 'assistant',
        content: response.data.data.answer
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">AI Study Assistant</h3>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                <p>Hi! I'm your AI study assistant.</p>
                <p className="text-sm mt-2">Ask me anything about your coursework!</p>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask a question..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AIStudyAssistant;
```

---

## 🔄 State Management

### Context API

The app uses React Context API for global state management.

#### AuthContext

Manages authentication state and user information.

```javascript
// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await api.get('/auth/me');
          setUser(response.data.data);
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email, password, userType) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
        role: userType
      });

      const { user, token } = response.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);

      // Navigate based on role
      switch (userType) {
        case 'student':
          navigate('/student/dashboard');
          break;
        case 'teacher':
          navigate('/teacher/dashboard');
          break;
        case 'admin':
          navigate('/admin/dashboard');
          break;
        default:
          navigate('/');
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

#### Using AuthContext

```javascript
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please login</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.firstName}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Local Component State

Use `useState` for component-specific state:

```javascript
function MyComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Component logic
}
```

---

## 🗺️ Routing

### Route Configuration

```javascript
// src/app.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Import pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import StudentDashboard from './pages/dashboards/StudentDashboard';
import TeacherDashboard from './pages/dashboards/TeacherDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/student/*"
            element={
              <ProtectedRoute allowedRoles={['student', 'parent']}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/*"
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
```

### Protected Routes

```javascript
// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
```

### Navigation

```javascript
import { useNavigate, Link } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();

  // Programmatic navigation
  const handleClick = () => {
    navigate('/student/modules');
  };

  return (
    <div>
      {/* Declarative navigation */}
      <Link to="/student/modules">View Modules</Link>

      {/* Programmatic navigation */}
      <button onClick={handleClick}>Go to Modules</button>

      {/* Navigate back */}
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}
```

---

## 🎨 Styling Guide

### Tailwind CSS

The app uses Tailwind CSS for styling.

#### Common Patterns

**Container:**
```jsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>
```

**Card:**
```jsx
<div className="bg-white rounded-lg shadow-lg p-6">
  {/* Card content */}
</div>
```

**Button:**
```jsx
<button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
  Click Me
</button>
```

**Grid Layout:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Grid items */}
</div>
```

**Flex Layout:**
```jsx
<div className="flex items-center justify-between">
  {/* Flex items */}
</div>
```

#### Custom Styles

Global styles in `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium;
  }

  .btn-secondary {
    @apply bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium;
  }

  .input-field {
    @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600;
  }

  .card {
    @apply bg-white rounded-lg shadow-lg p-6;
  }
}
```

#### Responsive Design

```jsx
<div className="
  text-sm          /* Mobile */
  md:text-base     /* Tablet */
  lg:text-lg       /* Desktop */
">
  Responsive Text
</div>

<div className="
  grid
  grid-cols-1      /* Mobile: 1 column */
  md:grid-cols-2   /* Tablet: 2 columns */
  lg:grid-cols-3   /* Desktop: 3 columns */
  gap-4
">
  {/* Grid items */}
</div>
```

#### Tailwind Configuration

```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          // ... more shades
          600: '#2563eb',
          700: '#1d4ed8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

---

## 🔌 API Integration

### Axios Configuration

```javascript
// src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear auth and redirect
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Making API Calls

```javascript
import api from '../utils/api';

// GET request
const fetchModules = async () => {
  try {
    const response = await api.get('/modules');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching modules:', error);
    throw error;
  }
};

// POST request
const createModule = async (moduleData) => {
  try {
    const response = await api.post('/modules', moduleData);
    return response.data.data;
  } catch (error) {
    console.error('Error creating module:', error);
    throw error;
  }
};

// PUT request
const updateModule = async (id, moduleData) => {
  try {
    const response = await api.put(`/modules/${id}`, moduleData);
    return response.data.data;
  } catch (error) {
    console.error('Error updating module:', error);
    throw error;
  }
};

// DELETE request
const deleteModule = async (id) => {
  try {
    await api.delete(`/modules/${id}`);
  } catch (error) {
    console.error('Error deleting module:', error);
    throw error;
  }
};
```

### API Service Layer

```javascript
// src/services/contentService.js
import api from '../utils/api';

export const contentService = {
  // Modules
  getModules: async () => {
    const response = await api.get('/modules');
    return response.data.data;
  },

  getModuleById: async (id) => {
    const response = await api.get(`/modules/${id}`);
    return response.data.data;
  },

  createModule: async (data) => {
    const response = await api.post('/modules', data);
    return response.data.data;
  },

  enrollInModule: async (id) => {
    const response = await api.post(`/modules/${id}/enroll`);
    return response.data.data;
  },

  // Assignments
  getAssignments: async () => {
    const response = await api.get('/assignments');
    return response.data.data;
  },

  submitAssignment: async (id, data) => {
    const response = await api.post(`/assignments/${id}/submit`, data);
    return response.data.data;
  },

  // Quizzes
  getQuizzes: async () => {
    const response = await api.get('/quizzes');
    return response.data.data;
  },

  startQuizAttempt: async (id) => {
    const response = await api.post(`/quizzes/${id}/attempt`);
    return response.data.data;
  },

  submitQuizAttempt: async (attemptId, answers) => {
    const response = await api.put(`/quizzes/attempts/${attemptId}/submit`, {
      answers
    });
    return response.data.data;
  },

  // Live Classes
  getLiveClasses: async () => {
    const response = await api.get('/live-classes');
    return response.data.data;
  },

  enrollInLiveClass: async (id) => {
    const response = await api.post(`/live-classes/${id}/enroll`);
    return response.data.data;
  },

  // Notifications
  getNotifications: async () => {
    const response = await api.get('/notifications');
    return response.data.data;
  },

  markNotificationAsRead: async (id) => {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data.data;
  }
};
```

### Using Service Layer

```javascript
import { contentService } from '../services/contentService';

function ModulesPage() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await contentService.getModules();
        setModules(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Component render
}
```

---

## 🔐 Authentication Flow

### Login Process

```javascript
// src/pages/auth/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

function Login() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'student'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(
      formData.email,
      formData.password,
      formData.userType
    );

    if (!result.success) {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Login as
            </label>
            <select
              value={formData.userType}
              onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
              className="input-field"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="parent">Parent</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input-field"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="input-field"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
```

### Token Management

```javascript
// Store token after login
localStorage.setItem('token', token);
localStorage.setItem('user', JSON.stringify(user));

// Retrieve token
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

// Remove token on logout
localStorage.removeItem('token');
localStorage.removeItem('user');
```

---

## 📚 Component Library

### Common Components

#### Loading Spinner

```javascript
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}
```

#### Error Message

```javascript
function ErrorMessage({ message }) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {message}
    </div>
  );
}
```

#### Success Message

```javascript
function SuccessMessage({ message }) {
  return (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
      {message}
    </div>
  );
}
```

#### Modal

```javascript
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
```

#### Confirmation Dialog

```javascript
function ConfirmDialog({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4 p-6">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn-primary">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## 📄 Page Components

### Example: Modules Page

```javascript
// src/pages/student/Modules.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Award } from 'lucide-react';
import { contentService } from '../../services/contentService';

function Modules() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const data = await contentService.getModules();
      setModules(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (moduleId) => {
    try {
      await contentService.enrollInModule(moduleId);
      fetchModules(); // Refresh list
    } catch (err) {
      alert('Failed to enroll in module');
    }
  };

  const filteredModules = modules.filter(module => {
    if (filter === 'all') return true;
    if (filter === 'enrolled') return module.isEnrolled;
    if (filter === 'available') return !module.isEnrolled;
    return true;
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Learning Modules</h1>

        {/* Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">All Modules</option>
          <option value="enrolled">Enrolled</option>
          <option value="available">Available</option>
        </select>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map(module => (
          <div key={module.id} className="card hover:shadow-xl transition-shadow">
            {/* Module Image */}
            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-white" />
            </div>

            {/* Module Info */}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{module.title}</h3>
              <p className="text-gray-600 mb-4">{module.description}</p>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {module.duration} hours
                </span>
                <span className="flex items-center">
                  <Award className="w-4 h-4 mr-1" />
                  {module.difficulty}
                </span>
              </div>

              {/* Action Button */}
              {module.isEnrolled ? (
                <Link
                  to={`/student/modules/${module.id}`}
                  className="block w-full text-center btn-primary"
                >
                  Continue Learning
                </Link>
              ) : (
                <button
                  onClick={() => handleEnroll(module.id)}
                  className="w-full btn-secondary"
                >
                  Enroll Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredModules.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No modules found</p>
        </div>
      )}
    </div>
  );
}

export default Modules;
```

---

## 🪝 Custom Hooks

### useApi Hook

```javascript
// src/hooks/useApi.js
import { useState, useEffect } from 'react';
import api from '../utils/api';

export function useApi(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(endpoint, options);
        setData(response.data.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  const refetch = async () => {
    try {
      setLoading(true);
      const response = await api.get(endpoint, options);
      setData(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}

// Usage
function MyComponent() {
  const { data, loading, error, refetch } = useApi('/modules');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.title}</div>
      ))}
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
```

### useDebounce Hook

```javascript
// src/hooks/useDebounce.js
import { useState, useEffect } from 'react';

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Perform search
      console.log('Searching for:', debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

---

## ✅ Best Practices

### Component Best Practices

1. **Keep components small and focused**
2. **Use functional components with hooks**
3. **Extract reusable logic to custom hooks**
4. **Use prop destructuring**
5. **Add PropTypes or TypeScript**
6. **Handle loading and error states**
7. **Use meaningful variable names**
8. **Add comments for complex logic**

### Performance Best Practices

1. **Use React.memo for expensive components**
2. **Use useMemo for expensive calculations**
3. **Use useCallback for function props**
4. **Lazy load routes and components**
5. **Optimize images**
6. **Debounce search inputs**
7. **Implement pagination**
8. **Avoid unnecessary re-renders**

### Code Organization

1. **Group related files together**
2. **Use consistent naming conventions**
3. **Keep files under 300 lines**
4. **Extract constants to separate files**
5. **Use index files for cleaner imports**

---

## ⚡ Performance Optimization

### Code Splitting

```javascript
import { lazy, Suspense } from 'react';

const StudentDashboard = lazy(() => import('./pages/dashboards/StudentDashboard'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <StudentDashboard />
    </Suspense>
  );
}
```

### React.memo

```javascript
import React, { memo } from 'react';

const ExpensiveComponent = memo(({ data }) => {
  // Component logic
  return <div>{/* Render */}</div>;
});
```

### useMemo

```javascript
import { useMemo } from 'react';

function MyComponent({ items }) {
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.name.localeCompare(b.name));
  }, [items]);

  return <div>{/* Render sortedItems */}</div>;
}
```

### useCallback

```javascript
import { useCallback } from 'react';

function MyComponent() {
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []);

  return <ChildComponent onClick={handleClick} />;
}
```

---

## 🧪 Testing

### Manual Testing Checklist

**Authentication:**
- [ ] Login works for all roles
- [ ] Signup works
- [ ] Logout clears session
- [ ] Protected routes redirect

**Navigation:**
- [ ] All links work
- [ ] Back button works
- [ ] Breadcrumbs work

**Forms:**
- [ ] Validation works
- [ ] Error messages display
- [ ] Success messages display
- [ ] Submit works

**Responsive:**
- [ ] Mobile view works
- [ ] Tablet view works
- [ ] Desktop view works

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Blank page after build**
```bash
# Check console for errors
# Verify environment variables
# Check API URL configuration
```

**Issue: API calls fail**
```bash
# Check backend is running
# Verify API URL in .env
# Check CORS configuration
# Verify token is being sent
```

**Issue: Styles not applying**
```bash
# Rebuild Tailwind
npm run build

# Check Tailwind config
# Verify class names
```

---

**Happy Frontend Development! 🚀**
