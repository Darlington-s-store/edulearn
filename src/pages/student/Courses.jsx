import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Play, Clock, Users, Star, Plus, Search, Filter } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useContent } from '../../contexts/ContentContextAPI';

function Courses() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { getStudentModules, enrollInModule } = useContent();
  
  // Load modules on component mount
  useEffect(() => {
    const loadModules = async () => {
      try {
        setLoading(true);
        const data = await getStudentModules();
        setModules(data || []);
      } catch (error) {
        console.error('Failed to load modules:', error);
        setModules([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadModules();
  }, []);
  
  // Get enrolled courses from published modules
  const enrolledCourses = modules.filter(module => module.isEnrolled);
  
  // Get available courses from published modules
  const availableCourses = modules.filter(module => !module.isEnrolled);

  const handleEnroll = async (moduleId) => {
    try {
      await enrollInModule(moduleId);
      // Reload modules to update enrollment status
      const data = await getStudentModules();
      setModules(data || []);
      alert('Successfully enrolled in the course! 🎉');
    } catch (error) {
      console.error('Enrollment failed:', error);
      alert('Failed to enroll. Please try again.');
    }
  };

  const categories = ['all', 'Mathematics', 'Science', 'Language Arts', 'History', 'Arts'];

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 font-playful">My Courses</h1>
          <p className="text-gray-600 mt-1">Manage your enrolled courses and discover new ones</p>
        </div>
        <button className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Browse Courses
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search courses..."
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
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>

      {/* Enrolled Courses */}
      {enrolledCourses.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">My Enrolled Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map(course => (
              <div key={course.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-100 to-purple-100 rounded-xl mb-4">
                  <BookOpen className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description || 'No description available'}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs px-3 py-1 bg-primary-100 text-primary-700 rounded-full font-medium">
                    {course.subject || 'General'}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration || 60} min</span>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-primary-600 font-semibold">{course.progress || 0}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary-600 to-purple-600 h-2 rounded-full transition-all"
                      style={{ width: `${course.progress || 0}%` }}
                    ></div>
                  </div>
                </div>
                <button 
                  onClick={() => navigate(`/student/courses/${course.id}`)}
                  className="w-full bg-primary-600 text-white py-2 px-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Continue Learning
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Courses Enrolled Yet</h2>
          <p className="text-gray-600 mb-6">Start your learning journey by enrolling in a course below</p>
          <button className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors">
            Browse Available Courses
          </button>
        </div>
      )}

      {/* Available Courses */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Available Courses</h2>
        {availableCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCourses
              .filter(course => 
                course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (selectedFilter === 'all' || course.subject === selectedFilter)
              )
              .map(course => (
              <div key={course.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl mb-4">
                  <BookOpen className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description || 'Explore this course to learn more'}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                    {course.subject || 'General'}
                  </span>
                  <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                    {course.difficulty || 'Beginner'}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration || 60} min</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>{course.gradeLevel || 'All levels'}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">
                    {course.teacher ? `By ${course.teacher.firstName} ${course.teacher.lastName}` : 'Instructor'}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">New</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => navigate(`/student/courses/${course.id}`)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    Preview
                  </button>
                  <button 
                    onClick={() => handleEnroll(course.id)}
                    className="flex-1 bg-gradient-to-r from-primary-600 to-purple-600 text-white py-2 px-4 rounded-xl font-semibold hover:from-primary-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Enroll
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
            <div className="text-6xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Courses Available</h3>
            <p className="text-gray-600">Check back later for new courses!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;
