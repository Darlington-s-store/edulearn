import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Upload, 
  Download, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Calendar,
  User,
  Paperclip,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useContent } from '../../contexts/ContentContextAPI';

function Assignments() {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [studentAssignments, setStudentAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { getStudentAssignments, submitAssignment } = useContent();

  // Load assignments on mount
  useEffect(() => {
    const loadAssignments = async () => {
      try {
        setLoading(true);
        const data = await getStudentAssignments();
        setStudentAssignments(data || []);
      } catch (error) {
        console.error('Failed to load assignments:', error);
        setStudentAssignments([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadAssignments();
  }, []);

  // Filter assignments by status
  const assignments = {
    pending: studentAssignments.filter(assignment => !assignment.studentSubmission),
    submitted: studentAssignments.filter(assignment => assignment.studentSubmission)
  };

  const subjects = ['all', 'Mathematics', 'Science', 'English', 'History', 'Arts'];

  const tabs = [
    { id: 'pending', label: 'Pending', icon: Clock, count: assignments.pending.length },
    { id: 'submitted', label: 'Submitted', icon: CheckCircle, count: assignments.submitted.length }
  ];

  const handleSubmitAssignment = (assignmentId, submissionText) => {
    if (submissionText.trim()) {
      submitAssignment(assignmentId, user?.id || '', submissionText);
      alert('Assignment submitted successfully!');
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading assignments...</p>
        </div>
      </div>
    );
  }

  const renderEmptyState = (type) => {
    const config = {
      pending: {
        icon: '📝',
        title: 'No Pending Assignments',
        description: 'Great job! You have no assignments due right now.',
        action: 'Check back later for new assignments from your teachers'
      },
      submitted: {
        icon: '📤',
        title: 'No Submitted Assignments',
        description: 'You haven\'t submitted any assignments yet.',
        action: 'Complete and submit your first assignment!'
      }
    };

    const current = config[type];

    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">{current.icon}</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{current.title}</h3>
        <p className="text-gray-600 mb-4">{current.description}</p>
        <p className="text-sm text-gray-500">{current.action}</p>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 font-playful">Assignments</h1>
          <p className="text-gray-600 mt-1">Manage your assignments and track your progress</p>
        </div>
        <button className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Create Assignment
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search assignments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {subjects.map(subject => (
            <option key={subject} value={subject}>
              {subject === 'all' ? 'All Subjects' : subject}
            </option>
          ))}
        </select>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
        {tabs.map(tab => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <IconComponent className="w-5 h-5" />
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span className={`px-2 py-1 rounded-full text-xs ${
                  activeTab === tab.id 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

          {/* Assignment List */}
      <div className="bg-white rounded-2xl shadow-lg">
        {activeTab === 'pending' && (
          <div className="p-6">
            {assignments.pending.length > 0 ? (
              <div className="space-y-4">
                {assignments.pending
                  .filter(assignment => 
                    assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                    (selectedFilter === 'all' || assignment.subject === selectedFilter)
                  )
                  .map(assignment => (
                    <div key={assignment.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">{assignment.title}</h3>
                          <p className="text-gray-600 mb-3">{assignment.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              <span>
                                {assignment.teacher 
                                  ? `${assignment.teacher.firstName} ${assignment.teacher.lastName}`
                                  : 'Teacher'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>Due: {assignment.dueDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{assignment.timeLeft}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-primary-600">{assignment.points} points</p>
                          <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full">
                            {assignment.subject}
                          </span>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4">
                        <textarea
                          placeholder="Write your submission here..."
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent mb-3"
                          rows="4"
                        ></textarea>
                        <button 
                          onClick={() => {
                            const textarea = document.querySelector('textarea');
                            handleSubmitAssignment(assignment.id, textarea.value);
                          }}
                          className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2"
                        >
                          <Upload className="w-4 h-4" />
                          Submit Assignment
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              renderEmptyState('pending')
            )}
          </div>
        )}

        {activeTab === 'submitted' && (
          <div className="p-6">
            {assignments.submitted.length > 0 ? (
              <div className="space-y-4">
                {assignments.submitted
                  .filter(assignment => 
                    assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                    (selectedFilter === 'all' || assignment.subject === selectedFilter)
                  )
                  .map(assignment => (
                    <div key={assignment.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">{assignment.title}</h3>
                          <p className="text-gray-600 mb-3">{assignment.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              <span>
                                {assignment.teacher 
                                  ? `${assignment.teacher.firstName} ${assignment.teacher.lastName}`
                                  : 'Teacher'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>Submitted: {new Date(assignment.studentSubmission.submittedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-green-600">Submitted</p>
                          <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                            {assignment.subject}
                          </span>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-sm text-gray-600 mb-2">Your Submission:</p>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p>{assignment.studentSubmission.submission}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              renderEmptyState('submitted')
            )}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{assignments.pending.length}</p>
              <p className="text-blue-100 text-sm">Pending</p>
            </div>
            <Clock className="w-8 h-8 text-white/80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{assignments.submitted.length}</p>
              <p className="text-green-100 text-sm">Submitted</p>
            </div>
            <CheckCircle className="w-8 h-8 text-white/80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">0</p>
              <p className="text-purple-100 text-sm">Average Grade</p>
            </div>
            <FileText className="w-8 h-8 text-white/80" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Assignments;
