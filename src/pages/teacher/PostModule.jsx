import React, { useState } from 'react';
import { 
  BookOpen, 
  Upload, 
  Video, 
  FileText, 
  Plus,
  X,
  Save,
  Eye,
  Calendar,
  Users,
  Clock,
  Target,
  Tag,
  BarChart3,
  Layers,
  CheckCircle,
  AlertCircle,
  Copy,
  Download,
  Settings,
  Zap,
  Award,
  Link as LinkIcon
} from 'lucide-react';
import { useContent } from '../../contexts/ContentContextAPI';

function PostModule() {
  const { publishModule } = useContent();
  const [moduleData, setModuleData] = useState({
    title: '',
    subject: '',
    week: '',
    description: '',
    duration: '',
    materials: [],
    objectives: [],
    prerequisites: [],
    difficulty: 'intermediate',
    tags: [],
    releaseDate: '',
    releaseTime: '',
    enableProgress: true,
    enableCertificate: false,
    passingScore: 70
  });
  
  const [showTemplates, setShowTemplates] = useState(false);
  const [newObjective, setNewObjective] = useState('');
  const [newPrerequisite, setNewPrerequisite] = useState('');
  const [newTag, setNewTag] = useState('');

  const [newMaterial, setNewMaterial] = useState({
    type: 'video',
    title: '',
    file: null,
    duration: '',
    pages: ''
  });

  const subjects = [
    { id: 'math', name: 'Mathematics' },
    { id: 'science', name: 'Science' },
    { id: 'english', name: 'English' },
    { id: 'history', name: 'History' },
    { id: 'art', name: 'Art' }
  ];

  const weeks = Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`);
  
  const templates = [
    {
      id: 'intro',
      name: 'Introduction Module',
      description: 'Perfect for starting a new topic',
      objectives: ['Understand basic concepts', 'Learn key terminology', 'Identify main principles'],
      duration: '30',
      difficulty: 'beginner'
    },
    {
      id: 'advanced',
      name: 'Advanced Concepts',
      description: 'Deep dive into complex topics',
      objectives: ['Master advanced techniques', 'Apply critical thinking', 'Solve complex problems'],
      duration: '60',
      difficulty: 'advanced'
    },
    {
      id: 'practical',
      name: 'Practical Workshop',
      description: 'Hands-on learning experience',
      objectives: ['Practice real-world scenarios', 'Build practical skills', 'Complete projects'],
      duration: '90',
      difficulty: 'intermediate'
    }
  ];
  
  const difficultyLevels = [
    { value: 'beginner', label: 'Beginner', color: 'green' },
    { value: 'intermediate', label: 'Intermediate', color: 'yellow' },
    { value: 'advanced', label: 'Advanced', color: 'red' }
  ];

  const handleInputChange = (e) => {
    setModuleData({
      ...moduleData,
      [e.target.name]: e.target.value
    });
  };

  const handleMaterialChange = (e) => {
    const { name, value, files } = e.target;
    setNewMaterial({
      ...newMaterial,
      [name]: files ? files[0] : value
    });
  };

  const addMaterial = () => {
    if (newMaterial.title) {
      setModuleData({
        ...moduleData,
        materials: [...moduleData.materials, { ...newMaterial, id: Date.now() }]
      });
      setNewMaterial({
        type: 'video',
        title: '',
        file: null,
        duration: '',
        pages: ''
      });
    }
  };

  const removeMaterial = (id) => {
    setModuleData({
      ...moduleData,
      materials: moduleData.materials.filter(material => material.id !== id)
    });
  };
  
  const addObjective = () => {
    if (newObjective.trim()) {
      setModuleData({
        ...moduleData,
        objectives: [...moduleData.objectives, newObjective]
      });
      setNewObjective('');
    }
  };
  
  const removeObjective = (index) => {
    setModuleData({
      ...moduleData,
      objectives: moduleData.objectives.filter((_, i) => i !== index)
    });
  };
  
  const addPrerequisite = () => {
    if (newPrerequisite.trim()) {
      setModuleData({
        ...moduleData,
        prerequisites: [...moduleData.prerequisites, newPrerequisite]
      });
      setNewPrerequisite('');
    }
  };
  
  const removePrerequisite = (index) => {
    setModuleData({
      ...moduleData,
      prerequisites: moduleData.prerequisites.filter((_, i) => i !== index)
    });
  };
  
  const addTag = () => {
    if (newTag.trim() && !moduleData.tags.includes(newTag)) {
      setModuleData({
        ...moduleData,
        tags: [...moduleData.tags, newTag]
      });
      setNewTag('');
    }
  };
  
  const removeTag = (tag) => {
    setModuleData({
      ...moduleData,
      tags: moduleData.tags.filter(t => t !== tag)
    });
  };
  
  const applyTemplate = (template) => {
    setModuleData({
      ...moduleData,
      objectives: template.objectives,
      duration: template.duration,
      difficulty: template.difficulty
    });
    setShowTemplates(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!moduleData.title || !moduleData.subject || !moduleData.description) return;
    publishModule({
      title: moduleData.title,
      subject: moduleData.subject,
      description: moduleData.description,
      duration: moduleData.duration || '45',
      lessons: moduleData.materials.length,
    });
    try { alert('Module published'); } catch (_) {}
    setModuleData({ title: '', subject: '', week: '', description: '', duration: '', materials: [] });
  };

  const getMaterialIcon = (type) => {
    switch (type) {
      case 'video':
        return <Video className="w-5 h-5 text-red-500" />;
      case 'pdf':
        return <FileText className="w-5 h-5 text-blue-500" />;
      default:
        return <BookOpen className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 font-playful">Post New Module 📚</h1>
            <p className="text-gray-600 mt-2">Create engaging learning content for your students</p>
          </div>
          <button
            type="button"
            onClick={() => setShowTemplates(true)}
            className="btn-secondary flex items-center gap-2"
          >
            <Layers className="w-4 h-4" />
            Use Template
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Module Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Module Title</label>
                  <input
                    type="text"
                    name="title"
                    value={moduleData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter module title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select
                    name="subject"
                    value={moduleData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select subject</option>
                    {subjects.map(subject => (
                      <option key={subject.id} value={subject.id}>{subject.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Week</label>
                  <select
                    name="week"
                    value={moduleData.week}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select week</option>
                    {weeks.map(week => (
                      <option key={week} value={week}>{week}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    name="duration"
                    value={moduleData.duration}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="45"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={moduleData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  placeholder="Describe what students will learn in this module..."
                />
              </div>
              
              {/* Difficulty Level */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
                <div className="flex gap-3">
                  {difficultyLevels.map(level => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => setModuleData({...moduleData, difficulty: level.value})}
                      className={`flex-1 px-4 py-3 rounded-xl border-2 font-medium transition-all ${
                        moduleData.difficulty === level.value
                          ? `border-${level.color}-500 bg-${level.color}-50 text-${level.color}-700`
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary-600" />
                Learning Objectives
              </h2>
              
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newObjective}
                  onChange={(e) => setNewObjective(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addObjective())}
                  placeholder="Add a learning objective..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={addObjective}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              
              {moduleData.objectives.length > 0 && (
                <div className="space-y-2">
                  {moduleData.objectives.map((objective, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">{objective}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeObjective(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Prerequisites */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                Prerequisites
              </h2>
              
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newPrerequisite}
                  onChange={(e) => setNewPrerequisite(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPrerequisite())}
                  placeholder="Add a prerequisite..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={addPrerequisite}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              
              {moduleData.prerequisites.length > 0 && (
                <div className="space-y-2">
                  {moduleData.prerequisites.map((prerequisite, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <span className="text-gray-700">{prerequisite}</span>
                      <button
                        type="button"
                        onClick={() => removePrerequisite(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5 text-purple-600" />
                Tags & Categories
              </h2>
              
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Add tags (e.g., algebra, geometry)..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              
              {moduleData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {moduleData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-purple-900"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Schedule Release */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Schedule Release
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Release Date</label>
                  <input
                    type="date"
                    name="releaseDate"
                    value={moduleData.releaseDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Release Time</label>
                  <input
                    type="time"
                    name="releaseTime"
                    value={moduleData.releaseTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Materials Section */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Learning Materials</h2>
              
              {/* Add New Material */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h3 className="font-medium text-gray-800 mb-4">Add New Material</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select
                      name="type"
                      value={newMaterial.type}
                      onChange={handleMaterialChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="video">Video</option>
                      <option value="pdf">PDF Document</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={newMaterial.title}
                      onChange={handleMaterialChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Material title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">File</label>
                    <input
                      type="file"
                      name="file"
                      onChange={handleMaterialChange}
                      accept={newMaterial.type === 'video' ? 'video/*' : '.pdf'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {newMaterial.type === 'video' ? 'Duration (minutes)' : 'Pages'}
                    </label>
                    <input
                      type="number"
                      name={newMaterial.type === 'video' ? 'duration' : 'pages'}
                      value={newMaterial.type === 'video' ? newMaterial.duration : newMaterial.pages}
                      onChange={handleMaterialChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder={newMaterial.type === 'video' ? '15' : '8'}
                    />
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={addMaterial}
                  className="btn-primary flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Material
                </button>
              </div>
              
              {/* Materials List */}
              {moduleData.materials.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-800">Added Materials:</h3>
                  {moduleData.materials.map((material) => (
                    <div key={material.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        {getMaterialIcon(material.type)}
                        <div>
                          <p className="font-medium text-gray-800">{material.title}</p>
                          <p className="text-sm text-gray-500">
                            {material.type === 'video' ? `${material.duration} minutes` : `${material.pages} pages`}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeMaterial(material.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button type="submit" className="btn-primary flex items-center gap-2">
                <Save className="w-4 h-4" />
                Publish Module
              </button>
              <button type="button" className="btn-secondary flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Preview
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publishing Options */}
          <div className="card p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Publishing Options</h3>
            
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                  <span className="text-sm text-gray-700">Publish immediately</span>
                </label>
              </div>
              
              <div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  <span className="text-sm text-gray-700">Send notification to students</span>
                </label>
              </div>
              
              <div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  <span className="text-sm text-gray-700">Allow student comments</span>
                </label>
              </div>
              
              <div>
                <label className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={moduleData.enableProgress}
                    onChange={(e) => setModuleData({...moduleData, enableProgress: e.target.checked})}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" 
                  />
                  <span className="text-sm text-gray-700">Track student progress</span>
                </label>
              </div>
              
              <div>
                <label className="flex items-center gap-2">
                  <input 
                    type="checkbox"
                    checked={moduleData.enableCertificate}
                    onChange={(e) => setModuleData({...moduleData, enableCertificate: e.target.checked})}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" 
                  />
                  <span className="text-sm text-gray-700">Generate certificate</span>
                </label>
              </div>
              
              {moduleData.enableCertificate && (
                <div className="ml-6">
                  <label className="block text-xs text-gray-600 mb-1">Passing Score (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={moduleData.passingScore}
                    onChange={(e) => setModuleData({...moduleData, passingScore: e.target.value})}
                    className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Module Stats */}
          <div className="card p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Quick Stats</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Students</span>
                <span className="font-medium text-gray-800">156</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Modules</span>
                <span className="font-medium text-gray-800">8</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Avg. Completion</span>
                <span className="font-medium text-gray-800">87%</span>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="card p-6 bg-gradient-to-br from-primary-50 to-purple-50">
            <h3 className="font-semibold text-gray-800 mb-4">💡 Tips for Great Modules</h3>
            
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Keep videos under 20 minutes for better engagement</li>
              <li>• Include interactive elements and quizzes</li>
              <li>• Provide clear learning objectives</li>
              <li>• Use high-quality visuals and audio</li>
              <li>• Add downloadable resources</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Template Modal */}
      {showTemplates && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Choose a Template</h2>
                <button
                  onClick={() => setShowTemplates(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className="border-2 border-gray-200 rounded-xl p-6 hover:border-primary-400 hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => applyTemplate(template)}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <Layers className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">{template.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          template.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                          template.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {template.difficulty}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{template.duration} minutes</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p className="font-medium mb-1">Includes:</p>
                        <ul className="space-y-1">
                          {template.objectives.slice(0, 2).map((obj, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-xs">{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <button className="w-full mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
                      Use Template
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Quick Start</p>
                    <p className="text-xs text-blue-700 mt-1">
                      Templates pre-fill learning objectives, duration, and difficulty level. You can customize everything after applying.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostModule;
