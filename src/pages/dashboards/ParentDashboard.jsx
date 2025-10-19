import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Home, 
  Users, 
  MessageCircle, 
  CreditCard, 
  Settings,
  BarChart3,
  BookOpen,
  User,
  Zap
} from 'lucide-react';
import Sidebar from '../../components/Layout/Sidebar';
import DashboardTopbar from '../../components/Layout/DashboardTopbar';
import Profile from '../Profile';
import StudentPerformance from '../parent/StudentPerformance';
import CommunicationCenter from '../parent/CommunicationCenter';
import SubscriptionManagement from '../parent/SubscriptionManagement';
import ParentSettings from '../parent/ParentSettings';

function ParentDashboard() {
  const { user } = useAuth();
  
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/parent/dashboard' },
    { icon: Users, label: 'My Children', path: '/parent/children' },
    { icon: BarChart3, label: 'Performance', path: '/parent/performance' },
    { icon: MessageCircle, label: 'Messages', path: '/parent/messages' },
    { icon: Calendar, label: 'Schedule', path: '/parent/schedule' },
    { icon: Award, label: 'Achievements', path: '/parent/achievements' },
    { icon: User, label: 'Profile', path: '/parent/profile' },
    { icon: Settings, label: 'Settings', path: '/parent/settings' },
  ];

  const children = [
    {
      id: 1,
      name: 'Emma Johnson',
      age: 12,
      grade: 'Grade 6',
      avatar: '👧',
      overallProgress: 85,
      attendance: 95,
      assignmentsCompleted: 12,
      assignmentsTotal: 15,
      lastActive: '2 hours ago',
      currentStreak: 7,
      totalPoints: 2450,
      mood: 'happy',
      nextClass: 'Mathematics - Live Class',
      nextClassTime: '2:00 PM',
      teacher: 'Mrs. Sarah Williams'
    },
    {
      id: 2,
      name: 'Alex Johnson',
      age: 10,
      grade: 'Grade 4',
      avatar: '👦',
      overallProgress: 78,
      attendance: 88,
      assignmentsCompleted: 8,
      assignmentsTotal: 12,
      lastActive: '1 day ago',
      currentStreak: 3,
      totalPoints: 1890,
      mood: 'neutral',
      nextClass: 'Science - Interactive Module',
      nextClassTime: '4:00 PM',
      teacher: 'Mr. David Chen'
    }
  ];

  const recentActivities = [
    {
      child: 'Emma Johnson',
      activity: 'Completed Math Assignment',
      subject: 'Mathematics',
      time: '2 hours ago',
      points: 50,
      type: 'assignment'
    },
    {
      child: 'Alex Johnson',
      activity: 'Attended Live Class',
      subject: 'Science',
      time: '1 day ago',
      points: 30,
      type: 'class'
    },
    {
      child: 'Emma Johnson',
      activity: 'Earned Achievement Badge',
      subject: 'Reading',
      time: '2 days ago',
      points: 100,
      type: 'achievement'
    }
  ];

  const DashboardHome = () => {
    const totalChildren = children.length;
    const averageProgress = Math.round(children.reduce((sum, child) => sum + child.overallProgress, 0) / totalChildren);
    const totalPoints = children.reduce((sum, child) => sum + child.totalPoints, 0);
    const averageAttendance = Math.round(children.reduce((sum, child) => sum + child.attendance, 0) / totalChildren);

    return (
      <div className="p-6 space-y-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 font-playful">
            Welcome, {user?.firstName || 'Parent'}! 👨‍👩‍👧‍👦
          </h1>
          <p className="text-gray-600 mt-2">Track your children's learning journey and stay connected</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Children Count */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-3xl font-bold">{totalChildren}</span>
            </div>
            <h3 className="text-lg font-semibold mb-1">My Children</h3>
            <p className="text-blue-100 text-sm">Active learners</p>
          </div>

          {/* Average Progress */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-3xl font-bold">{averageProgress}%</span>
            </div>
            <h3 className="text-lg font-semibold mb-1">Avg. Progress</h3>
            <p className="text-green-100 text-sm">Great progress!</p>
          </div>

          {/* Total Points */}
          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6" />
              </div>
              <span className="text-3xl font-bold">{totalPoints.toLocaleString()}</span>
            </div>
            <h3 className="text-lg font-semibold mb-1">Total Points</h3>
            <p className="text-yellow-100 text-sm">Amazing effort!</p>
          </div>

          {/* Average Attendance */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-3xl font-bold">{averageAttendance}%</span>
            </div>
            <h3 className="text-lg font-semibold mb-1">Avg. Attendance</h3>
            <p className="text-purple-100 text-sm">Excellent attendance!</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Children Overview - Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-6">My Children</h2>
              
              <div className="space-y-4">
                {children.map((child) => (
                  <div key={child.id} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">{child.avatar}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{child.name}</h3>
                        <p className="text-sm text-gray-600">{child.grade}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary-600">{child.overallProgress}%</div>
                        <div className="text-xs text-gray-500">Progress</div>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div 
                        className="bg-gradient-to-r from-primary-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{width: `${child.overallProgress}%`}}
                      ></div>
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-500" />
                        <span className="text-gray-600">Last active: {child.lastActive}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-yellow-500" />
                        <span className="text-gray-600">{child.currentStreak} day streak</span>
                      </div>
                    </div>
                    
                    {/* Mood Indicator */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Mood:</span>
                        <span className="text-lg">
                          {child.mood === 'happy' ? '😊' : child.mood === 'neutral' ? '😐' : '😔'}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-800">{child.totalPoints} pts</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Panel - Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Activities */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activities</h2>
              
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === 'assignment' 
                          ? 'bg-blue-100' 
                          : activity.type === 'class'
                          ? 'bg-green-100'
                          : 'bg-yellow-100'
                      }`}>
                        {activity.type === 'assignment' ? (
                          <FileText className="w-5 h-5 text-blue-600" />
                        ) : activity.type === 'class' ? (
                          <Video className="w-5 h-5 text-green-600" />
                        ) : (
                          <Award className="w-5 h-5 text-yellow-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          <span className="text-primary-600">{activity.child}</span> {activity.activity}
                        </p>
                        <p className="text-sm text-gray-600">{activity.subject}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{activity.time}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span className="text-xs text-gray-600">+{activity.points}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Classes */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Upcoming Classes</h2>
              
              <div className="space-y-4">
                {children.map((child) => (
                  <div key={child.id} className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="text-lg">{child.avatar}</div>
                        <div>
                          <h3 className="font-semibold text-blue-800">{child.name}</h3>
                          <p className="text-sm text-blue-700">{child.nextClass}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-800">{child.nextClassTime}</p>
                        <p className="text-xs text-blue-600">{child.teacher}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-700">Today</span>
                      <div className="flex-1"></div>
                      <button className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full hover:bg-blue-300 transition-colors">
                        Join Class
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Performance Summary</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {children.map((child) => (
                  <div key={child.id} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="text-xl">{child.avatar}</div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{child.name}</h3>
                        <p className="text-sm text-gray-600">{child.grade}</p>
                      </div>
                    </div>
                    
                    {/* Progress Metrics */}
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Overall Progress</span>
                          <span className="font-medium">{child.overallProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-primary-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                            style={{width: `${child.overallProgress}%`}}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Attendance</span>
                          <span className="font-medium">{child.attendance}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                            style={{width: `${child.attendance}%`}}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Assignments</span>
                          <span className="font-medium">{child.assignmentsCompleted}/{child.assignmentsTotal}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                            style={{width: `${(child.assignmentsCompleted / child.assignmentsTotal) * 100}%`}}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - Fixed on all screens */}
      <Sidebar menuItems={menuItems} userRole="parent" />
      
      {/* Main Content Area - With left margin for sidebar on desktop */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Fixed Topbar */}
        <DashboardTopbar userRole="parent" />
        
        {/* Scrollable Content */}
        <div className="flex-1">
          <Routes>
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/children" element={<StudentPerformance />} />
            <Route path="/performance" element={<StudentPerformance />} />
            <Route path="/messages" element={<CommunicationCenter />} />
            <Route path="/schedule" element={<CommunicationCenter />} />
            <Route path="/achievements" element={<StudentPerformance />} />
            <Route path="/profile" element={<Profile userRole="parent" />} />
            <Route path="/settings" element={<ParentSettings />} />
            <Route path="/*" element={<DashboardHome />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default ParentDashboard;
