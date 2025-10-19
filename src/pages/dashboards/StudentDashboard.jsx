import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Home, 
  Video, 
  FileText, 
  Trophy, 
  Users, 
  BookOpen, 
  User,
  Calendar,
  Clock,
  Award,
  Settings,
  Bell,
  Wallet,
  Brain,
  Star,
  TrendingUp,
  Target,
  Zap,
  Play,
  ChevronRight,
  Smile,
  Frown,
  Meh,
  Layers
} from 'lucide-react';
import Sidebar from '../../components/Layout/Sidebar';
import DashboardTopbar from '../../components/Layout/DashboardTopbar';
import Courses from '../student/Courses';
import CourseDetail from '../student/CourseDetail';
import LiveClass from '../student/LiveClass';
import Assignments from '../student/Assignments';
import Leaderboard from '../student/Leaderboard';
import AITutor from '../student/AITutor';
import Rewards from '../student/Rewards';
import Profile from '../Profile';
import Modules from '../student/Modules';

function StudentDashboard() {
  const { user, logout } = useAuth();
  
  const menuItems = [
    { icon: Home, label: 'Home (Overview)', path: '/student/dashboard' },
    { icon: BookOpen, label: 'My Courses', path: '/student/courses' },
    { icon: Layers, label: 'Learning Modules', path: '/student/modules' },
    { icon: FileText, label: 'Assignments', path: '/student/assignments' },
    { icon: Video, label: 'Live Classes', path: '/student/live-class' },
    { icon: Users, label: 'Leaderboard', path: '/student/leaderboard' },
    { icon: Brain, label: 'AI Tutor', path: '/student/ai-tutor' },
    { icon: Star, label: 'Rewards', path: '/student/rewards' },
    { icon: Settings, label: 'Settings', path: '/student/settings' },
  ];

  const upcomingClasses = [];
  const recentAssignments = [];

  const DashboardHome = () => {
    const progressData = {
      overallProgress: 0,
      badgesEarned: 0,
      focusTime: 0,
      streak: 0
    };

    const quickAccess = [];
    const leaderboardData = [];
    const emotionData = [];

    return (
      <div className="p-6 space-y-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 font-playful">
            Welcome Back, {user?.firstName || 'Student'}! 🌟
          </h1>
          <p className="text-gray-600 mt-2">Ready to continue your learning adventure?</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Progress Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-3xl font-bold">{progressData.overallProgress}%</span>
            </div>
            <h3 className="text-lg font-semibold mb-1">Overall Progress</h3>
            <p className="text-blue-100 text-sm">Keep up the great work!</p>
          </div>

          {/* Badges Card */}
          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-3xl font-bold">{progressData.badgesEarned}</span>
            </div>
            <h3 className="text-lg font-semibold mb-1">Badges Earned</h3>
            <p className="text-yellow-100 text-sm">Amazing achievements!</p>
          </div>

          {/* Focus Time Card */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-3xl font-bold">{progressData.focusTime}h</span>
            </div>
            <h3 className="text-lg font-semibold mb-1">Today's Focus</h3>
            <p className="text-green-100 text-sm">Stay focused!</p>
          </div>

          {/* Streak Card */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <span className="text-3xl font-bold">{progressData.streak}</span>
            </div>
            <h3 className="text-lg font-semibold mb-1">Day Streak</h3>
            <p className="text-purple-100 text-sm">On fire! 🔥</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Access - Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Access</h2>
              
              {quickAccess.length > 0 ? (
                <>
                  {quickAccess[0] && (
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 mb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Play className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold text-blue-800">Resume Last Lesson</span>
                      </div>
                      <p className="text-sm text-blue-700 mb-2">{quickAccess[0].title}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex-1 bg-blue-200 rounded-full h-2 mr-3">
                          <div className="bg-blue-600 h-2 rounded-full" style={{width: `${quickAccess[0].progress}%`}}></div>
                        </div>
                        <span className="text-xs text-blue-600">{quickAccess[0].timeLeft}</span>
                      </div>
                    </div>
                  )}

                  {quickAccess[1] && (
                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4 mb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="w-5 h-5 text-orange-600" />
                        <span className="font-semibold text-orange-800">Upcoming Assignment</span>
                      </div>
                      <p className="text-sm text-orange-700 mb-1">{quickAccess[1].title}</p>
                      <p className="text-xs text-orange-600">Due: {quickAccess[1].dueDate}</p>
                    </div>
                  )}

                  {quickAccess[2] && (
                    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Video className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-800">Next Live Class</span>
                      </div>
                      <p className="text-sm text-green-700 mb-1">{quickAccess[2].title}</p>
                      <p className="text-xs text-green-600">{quickAccess[2].time} • {quickAccess[2].teacher}</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No quick access items available</p>
                  <p className="text-sm text-gray-400 mt-2">Start learning to see your progress here</p>
                </div>
              )}
            </div>
          </div>

          {/* Main Panel - Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* 3D Leaderboard Widget */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Global Leaderboard</h2>
              {leaderboardData.length > 0 ? (
                <div className="space-y-3">
                  {leaderboardData.map((student, index) => (
                    <div 
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                        student.isCurrentUser 
                          ? 'bg-gradient-to-r from-primary-100 to-purple-100 border-2 border-primary-300' 
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                          student.rank <= 3 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gray-200'
                        }`}>
                          {student.avatar}
                        </div>
                        <div>
                          <p className={`font-semibold ${student.isCurrentUser ? 'text-primary-700' : 'text-gray-800'}`}>
                            {student.name} {student.isCurrentUser && '(You)'}
                          </p>
                          <p className="text-sm text-gray-500">Rank #{student.rank}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800">{student.points.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">points</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No leaderboard data available</p>
                  <p className="text-sm text-gray-400 mt-2">Earn points to appear on the leaderboard</p>
                </div>
              )}
            </div>

            {/* Emotion Graph */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Engagement Levels</h2>
              {emotionData.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">This Week</span>
                    <div className="flex items-center gap-2">
                      <Smile className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600">Average: 82%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between gap-2">
                    {emotionData.map((day, index) => {
                      const emotionIcon = day.emotion === 'happy' ? '😊' : day.emotion === 'excited' ? '🤩' : '😐';
                      return (
                        <div key={index} className="flex flex-col items-center gap-2 flex-1">
                          <div className="text-lg">{emotionIcon}</div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-500 ${
                                day.value >= 80 ? 'bg-green-500' : day.value >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{width: `${day.value}%`}}
                            ></div>
                          </div>
                          <div className="text-xs font-medium text-gray-600">{day.day}</div>
                          <div className="text-xs text-gray-500">{day.value}%</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No engagement data available</p>
                  <p className="text-sm text-gray-400 mt-2">Complete activities to track your engagement</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - Fixed on all screens */}
      <Sidebar menuItems={menuItems} userRole="student" />
      
      {/* Main Content Area - With left margin for sidebar on desktop */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Fixed Topbar */}
        <DashboardTopbar userRole="student" />
        
        {/* Scrollable Content */}
        <div className="flex-1">
          <Routes>
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CourseDetail />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/lesson/:moduleId" element={<LessonViewer />} />
            <Route path="/live-class" element={<LiveClass />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/ai-tutor" element={<AITutor />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/profile" element={<Profile userRole="student" />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/*" element={<DashboardHome />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
