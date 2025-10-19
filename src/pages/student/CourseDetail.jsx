import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, Play, CheckCircle, Lock, Clock, Award, ArrowLeft, FileText, Plus } from 'lucide-react';
import { useContent } from '../../contexts/ContentContextAPI';

function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { getStudentModules, enrollInModule } = useContent();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);
        const modules = await getStudentModules();
        const foundCourse = modules.find(m => m.id === courseId);
        setCourse(foundCourse);
        
        // Auto-select first lesson
        if (foundCourse?.content?.lessons?.length > 0) {
          setSelectedLesson(foundCourse.content.lessons[0]);
        }
      } catch (error) {
        console.error('Failed to load course:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseId]);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Course Not Found</h2>
          <p className="text-gray-600 mb-6">This course doesn't exist or you don't have access to it.</p>
          <button 
            onClick={() => navigate('/student/courses')}
            className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const lessons = course.content?.lessons || [];
  const completedLessons = 0; // TODO: Track from backend
  const progress = lessons.length > 0 ? (completedLessons / lessons.length) * 100 : 0;
  const isEnrolled = course.isEnrolled;

  const handleEnroll = async () => {
    try {
      setEnrolling(true);
      await enrollInModule(course.id);
      // Reload course data
      const modules = await getStudentModules();
      const updatedCourse = modules.find(m => m.id === courseId);
      setCourse(updatedCourse);
      alert('Successfully enrolled! 🎉 You can now start learning.');
    } catch (error) {
      console.error('Enrollment failed:', error);
      alert('Failed to enroll. Please try again.');
    } finally {
      setEnrolling(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/student/courses')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-800">{course.title}</h1>
                <p className="text-sm text-gray-500">{course.subject} • {course.gradeLevel}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {!isEnrolled ? (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="bg-gradient-to-r from-primary-600 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-primary-700 hover:to-purple-700 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <Plus className="w-5 h-5" />
                  {enrolling ? 'Enrolling...' : 'Enroll Now'}
                </button>
              ) : (
                <div className="text-right">
                  <p className="text-sm text-gray-500">Progress</p>
                  <p className="text-lg font-bold text-primary-600">{Math.round(progress)}%</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar - Course Content */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-24">
              <div className="bg-gradient-to-r from-primary-600 to-purple-600 p-6 text-white">
                <h2 className="text-lg font-bold mb-2">Course Content</h2>
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen className="w-4 h-4" />
                  <span>{lessons.length} Lessons</span>
                </div>
              </div>
              
              <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                {lessons.length > 0 ? (
                  lessons.map((lesson, index) => (
                    <button
                      key={lesson.id || index}
                      onClick={() => isEnrolled && setSelectedLesson(lesson)}
                      disabled={!isEnrolled}
                      className={`w-full p-4 border-b border-gray-100 transition-colors text-left ${
                        isEnrolled ? 'hover:bg-gray-50 cursor-pointer' : 'opacity-60 cursor-not-allowed'
                      } ${
                        selectedLesson?.id === lesson.id ? 'bg-primary-50 border-l-4 border-l-primary-600' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          completedLessons > index ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          {!isEnrolled ? (
                            <Lock className="w-4 h-4 text-gray-400" />
                          ) : completedLessons > index ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <span className="text-sm font-semibold text-gray-600">{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 text-sm mb-1 truncate">
                            {lesson.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{lesson.duration || 30} min</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No lessons available yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {!isEnrolled ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lock className="w-10 h-10 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">Enroll to Start Learning</h2>
                  <p className="text-gray-600 mb-6">
                    This course contains {lessons.length} lesson{lessons.length !== 1 ? 's' : ''} that will help you master {course.subject}. 
                    Enroll now to get full access to all course materials and start your learning journey!
                  </p>
                  <div className="bg-blue-50 rounded-xl p-4 mb-6">
                    <h3 className="font-semibold text-gray-800 mb-2">What you'll get:</h3>
                    <ul className="text-left text-sm text-gray-700 space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span>Access to all {lessons.length} lessons</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span>Video tutorials and practice exercises</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span>Progress tracking and certificates</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span>Lifetime access to course materials</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="w-full bg-gradient-to-r from-primary-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-primary-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Plus className="w-5 h-5" />
                    {enrolling ? 'Enrolling...' : 'Enroll in This Course'}
                  </button>
                </div>
              </div>
            ) : selectedLesson ? (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Lesson Header */}
                <div className="bg-gradient-to-r from-primary-50 to-purple-50 p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedLesson.title}</h2>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{selectedLesson.duration || 30} minutes</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span>Lesson {lessons.findIndex(l => l.id === selectedLesson.id) + 1} of {lessons.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lesson Content */}
                <div className="p-8">
                  <div className="prose max-w-none">
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Lesson Overview</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {selectedLesson.content || 'Lesson content will be displayed here. This includes text, images, videos, and interactive elements to help you learn effectively.'}
                      </p>
                    </div>

                    {/* Video Placeholder */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Video Lesson</h3>
                      <div className="bg-gray-900 rounded-xl aspect-video flex items-center justify-center">
                        <div className="text-center text-white">
                          <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p className="text-sm opacity-75">Video content coming soon</p>
                        </div>
                      </div>
                    </div>

                    {/* Key Points */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Points</h3>
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <span>Understand the core concepts of this lesson</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <span>Practice with examples and exercises</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <span>Apply what you've learned to real-world scenarios</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Practice Section */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Practice Exercise</h3>
                      <div className="bg-purple-50 rounded-xl p-6">
                        <p className="text-gray-700 mb-4">
                          Try solving this problem to test your understanding:
                        </p>
                        <div className="bg-white rounded-lg p-4 border border-purple-200">
                          <p className="text-gray-800 font-medium mb-4">
                            Example Problem: {selectedLesson.title}
                          </p>
                          <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                            Show Solution
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <button
                      onClick={() => {
                        const currentIndex = lessons.findIndex(l => l.id === selectedLesson.id);
                        if (currentIndex > 0) {
                          setSelectedLesson(lessons[currentIndex - 1]);
                        }
                      }}
                      disabled={lessons.findIndex(l => l.id === selectedLesson.id) === 0}
                      className="px-6 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous Lesson
                    </button>
                    <button
                      onClick={() => {
                        const currentIndex = lessons.findIndex(l => l.id === selectedLesson.id);
                        if (currentIndex < lessons.length - 1) {
                          setSelectedLesson(lessons[currentIndex + 1]);
                        }
                      }}
                      disabled={lessons.findIndex(l => l.id === selectedLesson.id) === lessons.length - 1}
                      className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      Next Lesson
                      <Play className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Select a Lesson</h3>
                <p className="text-gray-600">Choose a lesson from the sidebar to start learning</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
