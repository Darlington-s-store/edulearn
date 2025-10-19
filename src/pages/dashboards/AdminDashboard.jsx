import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { 
  Home, 
  Users, 
  GraduationCap, 
  CreditCard, 
  Activity,
  User,
  TrendingUp,
  UserCheck,
  DollarSign,
  Clock,
  BarChart3,
  Settings as SettingsIcon
} from 'lucide-react';
import Sidebar from '../../components/Layout/Sidebar';
import DashboardTopbar from '../../components/Layout/DashboardTopbar';
import Profile from '../Profile';
import Teachers from '../admin/Teachers';
import Students from '../admin/Students';
import Payments from '../admin/Payments';
import ActivityLogs from '../admin/ActivityLogs';
import AdminAnalytics from '../admin/AdminAnalytics';

function AdminDashboard() {
  const { admin } = useAdminAuth();
  
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
    { icon: GraduationCap, label: 'Teachers', path: '/admin/teachers' },
    { icon: Users, label: 'Students', path: '/admin/students' },
    { icon: CreditCard, label: 'Payments', path: '/admin/payments' },
    { icon: Activity, label: 'Activity Logs', path: '/admin/logs' },
    { icon: User, label: 'Profile', path: '/admin/profile' },
    { icon: SettingsIcon, label: 'Settings', path: '/admin/settings' },
  ];

  const recentActivities = [
    {
      user: 'Mrs. Johnson',
      action: 'posted new module',
      subject: 'Mathematics',
      time: '2 hours ago',
      type: 'module'
    },
    {
      user: 'Emma Wilson',
      action: 'submitted assignment',
      subject: 'Science',
      time: '3 hours ago',
      type: 'assignment'
    },
    {
      user: 'Alex Chen',
      action: 'joined live class',
      subject: 'English',
      time: '5 hours ago',
      type: 'class'
    },
    {
      user: 'Sarah Davis',
      action: 'completed payment',
      subject: 'Monthly subscription',
      time: '1 day ago',
      type: 'payment'
    }
  ];

  const paymentStats = [
    {
      month: 'January',
      amount: '₵45,600',
      subscribers: 156,
      growth: '+12%'
    },
    {
      month: 'February',
      amount: '₵52,800',
      subscribers: 178,
      growth: '+14%'
    },
    {
      month: 'March',
      amount: '₵61,200',
      subscribers: 201,
      growth: '+13%'
    }
  ];

  const DashboardHome = () => (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 font-playful">
          Welcome, {user?.firstName || 'Admin'}! 🚀
        </h1>
        <p className="text-gray-600 mt-2">Monitor and manage your learning platform</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-primary-600">1,247</p>
              <p className="text-gray-600 text-sm">Total Students</p>
            </div>
            <Users className="w-8 h-8 text-primary-500" />
          </div>
          <div className="mt-2">
            <span className="text-mint-600 text-sm font-medium">+12% this month</span>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-purple-600">43</p>
              <p className="text-gray-600 text-sm">Active Teachers</p>
            </div>
            <GraduationCap className="w-8 h-8 text-purple-500" />
          </div>
          <div className="mt-2">
            <span className="text-mint-600 text-sm font-medium">+3 this week</span>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-mint-600">₵61,200</p>
              <p className="text-gray-600 text-sm">Monthly Revenue</p>
            </div>
            <DollarSign className="w-8 h-8 text-mint-500" />
          </div>
          <div className="mt-2">
            <span className="text-mint-600 text-sm font-medium">+18% vs last month</span>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-yellow-600">94%</p>
              <p className="text-gray-600 text-sm">Platform Uptime</p>
            </div>
            <TrendingUp className="w-8 h-8 text-yellow-500" />
          </div>
          <div className="mt-2">
            <span className="text-mint-600 text-sm font-medium">Excellent performance</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-semibold text-gray-800">Recent Activities</h2>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'module' 
                      ? 'bg-purple-400' 
                      : activity.type === 'assignment'
                      ? 'bg-mint-400'
                      : activity.type === 'class'
                      ? 'bg-primary-400'
                      : 'bg-yellow-400'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-800">
                      <span className="text-primary-600">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-sm text-gray-600">{activity.subject}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Statistics */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-6">
            <CreditCard className="w-6 h-6 text-mint-600" />
            <h2 className="text-xl font-semibold text-gray-800">Payment Statistics</h2>
          </div>
          
          <div className="space-y-4">
            {paymentStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-800">{stat.month}</p>
                  <p className="text-sm text-gray-600">{stat.subscribers} subscribers</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-800">{stat.amount}</p>
                  <span className="text-xs bg-mint-100 text-mint-700 px-2 py-1 rounded-full">
                    {stat.growth}
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
            <GraduationCap className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-800">Add Teacher</p>
          </button>
          <button className="card p-4 text-center hover:scale-105 transition-transform">
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-800">Manage Students</p>
          </button>
          <button className="card p-4 text-center hover:scale-105 transition-transform">
            <CreditCard className="w-8 h-8 text-mint-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-800">View Payments</p>
          </button>
          <button className="card p-4 text-center hover:scale-105 transition-transform">
            <Activity className="w-8 h-8 text-pink-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-800">Activity Logs</p>
          </button>
        </div>
      </div>

      {/* System Health */}
      <div className="mt-8">
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">System Health</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-mint-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <UserCheck className="w-8 h-8 text-mint-600" />
              </div>
              <p className="font-medium text-gray-800">Active Users</p>
              <p className="text-2xl font-bold text-mint-600">1,089</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-8 h-8 text-primary-600" />
              </div>
              <p className="font-medium text-gray-800">Server Response</p>
              <p className="text-2xl font-bold text-primary-600">124ms</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-8 h-8 text-yellow-600" />
              </div>
              <p className="font-medium text-gray-800">Error Rate</p>
              <p className="text-2xl font-bold text-yellow-600">0.2%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - Fixed on all screens */}
      <Sidebar menuItems={menuItems} userRole="admin" />
      
      {/* Main Content Area - With left margin for sidebar on desktop */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Fixed Topbar */}
        <DashboardTopbar userRole="admin" user={admin} />
        
        {/* Scrollable Content */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/analytics" element={<AdminAnalytics />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/students" element={<Students />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/logs" element={<ActivityLogs />} />
            <Route path="/profile" element={<Profile userRole="admin" />} />
            <Route path="/settings" element={<AdminSettings />} />
            <Route path="/*" element={<DashboardHome />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
