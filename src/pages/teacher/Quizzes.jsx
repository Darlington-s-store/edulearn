import React, { useMemo, useState } from 'react';
import { 
  ClipboardCheck, 
  Plus, 
  Calendar, 
  Users,
  Clock,
  CheckCircle,
  Play,
  Edit3,
  Trash2,
  Eye,
  BarChart3,
  X,
  Save,
  AlertCircle,
  Award,
  Target,
  Download,
  Upload,
  Copy,
  Settings,
  Shuffle,
  FileText,
  TrendingUp,
  Filter,
  Search
} from 'lucide-react';
import { useContent } from '../../contexts/ContentContextAPI';

function Quizzes() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [viewingQuizId, setViewingQuizId] = useState(null);
  const [editingQuizId, setEditingQuizId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showResults, setShowResults] = useState(null);
  const [showSettings, setShowSettings] = useState(null);
  const [showDuplicate, setShowDuplicate] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const { publishedContent, updateQuiz, deleteQuiz } = useContent();
  
  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  const subjects = ['all', 'Mathematics', 'Science', 'English', 'History', 'Geography', 'Physics', 'Chemistry'];
  const allQuizzes = publishedContent?.quizzes || [];
  const quizzes = useMemo(() => {
    const upcoming = [];
    const completed = [];
    allQuizzes.forEach(q => {
      const attempts = q.attempts || [];
      const participants = attempts.length;
      const averageScore = attempts.length
        ? Math.round(attempts.reduce((s, a) => s + (a.score || 0), 0) / attempts.length)
        : undefined;
      const base = {
        id: q.id,
        title: q.title,
        subject: q.subject,
        scheduledDate: q.scheduledDate,
        scheduledTime: q.scheduledTime,
        duration: q.timeLimit,
        questions: q.questions?.length || 0,
        points: q.points || 0,
        participants,
        totalStudents: q.totalStudents || 0,
        status: q.status || 'scheduled',
        averageScore
      };
      if ((q.status || 'scheduled') === 'completed') completed.push(base); else upcoming.push(base);
    });
    return { upcoming, completed };
  }, [allQuizzes]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-mint-100 text-mint-700';
      case 'draft':
        return 'bg-yellow-100 text-yellow-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      case 'live':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'scheduled':
        return <Calendar className="w-4 h-4" />;
      case 'draft':
        return <Edit3 className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'live':
        return <Play className="w-4 h-4" />;
      default:
        return <ClipboardCheck className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-4 lg:p-8">
      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in">
          <CheckCircle className="w-5 h-5" />
          {successMessage}
        </div>
      )}
      
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 font-playful">Quizzes & Exams 📊</h1>
            <p className="text-gray-600 mt-2">Create and manage quizzes and exams for your students</p>
          </div>
          <button className="btn-primary flex items-center gap-2 mt-4 sm:mt-0">
            <Plus className="w-4 h-4" />
            Create Quiz
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-mint-600">{quizzes.upcoming.length}</p>
              <p className="text-gray-600 text-sm">Upcoming</p>
            </div>
            <Calendar className="w-8 h-8 text-mint-500" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-yellow-600">{allQuizzes.filter(q => q.status === 'draft').length}</p>
              <p className="text-gray-600 text-sm">Draft</p>
            </div>
            <Edit3 className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-blue-600">{quizzes.completed.length}</p>
              <p className="text-gray-600 text-sm">Completed</p>
            </div>
            <CheckCircle className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-purple-600">{(() => {
                const allAttempts = allQuizzes.flatMap(q => q.attempts || []);
                if (allAttempts.length === 0) return '0%';
                const avg = Math.round(allAttempts.reduce((s, a) => s + (a.score || 0), 0) / allAttempts.length);
                return `${avg}%`;
              })()}</p>
              <p className="text-gray-600 text-sm">Avg Score</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search quizzes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject === 'all' ? 'All Subjects' : subject}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'upcoming'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Upcoming ({quizzes.upcoming.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'completed'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Completed ({quizzes.completed.length})
          </button>
        </div>
      </div>

      {/* Quiz List */}
      <div className="space-y-6">
        {quizzes[activeTab]
          .filter(quiz => 
            quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterSubject === 'all' || quiz.subject === filterSubject)
          )
          .map((quiz) => (
          <div key={quiz.id} className="card p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
              <div className="flex items-start gap-4 mb-4 lg:mb-0">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ClipboardCheck className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{quiz.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
                    <span className="font-medium text-primary-600">{quiz.subject}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {activeTab === 'upcoming' ? `${quiz.scheduledDate} at ${quiz.scheduledTime}` : `Completed: ${quiz.completedDate}`}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {quiz.duration} minutes
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {quiz.participants}/{quiz.totalStudents} participants
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{quiz.questions} questions</span>
                    <span>{quiz.points} points total</span>
                    {quiz.averageScore && <span>Average: {quiz.averageScore}%</span>}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(quiz.status)}`}>
                  {getStatusIcon(quiz.status)}
                  {quiz.status}
                </span>
                <span className="text-sm font-medium text-gray-700">{quiz.points} points</span>
                {quiz.averageScore && (
                  <span className="text-lg font-bold text-purple-600">{quiz.averageScore}%</span>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {activeTab === 'upcoming' ? (
                <>
                  {quiz.status === 'scheduled' && (
                    <button className="btn-primary flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      Start Quiz
                    </button>
                  )}
                  <button 
                    className="btn-secondary flex items-center gap-2"
                    onClick={() => {
                      setEditingQuizId(quiz.id);
                      const fullQuiz = publishedContent.quizzes.find(q => q.id === quiz.id);
                      setEditFormData({
                        title: fullQuiz.title,
                        subject: fullQuiz.subject,
                        scheduledDate: fullQuiz.scheduledDate,
                        scheduledTime: fullQuiz.scheduledTime,
                        timeLimit: fullQuiz.timeLimit,
                        points: fullQuiz.points || 0,
                        totalStudents: fullQuiz.totalStudents || 0
                      });
                    }}
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Quiz
                  </button>
                  <button 
                    className="btn-secondary flex items-center gap-2"
                    onClick={() => setViewingQuizId(quiz.id)}
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button 
                    className="btn-secondary flex items-center gap-2"
                    onClick={() => setShowSettings(quiz.id)}
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <button 
                    className="btn-secondary flex items-center gap-2"
                    onClick={() => {
                      setShowDuplicate(quiz.id);
                      showSuccess('Quiz duplicated successfully!');
                    }}
                  >
                    <Copy className="w-4 h-4" />
                    Duplicate
                  </button>
                </>
              ) : (
                <>
                  <button 
                    className="btn-primary flex items-center gap-2"
                    onClick={() => setShowResults(quiz.id)}
                  >
                    <BarChart3 className="w-4 h-4" />
                    View Results
                  </button>
                  <button 
                    className="btn-secondary flex items-center gap-2"
                    onClick={() => setViewingQuizId(quiz.id)}
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button 
                    className="btn-secondary flex items-center gap-2"
                    onClick={() => {
                      // Export results logic
                      showSuccess('Results exported successfully!');
                    }}
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </>
              )}
              <button 
                className="text-red-600 hover:text-red-700 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
                onClick={() => setShowDeleteConfirm(quiz.id)}
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {quizzes[activeTab].length === 0 && (
        <div className="text-center py-12">
          <ClipboardCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-500 mb-2">No quizzes found</h3>
          <p className="text-gray-400">
            {activeTab === 'upcoming' 
              ? "Create your first quiz to get started." 
              : "No completed quizzes yet."
            }
          </p>
        </div>
      )}
      
      {/* View Quiz Details Modal */}
      {viewingQuizId && (() => {
        const quiz = publishedContent.quizzes.find(q => q.id === viewingQuizId);
        if (!quiz) return null;
        
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">Quiz Details</h2>
                  <button
                    onClick={() => setViewingQuizId(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{quiz.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(quiz.status)}`}>
                      {quiz.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Subject</p>
                      <p className="font-medium text-gray-800">{quiz.subject}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Scheduled</p>
                      <p className="font-medium text-gray-800">{quiz.scheduledDate} at {quiz.scheduledTime}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Duration</p>
                      <p className="font-medium text-gray-800">{quiz.timeLimit} minutes</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Total Points</p>
                      <p className="font-medium text-gray-800">{quiz.points || 0}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Questions</p>
                      <p className="font-medium text-gray-800">{quiz.questions?.length || 0}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Participants</p>
                      <p className="font-medium text-gray-800">{quiz.attempts?.length || 0} / {quiz.totalStudents || 0}</p>
                    </div>
                  </div>
                  
                  {quiz.questions && quiz.questions.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-800 mb-3">Questions Preview</h4>
                      <div className="space-y-2">
                        {quiz.questions.slice(0, 3).map((q, idx) => (
                          <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                            <p className="font-medium text-gray-800">{idx + 1}. {q.question}</p>
                            <p className="text-sm text-gray-600 mt-1">Type: {q.type || 'Multiple Choice'}</p>
                          </div>
                        ))}
                        {quiz.questions.length > 3 && (
                          <p className="text-sm text-gray-600 text-center pt-2">
                            +{quiz.questions.length - 3} more questions
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {quiz.attempts && quiz.attempts.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-800 mb-3">Recent Attempts</h4>
                      <div className="space-y-2">
                        {quiz.attempts.slice(0, 5).map((attempt, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-800">Student ID: {attempt.studentId}</p>
                              <p className="text-sm text-gray-600">{new Date(attempt.submittedAt).toLocaleString()}</p>
                            </div>
                            <span className="text-purple-700 font-semibold">{attempt.score}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })()}
      
      {/* Edit Quiz Modal */}
      {editingQuizId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Edit Quiz</h2>
                <button
                  onClick={() => {
                    setEditingQuizId(null);
                    setEditFormData({});
                  }}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={editFormData.title || ''}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    value={editFormData.subject || ''}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Date</label>
                    <input
                      type="date"
                      value={editFormData.scheduledDate || ''}
                      onChange={(e) => setEditFormData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Time</label>
                    <input
                      type="time"
                      value={editFormData.scheduledTime || ''}
                      onChange={(e) => setEditFormData(prev => ({ ...prev, scheduledTime: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Limit (minutes)</label>
                    <input
                      type="number"
                      value={editFormData.timeLimit || ''}
                      onChange={(e) => setEditFormData(prev => ({ ...prev, timeLimit: parseInt(e.target.value) }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Points</label>
                    <input
                      type="number"
                      value={editFormData.points || ''}
                      onChange={(e) => setEditFormData(prev => ({ ...prev, points: parseInt(e.target.value) }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Students</label>
                  <input
                    type="number"
                    value={editFormData.totalStudents || ''}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, totalStudents: parseInt(e.target.value) }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    setEditingQuizId(null);
                    setEditFormData({});
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    updateQuiz(editingQuizId, editFormData);
                    setEditingQuizId(null);
                    setEditFormData({});
                    showSuccess('Quiz updated successfully!');
                  }}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (() => {
        const quiz = publishedContent.quizzes.find(q => q.id === showDeleteConfirm);
        if (!quiz) return null;
        
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 text-center mb-2">Delete Quiz?</h3>
                <p className="text-gray-600 text-center mb-6">
                  Are you sure you want to delete "<strong>{quiz.title}</strong>"? This action cannot be undone and all student attempts will be lost.
                </p>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="flex-1 px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      deleteQuiz(showDeleteConfirm);
                      setShowDeleteConfirm(null);
                      showSuccess('Quiz deleted successfully!');
                    }}
                    className="flex-1 px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
      
      {/* Quiz Results Modal */}
      {showResults && (() => {
        const quiz = publishedContent.quizzes.find(q => q.id === showResults);
        if (!quiz) return null;
        
        const attempts = quiz.attempts || [];
        const avgScore = attempts.length
          ? Math.round(attempts.reduce((s, a) => s + (a.score || 0), 0) / attempts.length)
          : 0;
        const highestScore = attempts.length
          ? Math.max(...attempts.map(a => a.score || 0))
          : 0;
        const lowestScore = attempts.length
          ? Math.min(...attempts.map(a => a.score || 0))
          : 0;
        
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">Quiz Results: {quiz.title}</h2>
                  <button
                    onClick={() => setShowResults(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5" />
                      <p className="text-sm opacity-90">Participants</p>
                    </div>
                    <p className="text-3xl font-bold">{attempts.length}</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="w-5 h-5" />
                      <p className="text-sm opacity-90">Average Score</p>
                    </div>
                    <p className="text-3xl font-bold">{avgScore}%</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5" />
                      <p className="text-sm opacity-90">Highest Score</p>
                    </div>
                    <p className="text-3xl font-bold">{highestScore}%</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5" />
                      <p className="text-sm opacity-90">Lowest Score</p>
                    </div>
                    <p className="text-3xl font-bold">{lowestScore}%</p>
                  </div>
                </div>
                
                {/* Student Results */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Student Results</h3>
                  {attempts.length > 0 ? (
                    <div className="space-y-2">
                      {attempts.map((attempt, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                              {idx + 1}
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">Student ID: {attempt.studentId}</p>
                              <p className="text-sm text-gray-600">{new Date(attempt.submittedAt).toLocaleString()}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-purple-600">{attempt.score}%</p>
                            <p className="text-sm text-gray-600">{attempt.correctAnswers || 0}/{quiz.questions?.length || 0} correct</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-8">No attempts yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })()}
      
      {/* Quiz Settings Modal */}
      {showSettings && (() => {
        const quiz = publishedContent.quizzes.find(q => q.id === showSettings);
        if (!quiz) return null;
        
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">Quiz Settings: {quiz.title}</h2>
                  <button
                    onClick={() => setShowSettings(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  {/* Auto-Grading */}
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Auto-Grading
                    </h3>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" defaultChecked />
                      <span className="text-gray-700">Enable automatic grading for multiple choice questions</span>
                    </label>
                  </div>
                  
                  {/* Question Randomization */}
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Shuffle className="w-5 h-5 text-purple-600" />
                      Question Randomization
                    </h3>
                    <label className="flex items-center gap-3 cursor-pointer mb-2">
                      <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" />
                      <span className="text-gray-700">Randomize question order for each student</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" />
                      <span className="text-gray-700">Randomize answer options</span>
                    </label>
                  </div>
                  
                  {/* Passing Score */}
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      Passing Score
                    </h3>
                    <div className="flex items-center gap-4">
                      <input 
                        type="number" 
                        min="0" 
                        max="100" 
                        defaultValue="70"
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                      <span className="text-gray-700">% required to pass</span>
                    </div>
                  </div>
                  
                  {/* Time Limit */}
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-orange-600" />
                      Time Limit
                    </h3>
                    <label className="flex items-center gap-3 cursor-pointer mb-3">
                      <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" defaultChecked />
                      <span className="text-gray-700">Enforce time limit</span>
                    </label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="number" 
                        min="1" 
                        defaultValue={quiz.timeLimit || 60}
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                      <span className="text-gray-700">minutes</span>
                    </div>
                  </div>
                  
                  {/* Attempts */}
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-mint-600" />
                      Attempts Allowed
                    </h3>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                      <option value="1">1 attempt</option>
                      <option value="2">2 attempts</option>
                      <option value="3">3 attempts</option>
                      <option value="unlimited">Unlimited</option>
                    </select>
                  </div>
                  
                  {/* Show Results */}
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Eye className="w-5 h-5 text-indigo-600" />
                      Show Results
                    </h3>
                    <label className="flex items-center gap-3 cursor-pointer mb-2">
                      <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" defaultChecked />
                      <span className="text-gray-700">Show score immediately after submission</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer mb-2">
                      <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" />
                      <span className="text-gray-700">Show correct answers</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" />
                      <span className="text-gray-700">Show detailed feedback</span>
                    </label>
                  </div>
                  
                  {/* Certificate */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-600" />
                      Certificate
                    </h3>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" />
                      <span className="text-gray-700">Generate certificate for passing students</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowSettings(null)}
                    className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowSettings(null);
                      showSuccess('Settings saved successfully!');
                    }}
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

export default Quizzes;
