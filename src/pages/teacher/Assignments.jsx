import React, { useMemo, useState, useEffect } from 'react';
import { 
  FileText, 
  Plus, 
  Calendar, 
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Edit3,
  Trash2,
  Eye,
  X,
  Save
} from 'lucide-react';
import { useContent } from '../../contexts/ContentContextAPI';

function Assignments() {
  const [activeTab, setActiveTab] = useState('active');
  const [expandedAssignmentId, setExpandedAssignmentId] = useState(null);
  const [gradeInputs, setGradeInputs] = useState({});
  const [editingAssignmentId, setEditingAssignmentId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [viewingAssignmentId, setViewingAssignmentId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const { publishedContent, loadPublishedContent, gradeAssignment, updateAssignment, deleteAssignment } = useContent();
  
  // Load content when this page opens
  useEffect(() => {
    loadPublishedContent();
  }, []);
  
  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  const allAssignments = publishedContent?.assignments || [];
  const assignments = useMemo(() => {
    const active = [];
    const completed = [];
    allAssignments.forEach(a => {
      const base = {
        id: a.id,
        title: a.title,
        subject: a.subject,
        dueDate: a.dueDate,
        description: a.description,
        points: a.points,
        submissions: a.submissions?.length || 0,
        totalStudents: a.totalStudents || 0,
        averageGrade: (() => {
          const graded = (a.submissions || []).filter(s => typeof s.grade === 'number');
          if (graded.length === 0) return undefined;
          return Math.round(graded.reduce((sum, s) => sum + s.grade, 0) / graded.length);
        })(),
        status: a.status || 'active'
      };
      if ((a.status || 'active') === 'completed') completed.push(base); else active.push(base);
    });
    return { active, completed };
  }, [allAssignments]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-mint-100 text-mint-700';
      case 'draft':
        return 'bg-yellow-100 text-yellow-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <Clock className="w-4 h-4" />;
      case 'draft':
        return <Edit3 className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
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
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 font-playful">Assignments 📝</h1>
            <p className="text-gray-600 mt-2">Create and manage assignments for your students</p>
          </div>
          <a href="/teacher/publish" className="btn-primary flex items-center gap-2 mt-4 sm:mt-0">
            <Plus className="w-4 h-4" />
            Create Assignment
          </a>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-primary-600">{assignments.active.length}</p>
              <p className="text-gray-600 text-sm">Active</p>
            </div>
            <Clock className="w-8 h-8 text-primary-500" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-yellow-600">0</p>
              <p className="text-gray-600 text-sm">Draft</p>
            </div>
            <Edit3 className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-mint-600">{allAssignments.reduce((sum, a) => sum + (a.submissions?.length || 0), 0)}</p>
              <p className="text-gray-600 text-sm">Submissions</p>
            </div>
            <FileText className="w-8 h-8 text-mint-500" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-purple-600">{(() => {
                const graded = allAssignments.flatMap(a => a.submissions || []).filter(s => typeof s.grade === 'number');
                if (graded.length === 0) return '0%';
                const avg = Math.round(graded.reduce((sum, s) => sum + s.grade, 0) / graded.length);
                return `${avg}%`;
              })()}</p>
              <p className="text-gray-600 text-sm">Avg Grade</p>
            </div>
            <CheckCircle className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'active'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Active ({assignments.active.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'completed'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Completed ({assignments.completed.length})
          </button>
        </div>
      </div>

      {/* Assignment List */}
      <div className="space-y-6">
        {assignments[activeTab].map((assignment) => (
          <div key={assignment.id} className="card p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
              <div className="flex items-start gap-4 mb-4 lg:mb-0">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{assignment.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
                    <span className="font-medium text-primary-600">{assignment.subject}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {activeTab === 'active' ? (assignment.dueDate ? `Due: ${assignment.dueDate}` : 'No due date') : 'Completed'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {assignment.submissions}/{assignment.totalStudents || 0} submitted
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{assignment.description}</p>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(assignment.status)}`}>
                  {getStatusIcon(assignment.status)}
                  {assignment.status}
                </span>
                <span className="text-sm font-medium text-gray-700">{assignment.points} points</span>
                {assignment.averageGrade && (
                  <span className="text-lg font-bold text-mint-600">{assignment.averageGrade}%</span>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="btn-primary flex items-center gap-2"
                onClick={() => setViewingAssignmentId(prev => prev === assignment.id ? null : assignment.id)}
              >
                <Eye className="w-4 h-4" />
                {viewingAssignmentId === assignment.id ? 'Hide Details' : 'View Details'}
              </button>
              <button 
                className="btn-secondary flex items-center gap-2"
                onClick={() => {
                  setEditingAssignmentId(assignment.id);
                  const fullAssignment = publishedContent.assignments.find(a => a.id === assignment.id);
                  setEditFormData({
                    title: fullAssignment.title,
                    subject: fullAssignment.subject,
                    description: fullAssignment.description,
                    dueDate: fullAssignment.dueDate,
                    points: fullAssignment.points,
                    totalStudents: fullAssignment.totalStudents || 0
                  });
                }}
              >
                <Edit3 className="w-4 h-4" />
                Edit Assignment
              </button>
              <button 
                className="text-red-600 hover:text-red-700 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
                onClick={() => setShowDeleteConfirm(assignment.id)}
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>

            {viewingAssignmentId === assignment.id && (
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-800">Quick View - Submissions</h4>
                  <button
                    onClick={() => setExpandedAssignmentId(prev => prev === assignment.id ? null : assignment.id)}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    {expandedAssignmentId === assignment.id ? 'Hide Grading' : 'Grade Submissions →'}
                  </button>
                </div>
                {(() => {
                  const full = publishedContent.assignments.find(a => a.id === assignment.id);
                  const subs = full?.submissions || [];
                  if (subs.length === 0) {
                    return <p className="text-sm text-gray-500">No submissions yet.</p>;
                  }
                  return (
                    <div className="space-y-2">
                      {subs.slice(0, 3).map((sub, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <div>
                            <p className="font-medium text-gray-800">Student ID: {sub.studentId}</p>
                            <p className="text-sm text-gray-600">{new Date(sub.submittedAt).toLocaleString()}</p>
                          </div>
                          {typeof sub.grade === 'number' ? (
                            <span className="text-mint-700 font-semibold">{sub.grade}%</span>
                          ) : (
                            <span className="text-yellow-700 text-sm">Not graded</span>
                          )}
                        </div>
                      ))}
                      {subs.length > 3 && (
                        <p className="text-sm text-gray-600 text-center pt-2">
                          +{subs.length - 3} more submissions
                        </p>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}

            {expandedAssignmentId === assignment.id && (
              <div className="mt-6 bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 mb-3">Grade Submissions</h4>
                {(() => {
                  const full = (publishedContent.assignments || []).find(a => a.id === assignment.id);
                  const subs = full?.submissions || [];
                  if (subs.length === 0) {
                    return <p className="text-sm text-gray-500">No submissions yet.</p>;
                  }
                  return (
                    <div className="space-y-3">
                      {subs.map(sub => (
                        <div key={sub.studentId} className="bg-white border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-800">Student: {sub.studentId}</p>
                              <p className="text-sm text-gray-600">Submitted: {new Date(sub.submittedAt).toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                              {typeof sub.grade === 'number' ? (
                                <span className="text-mint-700 font-semibold">Grade: {sub.grade}</span>
                              ) : (
                                <span className="text-yellow-700">Not graded</span>
                              )}
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-gray-700">
                            <span className="font-medium">Answer:</span> {sub.submission}
                          </div>
                          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              placeholder="Grade (0-100)"
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              value={gradeInputs[assignment.id]?.[sub.studentId]?.grade || ''}
                              onChange={(e) => setGradeInputs(prev => ({
                                ...prev,
                                [assignment.id]: {
                                  ...(prev[assignment.id] || {}),
                                  [sub.studentId]: {
                                    ...(prev[assignment.id]?.[sub.studentId] || {}),
                                    grade: e.target.value
                                  }
                                }
                              }))}
                            />
                            <input
                              type="text"
                              placeholder="Feedback (optional)"
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent md:col-span-2"
                              value={gradeInputs[assignment.id]?.[sub.studentId]?.feedback || ''}
                              onChange={(e) => setGradeInputs(prev => ({
                                ...prev,
                                [assignment.id]: {
                                  ...(prev[assignment.id] || {}),
                                  [sub.studentId]: {
                                    ...(prev[assignment.id]?.[sub.studentId] || {}),
                                    feedback: e.target.value
                                  }
                                }
                              }))}
                            />
                          </div>
                          <div className="mt-3">
                            <button
                              className="btn-primary"
                              onClick={() => {
                                const data = gradeInputs[assignment.id]?.[sub.studentId] || {};
                                const gradeVal = Number(data.grade);
                                if (!Number.isNaN(gradeVal)) {
                                  gradeAssignment(assignment.id, sub.studentId, gradeVal, data.feedback || '');
                                }
                              }}
                            >
                              Submit Grade
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        ))}
      </div>

      {assignments[activeTab].length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-500 mb-2">No assignments found</h3>
          <p className="text-gray-400">
            {activeTab === 'active' 
              ? "Create your first assignment to get started." 
              : "No completed assignments yet."
            }
          </p>
        </div>
      )}
      
      {/* View Details Modal */}
      {viewingAssignmentId && (() => {
        const assignment = publishedContent.assignments.find(a => a.id === viewingAssignmentId);
        if (!assignment) return null;
        
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">Assignment Details</h2>
                  <button
                    onClick={() => setViewingAssignmentId(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{assignment.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                      {assignment.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Subject</p>
                      <p className="font-medium text-gray-800">{assignment.subject}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Due Date</p>
                      <p className="font-medium text-gray-800">{assignment.dueDate || 'No due date'}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Points</p>
                      <p className="font-medium text-gray-800">{assignment.points}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Submissions</p>
                      <p className="font-medium text-gray-800">{assignment.submissions?.length || 0} / {assignment.totalStudents || 0}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Description</h4>
                    <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{assignment.description}</p>
                  </div>
                  
                  {assignment.submissions && assignment.submissions.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-800 mb-3">Recent Submissions</h4>
                      <div className="space-y-2">
                        {assignment.submissions.slice(0, 5).map((sub, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-800">Student ID: {sub.studentId}</p>
                              <p className="text-sm text-gray-600">{new Date(sub.submittedAt).toLocaleString()}</p>
                            </div>
                            {typeof sub.grade === 'number' && (
                              <span className="text-mint-700 font-semibold">{sub.grade}%</span>
                            )}
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => {
                          setViewingAssignmentId(null);
                          setExpandedAssignmentId(assignment.id);
                        }}
                        className="mt-3 text-primary-600 hover:text-primary-700 font-medium text-sm"
                      >
                        View all submissions →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })()}
      
      {/* Edit Assignment Modal */}
      {editingAssignmentId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Edit Assignment</h2>
                <button
                  onClick={() => {
                    setEditingAssignmentId(null);
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
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={editFormData.description || ''}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                    <input
                      type="date"
                      value={editFormData.dueDate || ''}
                      onChange={(e) => setEditFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Points</label>
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
                    setEditingAssignmentId(null);
                    setEditFormData({});
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    updateAssignment(editingAssignmentId, editFormData);
                    setEditingAssignmentId(null);
                    setEditFormData({});
                    showSuccess('Assignment updated successfully!');
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
        const assignment = publishedContent.assignments.find(a => a.id === showDeleteConfirm);
        if (!assignment) return null;
        
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 text-center mb-2">Delete Assignment?</h3>
                <p className="text-gray-600 text-center mb-6">
                  Are you sure you want to delete "<strong>{assignment.title}</strong>"? This action cannot be undone and all submissions will be lost.
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
                      deleteAssignment(showDeleteConfirm);
                      setShowDeleteConfirm(null);
                      showSuccess('Assignment deleted successfully!');
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
    </div>
  );
}

export default Assignments;
