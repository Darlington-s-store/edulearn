import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { 
  GraduationCap, 
  Plus, 
  Search,
  Filter,
  Edit3,
  Trash2,
  Eye,
  Mail,
  Phone,
  Calendar,
  Users,
  BookOpen,
  Award,
  X,
  Clock
} from 'lucide-react';

function Teachers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/users?role=teacher');
      if (response.data.success) {
        setTeachers(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching teachers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (teacher) => {
    setSelectedTeacher(teacher);
    setShowDetailsModal(true);
  };

  const handleDeleteTeacher = async (teacherId) => {
    if (!confirm('Are you sure you want to delete this teacher?')) return;
    
    try {
      const response = await api.delete(`/admin/users/${teacherId}`);
      if (response.data.success) {
        alert('Teacher deleted successfully');
        fetchTeachers();
      }
    } catch (error) {
      console.error('Error deleting teacher:', error);
      alert('Failed to delete teacher');
    }
  };

  const mockTeachers = [
    {
      id: 1,
      name: 'Mrs. Sarah Johnson',
      email: 'sarah.johnson@lovable.com',
      phone: '+233 123 456 789',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      subjects: ['Mathematics', 'Algebra'],
      students: 156,
      modules: 12,
      joinDate: '2023-01-15',
      status: 'active',
      rating: 4.9,
      experience: '8 years'
    },
    {
      id: 2,
      name: 'Mr. David Chen',
      email: 'david.chen@lovable.com',
      phone: '+233 123 456 790',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      subjects: ['Science', 'Physics'],
      students: 134,
      modules: 8,
      joinDate: '2023-03-20',
      status: 'active',
      rating: 4.7,
      experience: '6 years'
    },
    {
      id: 3,
      name: 'Ms. Emily Wilson',
      email: 'emily.wilson@lovable.com',
      phone: '+233 123 456 791',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      subjects: ['English', 'Literature'],
      students: 142,
      modules: 10,
      joinDate: '2023-02-10',
      status: 'active',
      rating: 4.8,
      experience: '5 years'
    },
    {
      id: 4,
      name: 'Mr. James Brown',
      email: 'james.brown@lovable.com',
      phone: '+233 123 456 792',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      subjects: ['History', 'Geography'],
      students: 98,
      modules: 6,
      joinDate: '2023-06-01',
      status: 'inactive',
      rating: 4.5,
      experience: '4 years'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-mint-100 text-mint-700';
      case 'inactive':
        return 'bg-gray-100 text-gray-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const displayTeachers = loading ? mockTeachers : teachers;

  const filteredTeachers = displayTeachers.filter(teacher => {
    const name = teacher.name || `${teacher.firstName} ${teacher.lastName}`;
    const email = teacher.email || '';
    const subjects = teacher.subjects || (teacher.teacherProfile?.subject ? [teacher.teacherProfile.subject] : []);
    
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStatus === 'all' || teacher.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 font-playful">Teachers Management 👩‍🏫</h1>
            <p className="text-gray-600 mt-2">Manage teacher accounts and monitor their performance</p>
          </div>
          <button className="btn-primary flex items-center gap-2 mt-4 sm:mt-0">
            <Plus className="w-4 h-4" />
            Add Teacher
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-primary-600">{teachers.length}</p>
              <p className="text-gray-600 text-sm">Total Teachers</p>
            </div>
            <GraduationCap className="w-8 h-8 text-primary-500" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-mint-600">{teachers.filter(t => t.status === 'active').length}</p>
              <p className="text-gray-600 text-sm">Active</p>
            </div>
            <Users className="w-8 h-8 text-mint-500" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-yellow-600">{teachers.reduce((sum, t) => sum + t.modules, 0)}</p>
              <p className="text-gray-600 text-sm">Total Modules</p>
            </div>
            <BookOpen className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-purple-600">4.7</p>
              <p className="text-gray-600 text-sm">Avg Rating</p>
            </div>
            <Award className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search teachers by name, email, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Teachers Grid */}
      {!loading && (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => {
          const name = teacher.name || `${teacher.firstName} ${teacher.lastName}`;
          const subjects = teacher.subjects || (teacher.teacherProfile?.subject ? [teacher.teacherProfile.subject] : ['N/A']);
          const status = teacher.status || 'active';
          
          return (
          <div key={teacher.id} className="card p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {name[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{name}</h3>
                  <p className="text-sm text-gray-500">{teacher.experience || teacher.teacherProfile?.experience || 'N/A'}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                {status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{teacher.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{teacher.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Joined {teacher.joinDate}</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Subjects:</p>
              <div className="flex flex-wrap gap-1">
                {subjects.map((subject, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4 text-center">
              <div>
                <p className="text-lg font-bold text-primary-600">{teacher.students}</p>
                <p className="text-xs text-gray-500">Students</p>
              </div>
              <div>
                <p className="text-lg font-bold text-purple-600">{teacher.modules}</p>
                <p className="text-xs text-gray-500">Modules</p>
              </div>
              <div>
                <p className="text-lg font-bold text-yellow-600">{teacher.rating}</p>
                <p className="text-xs text-gray-500">Rating</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => handleViewDetails(teacher)}
                className="flex-1 btn-secondary text-sm flex items-center justify-center gap-1"
              >
                <Eye className="w-4 h-4" />
                View
              </button>
              <button className="flex-1 btn-primary text-sm flex items-center justify-center gap-1">
                <Edit3 className="w-4 h-4" />
                Edit
              </button>
              <button 
                onClick={() => handleDeleteTeacher(teacher.id)}
                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
        })}
      </div>
      )}

      {/* Teacher Details Modal */}
      {showDetailsModal && selectedTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Teacher Details</h2>
                <p className="text-purple-100 text-sm">Complete account information</p>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Profile Section */}
              <div className="flex items-center gap-4 pb-6 border-b">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {selectedTeacher.firstName?.[0] || 'T'}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {selectedTeacher.firstName} {selectedTeacher.lastName}
                  </h3>
                  <p className="text-gray-600">{selectedTeacher.email}</p>
                  <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTeacher.status || 'active')}`}>
                    {selectedTeacher.status || 'active'}
                  </span>
                </div>
              </div>

              {/* Credentials Section */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Account Credentials</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-600">Email</span>
                    </div>
                    <p className="text-gray-800 font-mono">{selectedTeacher.email}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-600">Phone</span>
                    </div>
                    <p className="text-gray-800 font-mono">{selectedTeacher.phone || 'Not provided'}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl md:col-span-2">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-600">Subject</span>
                    </div>
                    <p className="text-gray-800">{selectedTeacher.teacherProfile?.subject || 'Not specified'}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl md:col-span-2">
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-600">Institution</span>
                    </div>
                    <p className="text-gray-800">{selectedTeacher.teacherProfile?.institution || 'Not provided'}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-600">Account Created</span>
                    </div>
                    <p className="text-gray-800">{new Date(selectedTeacher.createdAt).toLocaleString()}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-600">Last Login</span>
                    </div>
                    <p className="text-gray-800">{selectedTeacher.lastLogin ? new Date(selectedTeacher.lastLogin).toLocaleString() : 'Never'}</p>
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              {selectedTeacher.teacherProfile?.bio && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Bio</h4>
                  <p className="text-gray-600 bg-gray-50 p-4 rounded-xl">{selectedTeacher.teacherProfile.bio}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-6 border-t">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
                <button className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors">
                  Edit Teacher
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!loading && filteredTeachers.length === 0 && (
        <div className="text-center py-12">
          <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-500 mb-2">No teachers found</h3>
          <p className="text-gray-400">
            {searchTerm || filterStatus !== 'all' 
              ? "Try adjusting your search or filter criteria." 
              : "Add your first teacher to get started."
            }
          </p>
        </div>
      )}
    </div>
  );
}

export default Teachers;
