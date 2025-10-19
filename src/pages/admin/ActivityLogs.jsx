import React, { useState } from 'react';
import { 
  Activity, 
  Filter,
  Download,
  Search,
  Calendar,
  User,
  BookOpen,
  FileText,
  CreditCard,
  Users,
  Eye,
  Clock
} from 'lucide-react';

function ActivityLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterUser, setFilterUser] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'module',
      action: 'posted new module',
      user: 'Mrs. Johnson',
      userType: 'teacher',
      target: 'Linear Equations and Inequalities',
      timestamp: '2024-02-12 14:30:00',
      details: 'Mathematics module for Week 5',
      ipAddress: '192.168.1.100'
    },
    {
      id: 2,
      type: 'assignment',
      action: 'submitted assignment',
      user: 'Emma Wilson',
      userType: 'student',
      target: 'Math Problem Set #5',
      timestamp: '2024-02-12 13:45:00',
      details: 'Assignment submitted successfully',
      ipAddress: '192.168.1.101'
    },
    {
      id: 3,
      type: 'payment',
      action: 'completed payment',
      user: 'Chen Family',
      userType: 'student',
      target: 'Family Plan Subscription',
      timestamp: '2024-02-12 10:15:00',
      details: '₵1,200 payment via Paystack',
      ipAddress: '192.168.1.102'
    },
    {
      id: 4,
      type: 'login',
      action: 'logged in',
      user: 'Alex Chen',
      userType: 'student',
      target: 'Student Dashboard',
      timestamp: '2024-02-12 09:30:00',
      details: 'Successful login from mobile device',
      ipAddress: '192.168.1.103'
    },
    {
      id: 5,
      type: 'class',
      action: 'joined live class',
      user: 'Sarah Williams',
      userType: 'student',
      target: 'Mathematics Live Session',
      timestamp: '2024-02-12 08:00:00',
      details: 'Joined class 5 minutes after start',
      ipAddress: '192.168.1.104'
    },
    {
      id: 6,
      type: 'user_management',
      action: 'created teacher account',
      user: 'Admin',
      userType: 'admin',
      target: 'Mr. David Chen',
      timestamp: '2024-02-11 16:20:00',
      details: 'New teacher account for Science department',
      ipAddress: '192.168.1.105'
    },
    {
      id: 7,
      type: 'assignment',
      action: 'graded assignment',
      user: 'Mrs. Johnson',
      userType: 'teacher',
      target: 'Geometry Quiz - Emma Johnson',
      timestamp: '2024-02-11 15:45:00',
      details: 'Grade: 92% with feedback provided',
      ipAddress: '192.168.1.106'
    },
    {
      id: 8,
      type: 'system',
      action: 'system backup',
      user: 'System',
      userType: 'system',
      target: 'Database Backup',
      timestamp: '2024-02-11 02:00:00',
      details: 'Automated daily backup completed',
      ipAddress: 'localhost'
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'module':
        return <BookOpen className="w-5 h-5 text-purple-600" />;
      case 'assignment':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'payment':
        return <CreditCard className="w-5 h-5 text-mint-600" />;
      case 'login':
        return <User className="w-5 h-5 text-primary-600" />;
      case 'class':
        return <Users className="w-5 h-5 text-yellow-600" />;
      case 'user_management':
        return <Users className="w-5 h-5 text-pink-600" />;
      case 'system':
        return <Activity className="w-5 h-5 text-gray-600" />;
      default:
        return <Activity className="w-5 h-5 text-gray-600" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'module':
        return 'bg-purple-50 border-purple-200';
      case 'assignment':
        return 'bg-blue-50 border-blue-200';
      case 'payment':
        return 'bg-mint-50 border-mint-200';
      case 'login':
        return 'bg-primary-50 border-primary-200';
      case 'class':
        return 'bg-yellow-50 border-yellow-200';
      case 'user_management':
        return 'bg-pink-50 border-pink-200';
      case 'system':
        return 'bg-gray-50 border-gray-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getUserTypeColor = (userType) => {
    switch (userType) {
      case 'admin':
        return 'bg-red-100 text-red-700';
      case 'teacher':
        return 'bg-purple-100 text-purple-700';
      case 'student':
        return 'bg-blue-100 text-blue-700';
      case 'system':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.target.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || activity.type === filterType;
    const matchesUser = filterUser === 'all' || activity.userType === filterUser;
    return matchesSearch && matchesType && matchesUser;
  });

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 font-playful">Activity Logs 📋</h1>
            <p className="text-gray-600 mt-2">Monitor all system activities and user actions</p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <button className="btn-secondary flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Advanced Filter
            </button>
            <button className="btn-primary flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Logs
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-primary-600">{activities.length}</p>
              <p className="text-gray-600 text-sm">Total Activities</p>
            </div>
            <Activity className="w-8 h-8 text-primary-500" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-blue-600">{activities.filter(a => a.userType === 'student').length}</p>
              <p className="text-gray-600 text-sm">Student Actions</p>
            </div>
            <User className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-purple-600">{activities.filter(a => a.userType === 'teacher').length}</p>
              <p className="text-gray-600 text-sm">Teacher Actions</p>
            </div>
            <BookOpen className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-mint-600">{activities.filter(a => a.type === 'system').length}</p>
              <p className="text-gray-600 text-sm">System Events</p>
            </div>
            <Activity className="w-8 h-8 text-mint-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="all">All Types</option>
          <option value="module">Modules</option>
          <option value="assignment">Assignments</option>
          <option value="payment">Payments</option>
          <option value="login">Logins</option>
          <option value="class">Classes</option>
          <option value="user_management">User Management</option>
          <option value="system">System</option>
        </select>
        <select
          value={filterUser}
          onChange={(e) => setFilterUser(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="all">All Users</option>
          <option value="admin">Admins</option>
          <option value="teacher">Teachers</option>
          <option value="student">Students</option>
          <option value="system">System</option>
        </select>
        <input
          type="date"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {/* Activity Timeline */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Activity Timeline</h2>
        
        <div className="space-y-4">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className={`p-4 rounded-lg border-2 ${getActivityColor(activity.type)}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-800">{activity.user}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUserTypeColor(activity.userType)}`}>
                        {activity.userType}
                      </span>
                      <span className="text-gray-600">{activity.action}</span>
                    </div>
                    <p className="text-gray-700 font-medium mb-1">{activity.target}</p>
                    <p className="text-sm text-gray-600 mb-2">{activity.details}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTimestamp(activity.timestamp)}
                      </span>
                      <span>IP: {activity.ipAddress}</span>
                    </div>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">No activities found</h3>
            <p className="text-gray-400">No activities match your current filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ActivityLogs;
