import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Video, 
  FileText, 
  Download,
  Play,
  Clock,
  CheckCircle,
  Lock,
  Star,
  Eye,
  Calendar
} from 'lucide-react';

function Modules() {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState('all');

  const subjects = [
    { id: 'all', name: 'All Subjects', color: 'primary' },
    { id: 'math', name: 'Mathematics', color: 'blue' },
    { id: 'science', name: 'Science', color: 'mint' },
    { id: 'english', name: 'English', color: 'purple' },
    { id: 'history', name: 'History', color: 'yellow' }
  ];

  const modules = [
    {
      id: 1,
      title: 'Linear Equations and Inequalities',
      subject: 'math',
      subjectName: 'Mathematics',
      week: 'Week 5',
      description: 'Learn to solve linear equations and understand inequalities with real-world applications.',
      duration: '45 minutes',
      videoUrl: 'https://www.youtube.com/watch?v=3L6GG7XiEmQ',
      materials: [
        { type: 'video', title: 'Introduction to Linear Equations', duration: '15 min', url: 'https://www.youtube.com/watch?v=3L6GG7XiEmQ' },
        { type: 'pdf', title: 'Practice Problems Set 1', pages: 8 },
        { type: 'video', title: 'Solving Inequalities', duration: '20 min' },
        { type: 'pdf', title: 'Chapter Summary', pages: 3 }
      ],
      progress: 75,
      completed: false,
      locked: false,
      rating: 4.8,
      views: 156
    },
    {
      id: 2,
      title: 'Chemical Reactions and Equations',
      subject: 'science',
      subjectName: 'Science',
      week: 'Week 4',
      description: 'Explore different types of chemical reactions and learn to balance chemical equations.',
      duration: '60 minutes',
      materials: [
        { type: 'video', title: 'Types of Chemical Reactions', duration: '25 min' },
        { type: 'pdf', title: 'Lab Safety Guidelines', pages: 4 },
        { type: 'video', title: 'Balancing Equations', duration: '20 min' },
        { type: 'pdf', title: 'Practice Exercises', pages: 6 }
      ],
      progress: 100,
      completed: true,
      locked: false,
      rating: 4.9,
      views: 203
    },
    {
      id: 3,
      title: 'Creative Writing Techniques',
      subject: 'english',
      subjectName: 'English',
      week: 'Week 6',
      description: 'Develop your creative writing skills with various techniques and storytelling methods.',
      duration: '50 minutes',
      materials: [
        { type: 'video', title: 'Elements of Storytelling', duration: '18 min' },
        { type: 'pdf', title: 'Writing Prompts Collection', pages: 12 },
        { type: 'video', title: 'Character Development', duration: '22 min' },
        { type: 'pdf', title: 'Sample Stories', pages: 15 }
      ],
      progress: 30,
      completed: false,
      locked: false,
      rating: 4.7,
      views: 89
    },
    {
      id: 4,
      title: 'World War II: Causes and Effects',
      subject: 'history',
      subjectName: 'History',
      week: 'Week 7',
      description: 'Understand the major causes that led to World War II and its lasting effects on the world.',
      duration: '55 minutes',
      materials: [
        { type: 'video', title: 'Pre-war Tensions', duration: '20 min' },
        { type: 'pdf', title: 'Timeline of Events', pages: 6 },
        { type: 'video', title: 'Major Battles', duration: '25 min' },
        { type: 'pdf', title: 'Post-war Consequences', pages: 8 }
      ],
      progress: 0,
      completed: false,
      locked: true,
      rating: 4.6,
      views: 45
    }
  ];

  const filteredModules = selectedSubject === 'all' 
    ? modules 
    : modules.filter(module => module.subject === selectedSubject);

  const getSubjectColor = (subject) => {
    const subjectObj = subjects.find(s => s.id === subject);
    return subjectObj?.color || 'primary';
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return 'bg-mint-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-primary-500';
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'pdf':
        return <FileText className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 font-playful">Learning Modules 📚</h1>
        <p className="text-gray-600 mt-2">Access your course materials and track your progress</p>
      </div>

      {/* Subject Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          {subjects.map((subject) => (
            <button
              key={subject.id}
              onClick={() => setSelectedSubject(subject.id)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                selectedSubject === subject.id
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {subject.name}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-primary-600">3</p>
              <p className="text-gray-600 text-sm">Active Modules</p>
            </div>
            <BookOpen className="w-8 h-8 text-primary-500" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-mint-600">1</p>
              <p className="text-gray-600 text-sm">Completed</p>
            </div>
            <CheckCircle className="w-8 h-8 text-mint-500" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-yellow-600">68%</p>
              <p className="text-gray-600 text-sm">Avg Progress</p>
            </div>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-purple-600">12</p>
              <p className="text-gray-600 text-sm">Hours Studied</p>
            </div>
            <Clock className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredModules.map((module) => (
          <div key={module.id} className={`card p-6 ${module.locked ? 'opacity-60' : ''}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${getSubjectColor(module.subject)}-100 text-${getSubjectColor(module.subject)}-700`}>
                    {module.subjectName}
                  </span>
                  <span className="text-sm text-gray-500">{module.week}</span>
                  {module.locked && <Lock className="w-4 h-4 text-gray-400" />}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{module.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{module.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {module.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {module.views} views
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    {module.rating}
                  </span>
                </div>
              </div>
              
              {module.completed && (
                <CheckCircle className="w-6 h-6 text-mint-500 flex-shrink-0" />
              )}
            </div>

            {/* Progress Bar */}
            {!module.locked && (
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{module.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(module.progress)}`}
                    style={{ width: `${module.progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Materials */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-800 mb-2">Materials:</h4>
              <div className="space-y-2">
                {module.materials.map((material, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        material.type === 'video' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {getTypeIcon(material.type)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{material.title}</p>
                        <p className="text-xs text-gray-500">
                          {material.duration || `${material.pages} pages`}
                        </p>
                      </div>
                    </div>
                    <button 
                      className={`p-2 rounded-lg transition-colors ${
                        module.locked 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
                      }`}
                      disabled={module.locked}
                    >
                      {material.type === 'video' ? <Play className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {module.locked ? (
                <button className="flex-1 bg-gray-100 text-gray-400 py-2 px-4 rounded-lg cursor-not-allowed" disabled>
                  <Lock className="w-4 h-4 inline mr-2" />
                  Locked
                </button>
              ) : module.completed ? (
                <button 
                  className="flex-1 btn-secondary"
                  onClick={() => navigate(`/student/lesson/${module.id}`)}
                >
                  <Eye className="w-4 h-4 inline mr-2" />
                  Review Module
                </button>
              ) : (
                <button 
                  className="flex-1 btn-primary"
                  onClick={() => navigate(`/student/lesson/${module.id}`)}
                >
                  <Play className="w-4 h-4 inline mr-2" />
                  {module.progress > 0 ? 'Continue Learning' : 'Start Module'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredModules.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-500 mb-2">No modules found</h3>
          <p className="text-gray-400">No modules available for the selected subject.</p>
        </div>
      )}
    </div>
  );
}

export default Modules;
