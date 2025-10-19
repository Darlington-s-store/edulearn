import React, { useState } from 'react';
import { FileText, Video, BookOpen, Plus, X, Calendar, Clock, Users } from 'lucide-react';
import { useContent } from '../../contexts/ContentContextAPI';

function PublishContent() {
  const [activeTab, setActiveTab] = useState('assignment');
  const [showForm, setShowForm] = useState(false);
  
  const { publishAssignment, publishQuiz, publishLiveClass, publishModule } = useContent();

  const [assignmentForm, setAssignmentForm] = useState({
    title: '',
    description: '',
    subject: 'Mathematics',
    teacher: 'Mrs. Johnson',
    dueDate: '',
    dueTime: '',
    points: 50
  });

  const [quizForm, setQuizForm] = useState({
    title: '',
    description: '',
    subject: 'Mathematics',
    teacher: 'Mrs. Johnson',
    timeLimit: 30,
    questions: [
      { question: '', options: ['', '', '', ''], correctAnswer: 0 }
    ]
  });

  const [liveClassForm, setLiveClassForm] = useState({
    title: '',
    description: '',
    subject: 'Mathematics',
    teacher: 'Mrs. Johnson',
    scheduledDate: '',
    scheduledTime: '',
    duration: 60
  });

  const [moduleForm, setModuleForm] = useState({
    title: '',
    description: '',
    subject: 'Mathematics',
    teacher: 'Mrs. Johnson',
    duration: '4 weeks',
    lessons: 8
  });

  const tabs = [
    { id: 'assignment', label: 'Assignment', icon: FileText },
    { id: 'quiz', label: 'Quiz', icon: BookOpen },
    { id: 'liveClass', label: 'Live Class', icon: Video },
    { id: 'module', label: 'Course Module', icon: BookOpen }
  ];

  const subjects = ['Mathematics', 'Science', 'English', 'History', 'Arts'];

  const handlePublishAssignment = () => {
    if (assignmentForm.title && assignmentForm.description && assignmentForm.dueDate) {
      const timeLeft = calculateTimeLeft(assignmentForm.dueDate);
      publishAssignment({
        ...assignmentForm,
        timeLeft,
        dueDate: assignmentForm.dueDate,
        dueTime: assignmentForm.dueTime || '11:59 PM'
      });
      alert('Assignment published successfully!');
      setShowForm(false);
      setAssignmentForm({
        title: '',
        description: '',
        subject: 'Mathematics',
        teacher: 'Mrs. Johnson',
        dueDate: '',
        dueTime: '',
        points: 50
      });
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handlePublishQuiz = () => {
    if (quizForm.title && quizForm.description && quizForm.questions.length > 0) {
      publishQuiz({
        ...quizForm,
        questions: quizForm.questions.filter(q => q.question.trim())
      });
      alert('Quiz published successfully!');
      setShowForm(false);
      setQuizForm({
        title: '',
        description: '',
        subject: 'Mathematics',
        teacher: 'Mrs. Johnson',
        timeLimit: 30,
        questions: [
          { question: '', options: ['', '', '', ''], correctAnswer: 0 }
        ]
      });
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handlePublishLiveClass = () => {
    if (liveClassForm.title && liveClassForm.description && liveClassForm.scheduledDate) {
      publishLiveClass({
        ...liveClassForm,
        scheduledDate: liveClassForm.scheduledDate,
        scheduledTime: liveClassForm.scheduledTime || '2:00 PM'
      });
      alert('Live class published successfully!');
      setShowForm(false);
      setLiveClassForm({
        title: '',
        description: '',
        subject: 'Mathematics',
        teacher: 'Mrs. Johnson',
        scheduledDate: '',
        scheduledTime: '',
        duration: 60
      });
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handlePublishModule = () => {
    if (moduleForm.title && moduleForm.description) {
      publishModule({
        ...moduleForm,
        duration: moduleForm.duration,
        lessons: moduleForm.lessons
      });
      alert('Course module published successfully!');
      setShowForm(false);
      setModuleForm({
        title: '',
        description: '',
        subject: 'Mathematics',
        teacher: 'Mrs. Johnson',
        duration: '4 weeks',
        lessons: 8
      });
    } else {
      alert('Please fill in all required fields');
    }
  };

  const calculateTimeLeft = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return 'Overdue';
    if (diffDays === 1) return '1 day';
    return `${diffDays} days`;
  };

  const addQuizQuestion = () => {
    setQuizForm(prev => ({
      ...prev,
      questions: [...prev.questions, { question: '', options: ['', '', '', ''], correctAnswer: 0 }]
    }));
  };

  const removeQuizQuestion = (index) => {
    setQuizForm(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  const updateQuizQuestion = (index, field, value) => {
    setQuizForm(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === index ? { ...q, [field]: value } : q
      )
    }));
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'assignment':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Title</label>
              <input
                type="text"
                value={assignmentForm.title}
                onChange={(e) => setAssignmentForm(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter assignment title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={assignmentForm.description}
                onChange={(e) => setAssignmentForm(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows="4"
                placeholder="Enter assignment description"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select
                  value={assignmentForm.subject}
                  onChange={(e) => setAssignmentForm(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                <input
                  type="date"
                  value={assignmentForm.dueDate}
                  onChange={(e) => setAssignmentForm(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Points</label>
                <input
                  type="number"
                  value={assignmentForm.points}
                  onChange={(e) => setAssignmentForm(prev => ({ ...prev, points: parseInt(e.target.value) }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  min="1"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={handlePublishAssignment}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Publish Assignment
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        );

      case 'quiz':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quiz Title</label>
                <input
                  type="text"
                  value={quizForm.title}
                  onChange={(e) => setQuizForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter quiz title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select
                  value={quizForm.subject}
                  onChange={(e) => setQuizForm(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={quizForm.description}
                onChange={(e) => setQuizForm(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows="3"
                placeholder="Enter quiz description"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Limit (minutes)</label>
              <input
                type="number"
                value={quizForm.timeLimit}
                onChange={(e) => setQuizForm(prev => ({ ...prev, timeLimit: parseInt(e.target.value) }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                min="1"
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Questions</h3>
                <button
                  onClick={addQuizQuestion}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Question
                </button>
              </div>
              
              {quizForm.questions.map((question, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-800">Question {index + 1}</h4>
                    {quizForm.questions.length > 1 && (
                      <button
                        onClick={() => removeQuizQuestion(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  
                  <input
                    type="text"
                    value={question.question}
                    onChange={(e) => updateQuizQuestion(index, 'question', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter question"
                  />
                  
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {question.options.map((option, optionIndex) => (
                      <input
                        key={optionIndex}
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...question.options];
                          newOptions[optionIndex] = e.target.value;
                          updateQuizQuestion(index, 'options', newOptions);
                        }}
                        className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder={`Option ${optionIndex + 1}`}
                      />
                    ))}
                  </div>
                  
                  <select
                    value={question.correctAnswer}
                    onChange={(e) => updateQuizQuestion(index, 'correctAnswer', parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {question.options.map((_, optionIndex) => (
                      <option key={optionIndex} value={optionIndex}>
                        Correct Answer: Option {optionIndex + 1}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={handlePublishQuiz}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Publish Quiz
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        );

      case 'liveClass':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Class Title</label>
                <input
                  type="text"
                  value={liveClassForm.title}
                  onChange={(e) => setLiveClassForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter class title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select
                  value={liveClassForm.subject}
                  onChange={(e) => setLiveClassForm(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={liveClassForm.description}
                onChange={(e) => setLiveClassForm(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows="3"
                placeholder="Enter class description"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Date</label>
                <input
                  type="date"
                  value={liveClassForm.scheduledDate}
                  onChange={(e) => setLiveClassForm(prev => ({ ...prev, scheduledDate: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Time</label>
                <input
                  type="time"
                  value={liveClassForm.scheduledTime}
                  onChange={(e) => setLiveClassForm(prev => ({ ...prev, scheduledTime: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  value={liveClassForm.duration}
                  onChange={(e) => setLiveClassForm(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  min="1"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={handlePublishLiveClass}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Publish Live Class
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        );

      case 'module':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Module Title</label>
                <input
                  type="text"
                  value={moduleForm.title}
                  onChange={(e) => setModuleForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter module title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select
                  value={moduleForm.subject}
                  onChange={(e) => setModuleForm(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={moduleForm.description}
                onChange={(e) => setModuleForm(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows="4"
                placeholder="Enter module description"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <input
                  type="text"
                  value={moduleForm.duration}
                  onChange={(e) => setModuleForm(prev => ({ ...prev, duration: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., 4 weeks"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Lessons</label>
                <input
                  type="number"
                  value={moduleForm.lessons}
                  onChange={(e) => setModuleForm(prev => ({ ...prev, lessons: parseInt(e.target.value) }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  min="1"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={handlePublishModule}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Publish Module
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 font-playful">Publish Content</h1>
          <p className="text-gray-600 mt-1">Create and publish assignments, quizzes, live classes, and course modules</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create New
        </button>
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
            </button>
          );
        })}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Create {tabs.find(t => t.id === activeTab)?.label}</h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          {renderForm()}
        </div>
      )}

      {/* Published Content Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
          <FileText className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-800">0</h3>
          <p className="text-gray-600">Assignments Published</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
          <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-800">0</h3>
          <p className="text-gray-600">Quizzes Published</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
          <Video className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-800">0</h3>
          <p className="text-gray-600">Live Classes</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
          <BookOpen className="w-8 h-8 text-orange-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-800">0</h3>
          <p className="text-gray-600">Course Modules</p>
        </div>
      </div>
    </div>
  );
}

export default PublishContent;
