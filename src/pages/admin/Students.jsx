import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { 
  Users, 
  Search,
  Filter,
  Edit3,
  Trash2,
  Eye,
  Mail,
  Calendar,
  Trophy,
  BookOpen,
  Clock,
  UserPlus,
  Phone,
  School,
  X
} from 'lucide-react';

function Students() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/users?role=student');
      if (response.data.success) {
        setStudents(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setShowDetailsModal(true);
  };

  const handleDeleteStudent = async (studentId) => {
    if (!confirm('Are you sure you want to delete this student?')) return;
    
    try {
      const response = await api.delete(`/admin/users/${studentId}`);
      if (response.data.success) {
        alert('Student deleted successfully');
        fetchStudents();
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Failed to delete student');
    }
  };

  const mockStudents = [
    {
      id: 1,
      name: 'Emma Johnson',
      email: 'emma.johnson@email.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      age: 14,
      grade: '8th Grade',
      school: 'Accra International School',
      joinDate: '2023-09-01',
      status: 'active',
      points: 1850,
      assignmentsCompleted: 45,
      attendance: 95,
      lastActive: '2 hours ago',
      plan: 'Individual'
    },
    {
      id: 2,
      name: 'Alex Chen',
      email: 'alex.chen@email.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      age: 13,
      grade: '7th Grade',
      school: 'Ghana International School',
      joinDate: '2023-09-15',
      status: 'active',
      points: 1720,
      assignmentsCompleted: 42,
      attendance: 92,
      lastActive: '1 day ago',
      plan: 'Family'
    },
    {
      id: 3,
      name: 'Sarah Williams',
      email: 'sarah.williams@email.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      age: 15,
      grade: '9th Grade',
      school: 'British International School',
      joinDate: '2023-08-20',
      status: 'active',
      points: 1650,
      assignmentsCompleted: 38,
      attendance: 88,
      lastActive: '3 hours ago',
      plan: 'Individual'
    },
    {
      id: 4,
      name: 'Michael Brown',
      email: 'michael.brown@email.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      age: 12,
      grade: '6th Grade',
      school: 'American International School',
      joinDate: '2023-10-01',
      status: 'inactive',
      points: 890,
      assignmentsCompleted: 15,
      attendance: 65,
      lastActive: '1 week ago',
      plan: 'Family'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-mint-100 text-mint-700';
      case 'inactive':
        return 'bg-gray-100 text-gray-700';
      case 'suspended':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'Individual':
        return 'bg-blue-100 text-blue-700';
      case 'Family':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const displayStudents = loading ? mockStudents : students;

  const filteredStudents = displayStudents.filter(student => {
    const name = student.name || `${student.firstName} ${student.lastName}`;
    const email = student.email || '';
    const school = student.school || student.studentProfile?.school || '';
    
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 font-playful">Students Management 👨‍🎓</h1>
            <p className="text-gray-600 mt-2">Manage student accounts and monitor their progress</p>
          </div>
          <button className="btn-primary flex items-center gap-2 mt-4 sm:mt-0">
            <UserPlus className="w-4 h-4" />
            Add Student
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-primary-600">{students.length}</p>
              <p className="text-gray-600 text-sm">Total Students</p>
            </div>
            <Users className="w-8 h-8 text-primary-500" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-mint-600">{students.filter(s => s.status === 'active').length}</p>
              <p className="text-gray-600 text-sm">Active</p>
            </div>
            <Clock className="w-8 h-8 text-mint-500" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-yellow-600">{Math.round(students.reduce((sum, s) => sum + s.points, 0) / students.length)}</p>
              <p className="text-gray-600 text-sm">Avg Points</p>
            </div>
            <Trophy className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-purple-600">{Math.round(students.reduce((sum, s) => sum + s.attendance, 0) / students.length)}%</p>
              <p className="text-gray-600 text-sm">Avg Attendance</p>
            </div>
            <BookOpen className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search students by name, email, or school..."
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
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Students Table */}
      {!loading && (
      <div className="card p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Student</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">School</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Plan</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Points</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Assignments</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Attendance</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Last Active</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => {
                const name = student.name || `${student.firstName} ${student.lastName}`;
                const age = student.age || student.studentProfile?.age || 'N/A';
                const grade = student.grade || student.studentProfile?.grade || 'N/A';
                const school = student.school || student.studentProfile?.school || 'N/A';
                const points = student.points || student.studentProfile?.points || 0;
                const status = student.status || 'active';
                
                return (
                <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {name[0]}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{name}</p>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-600">{school}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-600">{age} yrs • Grade {grade}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-primary-600">{points}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-700">{student.assignmentsCompleted || 0}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-700">{student.attendance || 0}%</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                      {status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-500">{new Date(student.createdAt).toLocaleDateString()}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleViewDetails(student)}
                        className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteStudent(student.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
              })}
            </tbody>
          </table>
        </div>
      </div>
      )}

      {/* Student Details Modal */}
      {showDetailsModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Student Details</h2>
                <p className="text-blue-100 text-sm">Complete account information</p>
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
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {selectedStudent.firstName?.[0] || 'S'}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {selectedStudent.firstName} {selectedStudent.lastName}
                  </h3>
                  <p className="text-gray-600">{selectedStudent.email}</p>
                  <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedStudent.status || 'active')}`}>
                    {selectedStudent.status || 'active'}
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
                    <p className="text-gray-800 font-mono">{selectedStudent.email}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-600">Phone</span>
                    </div>
                    <p className="text-gray-800 font-mono">{selectedStudent.phone || 'Not provided'}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-600">Age</span>
                    </div>
                    <p className="text-gray-800">{selectedStudent.studentProfile?.age || 'N/A'} years</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-600">Grade Level</span>
                    </div>
                    <p className="text-gray-800">Grade {selectedStudent.studentProfile?.grade || 'N/A'}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl md:col-span-2">
                    <div className="flex items-center gap-2 mb-2">
                      <School className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-600">School</span>
                    </div>
                    <p className="text-gray-800">{selectedStudent.studentProfile?.school || 'Not provided'}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-600">Account Created</span>
                    </div>
                    <p className="text-gray-800">{new Date(selectedStudent.createdAt).toLocaleString()}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-600">Last Login</span>
                    </div>
                    <p className="text-gray-800">{selectedStudent.lastLogin ? new Date(selectedStudent.lastLogin).toLocaleString() : 'Never'}</p>
                  </div>
                </div>
              </div>

              {/* Performance Section */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Performance Metrics</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <Trophy className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-600">{selectedStudent.studentProfile?.points || 0}</p>
                    <p className="text-sm text-gray-600">Points</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-600">{selectedStudent.assignmentsCompleted || 0}</p>
                    <p className="text-sm text-gray-600">Assignments</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-purple-600">{selectedStudent.attendance || 0}%</p>
                    <p className="text-sm text-gray-600">Attendance</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-6 border-t">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
                <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                  Edit Student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!loading && filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-500 mb-2">No students found</h3>
          <p className="text-gray-400">
            {searchTerm || filterStatus !== 'all' 
              ? "Try adjusting your search or filter criteria." 
              : "Add your first student to get started."
            }
          </p>
        </div>
      )}
    </div>
  );
}

const getPlanColor = (plan) => {
  switch (plan) {
    case 'Individual':
      return 'bg-blue-100 text-blue-700';
    case 'Family':
      return 'bg-purple-100 text-purple-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-700';
    case 'inactive':
      return 'bg-gray-100 text-gray-700';
    case 'suspended':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default Students;
