import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/auth/Login';
import AdminLogin from './pages/auth/AdminLogin';
import Signup from './pages/auth/Signup';
import StudentLogin from './pages/auth/StudentLogin';
import ParentLogin from './pages/auth/ParentLogin';
import TeacherLogin from './pages/auth/TeacherLogin';
import StudentSignup from './pages/auth/StudentSignup';
import ParentSignup from './pages/auth/ParentSignup';
import TeacherSignup from './pages/auth/TeacherSignup';
import RoleSelection from './pages/auth/RoleSelection';
import ForgotPassword from './pages/auth/ForgotPassword';
import Pricing from './pages/Pricing';
import Subscribe from './pages/Subscribe';
import StudentDashboard from './pages/dashboards/StudentDashboard';
import TeacherDashboard from './pages/dashboards/TeacherDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import ParentDashboard from './pages/dashboards/ParentDashboard';
import { AuthProvider } from './contexts/AuthContext';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import { ContentProvider } from './contexts/ContentContextAPI';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AdminAuthProvider>
          <ContentProvider>
            <div className="min-h-screen flex flex-col">
              <Routes>
          {/* Public Routes with Navbar and Footer */}
          <Route path="/" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Home />
              </main>
              <Footer />
            </>
          } />
          
          <Route path="/about" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <About />
              </main>
              <Footer />
            </>
          } />
          
          <Route path="/contact" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Contact />
              </main>
              <Footer />
            </>
          } />

          <Route path="/pricing" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Pricing />
              </main>
              <Footer />
            </>
          } />
          
          {/* Auth Routes */}
          <Route path="/get-started" element={<RoleSelection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/student" element={<StudentLogin />} />
          <Route path="/login/parent" element={<ParentLogin />} />
          <Route path="/login/teacher" element={<TeacherLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/student" element={<StudentSignup />} />
          <Route path="/signup/parent" element={<ParentSignup />} />
          <Route path="/signup/teacher" element={<TeacherSignup />} />
          <Route path="/signup/:type" element={<Signup />} />
          <Route path="/subscribe" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Subscribe />
              </main>
              <Footer />
            </>
          } />
          
          {/* Protected Dashboard Routes - No Navbar/Footer */}
          <Route path="/student/*" element={
            <ProtectedRoute allowedRoles={['student', 'parent']}>
              <StudentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/teacher/*" element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherDashboard />
            </ProtectedRoute>
          } />
          <Route path="/parent/*" element={
            <ProtectedRoute allowedRoles={['parent']}>
              <ParentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/*" element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          } />
        </Routes>
            </div>
          </ContentProvider>
        </AdminAuthProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
