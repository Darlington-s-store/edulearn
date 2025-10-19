import React from 'react';
import { BarChart3, Users, GraduationCap, DollarSign, Activity, TrendingUp, Clock, CheckCircle, XCircle, BookOpen } from 'lucide-react';

function AdminAnalytics() {
  const analyticsData = {
    totalStudents: 1247,
    activeStudents: 980,
    newStudentsThisMonth: 120,
    totalTeachers: 43,
    activeTeachers: 38,
    newTeachersThisMonth: 3,
    monthlyRevenue: 61200, // GHS
    revenueGrowth: 18, // percentage
    totalModules: 150,
    liveClassesConducted: 85,
    averageEngagement: 75, // percentage
    platformUptime: 99.9, // percentage
    errorRate: 0.2, // percentage
    recentRevenue: [
      { month: 'Jan', amount: 45600 },
      { month: 'Feb', amount: 52800 },
      { month: 'Mar', amount: 61200 },
      { month: 'Apr', amount: 65000 },
    ],
    studentEnrollment: [
      { month: 'Jan', count: 1000 },
      { month: 'Feb', count: 1050 },
      { month: 'Mar', count: 1120 },
      { month: 'Apr', count: 1247 },
    ]
  };

  // Dummy data for charts (in a real app, you'd use a charting library)
  const renderBarChart = (data, label) => (
    <div className="bg-gray-100 p-4 rounded-xl h-48 flex items-end">
      {data.map((item, index) => (
        <div key={index} className="flex-1 flex flex-col items-center mx-1">
          <div
            className="w-8 bg-primary-500 rounded-t-md transition-all duration-500 ease-out"
            style={{ height: `${(item.amount || item.count) / (label === 'Revenue' ? 1000 : 10)}%` }}
          ></div>
          <span className="text-xs text-gray-600 mt-1">{item.month}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 font-playful">
          Admin Analytics & Reports 📊
        </h1>
        <p className="text-gray-600 mt-2">In-depth insights into platform performance and user activity</p>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-primary-500" />
            <p className="text-3xl font-bold text-primary-600">{analyticsData.totalStudents}</p>
          </div>
          <p className="text-gray-600 text-sm">Total Students</p>
          <p className="text-mint-600 text-xs mt-1">+{analyticsData.newStudentsThisMonth} this month</p>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between mb-2">
            <GraduationCap className="w-8 h-8 text-purple-500" />
            <p className="text-3xl font-bold text-purple-600">{analyticsData.totalTeachers}</p>
          </div>
          <p className="text-gray-600 text-sm">Total Teachers</p>
          <p className="text-mint-600 text-xs mt-1">+{analyticsData.newTeachersThisMonth} this month</p>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8 text-mint-500" />
            <p className="text-3xl font-bold text-mint-600">₵{analyticsData.monthlyRevenue.toLocaleString()}</p>
          </div>
          <p className="text-gray-600 text-sm">Monthly Revenue</p>
          <p className="text-mint-600 text-xs mt-1">+{analyticsData.revenueGrowth}% vs last month</p>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-yellow-500" />
            <p className="text-3xl font-bold text-yellow-600">{analyticsData.averageEngagement}%</p>
          </div>
          <p className="text-gray-600 text-sm">Avg. Student Engagement</p>
          <p className="text-gray-500 text-xs mt-1">Across all modules & classes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-mint-600" /> Revenue Trend
          </h2>
          {renderBarChart(analyticsData.recentRevenue, 'Revenue')}
          <p className="text-center text-gray-500 text-sm mt-4">Monthly Revenue (GHS)</p>
        </div>

        {/* Student Enrollment Chart */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary-600" /> Student Enrollment
          </h2>
          {renderBarChart(analyticsData.studentEnrollment, 'Enrollment')}
          <p className="text-center text-gray-500 text-sm mt-4">New Student Enrollments</p>
        </div>
      </div>

      {/* Platform Health */}
      <div className="card p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5 text-purple-600" /> Platform Health
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="w-16 h-16 bg-mint-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-8 h-8 text-mint-600" />
            </div>
            <p className="font-medium text-gray-800">Uptime</p>
            <p className="text-2xl font-bold text-mint-600">{analyticsData.platformUptime}%</p>
          </div>
          <div>
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Clock className="w-8 h-8 text-primary-600" />
            </div>
            <p className="font-medium text-gray-800">Avg. Response Time</p>
            <p className="text-2xl font-bold text-primary-600">124ms</p>
          </div>
          <div>
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <XCircle className="w-8 h-8 text-yellow-600" />
            </div>
            <p className="font-medium text-gray-800">Error Rate</p>
            <p className="text-2xl font-bold text-yellow-600">{analyticsData.errorRate}%</p>
          </div>
        </div>
      </div>

      {/* Content Overview */}
      <div className="card p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" /> Content Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-blue-600">{analyticsData.totalModules}</p>
            <p className="text-gray-600 text-sm">Total Learning Modules</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-cyan-600">{analyticsData.liveClassesConducted}</p>
            <p className="text-gray-600 text-sm">Live Classes Conducted</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAnalytics;