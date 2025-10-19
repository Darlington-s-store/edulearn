import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Home, 
  BookOpen, 
  FileText, 
  ClipboardCheck, 
  BarChart3, 
  User,
  Users,
  Calendar,
  Clock,
  Award,
  Settings,
  Plus
} from 'lucide-react';
import Sidebar from '../../components/Layout/Sidebar';
import DashboardTopbar from '../../components/Layout/DashboardTopbar';
import TeacherSettings from '../teacher/TeacherSettings';
import PostModule from '../teacher/PostModule';
import Assignments from '../teacher/Assignments';
import Quizzes from '../teacher/Quizzes';
import Reports from '../teacher/Reports';
import LiveClasses from '../teacher/LiveClasses';
import PublishContent from '../teacher/PublishContent';

function TeacherDashboard() {
  const { user } = useAuth();
  
  const menuItems = [
    { icon: Home, label: 'Home', path: '/teacher/dashboard' },
    { icon: Plus, label: 'Publish Content', path: '/teacher/publish' },
    { icon: BookOpen, label: 'Post Module', path: '/teacher/modules' },
    { icon: FileText, label: 'Assignments', path: '/teacher/assignments' },
    { icon: ClipboardCheck, label: 'Quizzes/Exams', path: '/teacher/quizzes' },
    { icon: Calendar, label: 'Live Classes', path: '/teacher/live' },
    { icon: BarChart3, label: 'Student Reports', path: '/teacher/reports' },
    { icon: User, label: 'Profile', path: '/teacher/profile' },
    { icon: Settings, label: 'Settings', path: '/teacher/settings' },
  ];

  const todayClasses = [];
  const recentSubmissions = [];

  const DashboardHome = () => (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 font-playful">Welcome Back, {user?.firstName || 'Teacher'}! 👩‍🏫</h1>
        <p className="text-gray-600 mt-2">Ready to inspire young minds today?</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-primary-600">0</p>
              <p className="text-gray-600 text-sm">Total Students</p>
            </div>
            <Users className="w-8 h-8 text-primary-500" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-purple-600">0</p>
              <p className="text-gray-600 text-sm">Active Modules</p>
            </div>
            <BookOpen className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-mint-600">0</p>
              <p className="text-gray-600 text-sm">Pending Reviews</p>
            </div>
            <FileText className="w-8 h-8 text-mint-500" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-yellow-600">0%</p>
              <p className="text-gray-600 text-sm">Avg. Attendance</p>
            </div>
            <Award className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Classes */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-semibold text-gray-800">{"Today's Classes"}</h2>
          </div>
          
          <div className="space-y-4">
            {todayClasses.map((classItem, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    classItem.status === 'in-progress' 
                      ? 'bg-mint-400' 
                      : classItem.status === 'upcoming'
                      ? 'bg-yellow-400'
                      : 'bg-gray-400'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-800">{classItem.subject}</p>
                    <p className="text-sm text-gray-600">{classItem.students} students</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-800">{classItem.time}</p>
                  {classItem.status === 'in-progress' && (
                    <button className="text-xs bg-mint-100 text-mint-700 px-2 py-1 rounded-full mt-1">
                      In Progress
                    </button>
                  )}
                  {classItem.status === 'upcoming' && (
                    <button className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full mt-1">
                      Start Class
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-6">
            <ClipboardCheck className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-800">Recent Submissions</h2>
          </div>
          
          <div className="space-y-4">
            {recentSubmissions.map((submission, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-800">{submission.student}</p>
                  <p className="text-sm text-gray-600">{submission.assignment}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{submission.submittedAt}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    submission.status === 'new'
                      ? 'bg-yellow-100 text-yellow-700'
                      : submission.status === 'graded'
                      ? 'bg-mint-100 text-mint-700'
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {submission.status === 'new' ? 'New' : submission.status === 'graded' ? 'Graded' : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="card p-4 text-center hover:scale-105 transition-transform">
            <BookOpen className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-800">Post New Module</p>
          </button>
          <button className="card p-4 text-center hover:scale-105 transition-transform">
            <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-800">Create Assignment</p>
          </button>
          <button className="card p-4 text-center hover:scale-105 transition-transform">
            <ClipboardCheck className="w-8 h-8 text-mint-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-800">Schedule Quiz</p>
          </button>
          <button className="card p-4 text-center hover:scale-105 transition-transform">
            <BarChart3 className="w-8 h-8 text-pink-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-800">View Reports</p>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - Fixed on all screens */}
      <Sidebar menuItems={menuItems} userRole="teacher" />
      
      {/* Main Content Area - With left margin for sidebar on desktop */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Fixed Topbar */}
        <DashboardTopbar userRole="teacher" />
        
        {/* Scrollable Content */}
        <div className="flex-1">
          <Routes>
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/publish" element={<PublishContent />} />
            <Route path="/modules" element={<PostModule />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/live" element={<LiveClasses />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/profile" element={<Profile userRole="teacher" />} />
            <Route path="/settings" element={<TeacherSettings />} />
            <Route path="/*" element={<DashboardHome />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
