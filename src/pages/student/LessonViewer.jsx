import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Video, 
  FileText, 
  CheckCircle,
  Lock,
  ArrowLeft,
  ArrowRight,
  Play,
  Pause,
  Download,
  ClipboardCheck,
  Award,
  AlertCircle,
  X
} from 'lucide-react';

function LessonViewer() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [contentRead, setContentRead] = useState(false);
  const [pdfViewed, setPdfViewed] = useState(false);
  
  // Mock module data with structured lessons
  const moduleData = {
    id: moduleId,
    title: 'Linear Equations and Inequalities',
    subject: 'Mathematics',
    description: 'Master linear equations and inequalities with comprehensive lessons and practice',
    lessons: [
      {
        id: 1,
        title: 'Introduction to Linear Equations',
        type: 'video',
        duration: '15 min',
        videoUrl: 'https://www.youtube.com/embed/3L6GG7XiEmQ',
        content: `
          <h2>What are Linear Equations?</h2>
          <p>A linear equation is an algebraic equation in which each term is either a constant or the product of a constant and a single variable.</p>
          <h3>Key Concepts:</h3>
          <ul>
            <li>Variables and constants</li>
            <li>Equality and balance</li>
            <li>Solution sets</li>
          </ul>
          <h3>Standard Form:</h3>
          <p>The standard form of a linear equation is: <strong>ax + b = c</strong></p>
          <p>Where 'a', 'b', and 'c' are constants, and 'x' is the variable.</p>
        `,
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 1,
              question: 'What is a linear equation?',
              options: [
                'An equation with variables raised to the power of 2',
                'An equation where each term is a constant or product of constant and single variable',
                'An equation with multiple variables',
                'An equation with no variables'
              ],
              correctAnswer: 1
            },
            {
              id: 2,
              question: 'In the equation 3x + 5 = 11, what is the coefficient of x?',
              options: ['5', '11', '3', '8'],
              correctAnswer: 2
            },
            {
              id: 3,
              question: 'What does solving a linear equation mean?',
              options: [
                'Finding the value of the variable that makes the equation true',
                'Graphing the equation',
                'Multiplying both sides by zero',
                'Adding constants together'
              ],
              correctAnswer: 0
            }
          ]
        }
      },
      {
        id: 2,
        title: 'Solving Linear Equations',
        type: 'content',
        content: `
          <h2>Steps to Solve Linear Equations</h2>
          <h3>Step 1: Simplify Both Sides</h3>
          <p>Remove parentheses and combine like terms on each side of the equation.</p>
          
          <h3>Step 2: Move Variables to One Side</h3>
          <p>Add or subtract terms to get all variables on one side of the equation.</p>
          
          <h3>Step 3: Isolate the Variable</h3>
          <p>Use multiplication or division to get the variable by itself.</p>
          
          <h3>Example:</h3>
          <div style="background: #f3f4f6; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
            <p><strong>Solve: 2x + 6 = 14</strong></p>
            <p>Step 1: Subtract 6 from both sides</p>
            <p>2x + 6 - 6 = 14 - 6</p>
            <p>2x = 8</p>
            <p>Step 2: Divide both sides by 2</p>
            <p>x = 4</p>
          </div>
          
          <h3>Practice Problems:</h3>
          <ol>
            <li>3x + 9 = 24</li>
            <li>5x - 10 = 15</li>
            <li>4x + 8 = 2x + 18</li>
          </ol>
        `,
        pdfUrl: '/resources/linear-equations-practice.pdf',
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 1,
              question: 'Solve: 2x + 4 = 12. What is x?',
              options: ['4', '6', '8', '2'],
              correctAnswer: 0
            },
            {
              id: 2,
              question: 'What is the first step in solving 3x + 9 = 21?',
              options: [
                'Divide by 3',
                'Subtract 9 from both sides',
                'Add 9 to both sides',
                'Multiply by 3'
              ],
              correctAnswer: 1
            },
            {
              id: 3,
              question: 'Solve: 5x - 15 = 10. What is x?',
              options: ['5', '3', '7', '1'],
              correctAnswer: 0
            }
          ]
        }
      },
      {
        id: 3,
        title: 'Introduction to Inequalities',
        type: 'video',
        duration: '12 min',
        videoUrl: 'https://example.com/video2.mp4',
        content: `
          <h2>Understanding Inequalities</h2>
          <p>Inequalities show the relationship between two values when they are not equal.</p>
          
          <h3>Inequality Symbols:</h3>
          <ul>
            <li><strong>&lt;</strong> - Less than</li>
            <li><strong>&gt;</strong> - Greater than</li>
            <li><strong>≤</strong> - Less than or equal to</li>
            <li><strong>≥</strong> - Greater than or equal to</li>
          </ul>
          
          <h3>Key Difference from Equations:</h3>
          <p>When you multiply or divide both sides by a negative number, you must flip the inequality sign!</p>
        `,
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 1,
              question: 'What does the symbol ≥ mean?',
              options: [
                'Less than',
                'Greater than or equal to',
                'Not equal to',
                'Approximately equal to'
              ],
              correctAnswer: 1
            },
            {
              id: 2,
              question: 'When solving inequalities, when must you flip the inequality sign?',
              options: [
                'When adding a number',
                'When subtracting a number',
                'When multiplying or dividing by a negative number',
                'Never'
              ],
              correctAnswer: 2
            },
            {
              id: 3,
              question: 'Which inequality represents "x is at least 5"?',
              options: ['x < 5', 'x > 5', 'x ≤ 5', 'x ≥ 5'],
              correctAnswer: 3
            }
          ]
        }
      },
      {
        id: 4,
        title: 'Solving Inequalities',
        type: 'content',
        content: `
          <h2>Solving Linear Inequalities</h2>
          <p>The process is similar to solving equations, with one important rule!</p>
          
          <h3>Steps:</h3>
          <ol>
            <li>Simplify both sides</li>
            <li>Isolate the variable</li>
            <li>Remember: Flip the sign when multiplying/dividing by negative numbers</li>
          </ol>
          
          <h3>Example 1:</h3>
          <div style="background: #f3f4f6; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
            <p><strong>Solve: 3x + 5 &gt; 14</strong></p>
            <p>Subtract 5: 3x &gt; 9</p>
            <p>Divide by 3: x &gt; 3</p>
            <p><strong>Solution: x &gt; 3</strong></p>
          </div>
          
          <h3>Example 2 (with negative):</h3>
          <div style="background: #f3f4f6; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
            <p><strong>Solve: -2x + 6 &lt; 10</strong></p>
            <p>Subtract 6: -2x &lt; 4</p>
            <p>Divide by -2 (FLIP THE SIGN): x &gt; -2</p>
            <p><strong>Solution: x &gt; -2</strong></p>
          </div>
        `,
        pdfUrl: '/resources/inequalities-practice.pdf',
        quiz: {
          passingScore: 70,
          questions: [
            {
              id: 1,
              question: 'Solve: 2x + 3 > 11. What is the solution?',
              options: ['x > 4', 'x < 4', 'x > 7', 'x < 7'],
              correctAnswer: 0
            },
            {
              id: 2,
              question: 'Solve: -3x ≤ 9. What is the solution?',
              options: ['x ≤ -3', 'x ≥ -3', 'x ≤ 3', 'x ≥ 3'],
              correctAnswer: 1
            },
            {
              id: 3,
              question: 'Which step requires flipping the inequality sign?',
              options: [
                'Adding 5 to both sides',
                'Subtracting 3 from both sides',
                'Dividing both sides by -2',
                'Multiplying both sides by 2'
              ],
              correctAnswer: 2
            }
          ]
        }
      }
    ]
  };
  
  const currentLesson = moduleData.lessons[currentLessonIndex];
  const isLessonCompleted = completedLessons.includes(currentLesson.id);
  const canAccessLesson = currentLessonIndex === 0 || completedLessons.includes(moduleData.lessons[currentLessonIndex - 1].id);
  
  const handleCompleteContent = () => {
    if (currentLesson.type === 'video') {
      setVideoProgress(100);
    } else {
      setContentRead(true);
    }
    if (currentLesson.pdfUrl) {
      setPdfViewed(true);
    }
  };
  
  const canTakeQuiz = () => {
    if (currentLesson.type === 'video') {
      return videoProgress >= 80;
    } else if (currentLesson.type === 'content') {
      return contentRead && (!currentLesson.pdfUrl || pdfViewed);
    }
    return true;
  };
  
  const handleStartQuiz = () => {
    if (canTakeQuiz()) {
      setShowQuiz(true);
      setQuizAnswers({});
      setQuizSubmitted(false);
    }
  };
  
  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionId]: answerIndex
    });
  };
  
  const handleSubmitQuiz = () => {
    const questions = currentLesson.quiz.questions;
    let correct = 0;
    
    questions.forEach(q => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    
    const score = Math.round((correct / questions.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);
    
    if (score >= currentLesson.quiz.passingScore) {
      if (!completedLessons.includes(currentLesson.id)) {
        setCompletedLessons([...completedLessons, currentLesson.id]);
      }
    }
  };
  
  const handleNextLesson = () => {
    if (currentLessonIndex < moduleData.lessons.length - 1 && isLessonCompleted) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      setShowQuiz(false);
      setVideoProgress(0);
      setContentRead(false);
      setPdfViewed(false);
      setQuizSubmitted(false);
    }
  };
  
  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      setShowQuiz(false);
      setQuizSubmitted(false);
    }
  };
  
  const allLessonsCompleted = completedLessons.length === moduleData.lessons.length;
  
  if (!canAccessLesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Lesson Locked</h2>
          <p className="text-gray-600 mb-6">
            Complete the previous lesson and pass its quiz to unlock this lesson.
          </p>
          <button onClick={() => navigate(-1)} className="btn-primary">
            <ArrowLeft className="w-4 h-4 inline mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/student/modules')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Modules</span>
            </button>
            
            <div className="text-center flex-1 mx-4">
              <h1 className="text-xl font-bold text-gray-800">{moduleData.title}</h1>
              <p className="text-sm text-gray-600">
                Lesson {currentLessonIndex + 1} of {moduleData.lessons.length}
              </p>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-gray-600">Progress</p>
              <p className="text-lg font-bold text-primary-600">
                {Math.round((completedLessons.length / moduleData.lessons.length) * 100)}%
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Lesson List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="font-bold text-gray-800 mb-4">Lessons</h3>
              <div className="space-y-2">
                {moduleData.lessons.map((lesson, index) => {
                  const completed = completedLessons.includes(lesson.id);
                  const locked = index > 0 && !completedLessons.includes(moduleData.lessons[index - 1].id);
                  const current = index === currentLessonIndex;
                  
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => !locked && setCurrentLessonIndex(index)}
                      disabled={locked}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        current
                          ? 'bg-primary-100 border-2 border-primary-500'
                          : locked
                          ? 'bg-gray-50 opacity-50 cursor-not-allowed'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {completed ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : locked ? (
                          <Lock className="w-4 h-4 text-gray-400" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                        )}
                        <span className={`text-sm font-medium ${current ? 'text-primary-700' : 'text-gray-700'}`}>
                          Lesson {index + 1}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 ml-6">{lesson.title}</p>
                    </button>
                  );
                })}
              </div>
              
              {allLessonsCompleted && (
                <div className="mt-6 p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-white text-center">
                  <Award className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-bold">Module Complete!</p>
                  <p className="text-xs mt-1">You've mastered all lessons</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {!showQuiz ? (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                {/* Lesson Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      currentLesson.type === 'video' ? 'bg-red-100' : 'bg-blue-100'
                    }`}>
                      {currentLesson.type === 'video' ? (
                        <Video className="w-6 h-6 text-red-600" />
                      ) : (
                        <BookOpen className="w-6 h-6 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{currentLesson.title}</h2>
                      {currentLesson.duration && (
                        <p className="text-sm text-gray-600">{currentLesson.duration}</p>
                      )}
                    </div>
                  </div>
                  
                  {isLessonCompleted && (
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Lesson Completed</span>
                    </div>
                  )}
                </div>
                
                {/* Video Player */}
                {currentLesson.type === 'video' && (
                  <div className="mb-6">
                    {currentLesson.videoUrl ? (
                      <div className="bg-gray-900 rounded-xl aspect-video overflow-hidden sticky top-24 z-10">
                        <iframe
                          width="100%"
                          height="100%"
                          src={currentLesson.videoUrl}
                          title={currentLesson.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        ></iframe>
                      </div>
                    ) : (
                      <div className="bg-gray-900 rounded-xl aspect-video flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-purple-500/20" />
                        <div className="relative z-10 text-center">
                          <Play className="w-20 h-20 text-white mb-4 mx-auto" />
                          <p className="text-white text-lg font-medium">Video Player</p>
                          <p className="text-white/70 text-sm">Video not available</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Video Progress */}
                    <div className="mt-4 bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span className="font-medium">Video Progress</span>
                        <span className="font-semibold text-primary-600">{videoProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-gradient-to-r from-primary-600 to-purple-600 h-2.5 rounded-full transition-all"
                          style={{ width: `${videoProgress}%` }}
                        />
                      </div>
                      {videoProgress < 100 && (
                        <button
                          onClick={handleCompleteContent}
                          className="mt-3 w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Mark video as watched
                        </button>
                      )}
                      {videoProgress === 100 && (
                        <div className="mt-3 flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-medium">Video completed!</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Lesson Content - Now visible while video plays */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6 border border-blue-100">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-5 h-5 text-primary-600" />
                    <h3 className="text-lg font-bold text-gray-800">Lesson Notes</h3>
                  </div>
                  <div className="prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
                  </div>
                </div>
                
                {currentLesson.type === 'content' && !contentRead && (
                  <button
                    onClick={handleCompleteContent}
                    className="mb-6 btn-secondary"
                  >
                    <CheckCircle className="w-4 h-4 inline mr-2" />
                    Mark as Read
                  </button>
                )}
                
                {/* PDF Download */}
                {currentLesson.pdfUrl && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="w-8 h-8 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-800">Practice Materials (PDF)</p>
                          <p className="text-sm text-gray-600">Download additional resources</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setPdfViewed(true)}
                        className="btn-primary flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                    {pdfViewed && (
                      <div className="mt-2 flex items-center gap-2 text-green-600 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        <span>PDF downloaded</span>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Take Quiz Button */}
                {currentLesson.quiz && (
                  <div className="mb-6">
                    {canTakeQuiz() ? (
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-xl font-bold mb-2">Ready to Test Your Knowledge?</h3>
                            <p className="text-white/90 mb-1">Take the quiz to complete this lesson</p>
                            <p className="text-sm text-white/80">
                              {currentLesson.quiz.questions.length} questions • 
                              Passing score: {currentLesson.quiz.passingScore}%
                            </p>
                          </div>
                          <button
                            onClick={() => setShowQuiz(true)}
                            className="bg-white text-purple-600 px-8 py-3 rounded-xl font-bold hover:bg-purple-50 transition-colors flex items-center gap-2 shadow-lg"
                          >
                            <ClipboardCheck className="w-5 h-5" />
                            Take Quiz
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-yellow-900 text-lg mb-2">Complete the lesson to unlock the quiz</p>
                            <ul className="text-sm text-yellow-700 space-y-2">
                              {currentLesson.type === 'video' && videoProgress < 80 && (
                                <li className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                                  Watch at least 80% of the video (Current: {videoProgress}%)
                                </li>
                              )}
                              {currentLesson.type === 'content' && !contentRead && (
                                <li className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                                  Read the lesson content
                                </li>
                              )}
                              {currentLesson.pdfUrl && !pdfViewed && (
                                <li className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                                  Download the practice materials
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <button
                    onClick={handlePreviousLesson}
                    disabled={currentLessonIndex === 0}
                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="w-4 h-4 inline mr-2" />
                    Previous
                  </button>
                  
                  <button
                    onClick={handleStartQuiz}
                    disabled={!canTakeQuiz()}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ClipboardCheck className="w-4 h-4 inline mr-2" />
                    Take Quiz
                  </button>
                </div>
              </div>
            ) : (
              /* Quiz View */
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Lesson Quiz</h2>
                  <p className="text-gray-600">
                    Answer all questions to complete this lesson. Passing score: {currentLesson.quiz.passingScore}%
                  </p>
                </div>
                
                {!quizSubmitted ? (
                  <div className="space-y-6">
                    {currentLesson.quiz.questions.map((question, qIndex) => (
                      <div key={question.id} className="p-6 bg-gray-50 rounded-xl">
                        <p className="font-medium text-gray-800 mb-4">
                          {qIndex + 1}. {question.question}
                        </p>
                        <div className="space-y-2">
                          {question.options.map((option, oIndex) => (
                            <label
                              key={oIndex}
                              className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                quizAnswers[question.id] === oIndex
                                  ? 'border-primary-500 bg-primary-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <input
                                type="radio"
                                name={`question-${question.id}`}
                                checked={quizAnswers[question.id] === oIndex}
                                onChange={() => handleQuizAnswer(question.id, oIndex)}
                                className="mr-3"
                              />
                              <span className="text-gray-700">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <button
                        onClick={() => setShowQuiz(false)}
                        className="btn-secondary"
                      >
                        <X className="w-4 h-4 inline mr-2" />
                        Cancel
                      </button>
                      
                      <button
                        onClick={handleSubmitQuiz}
                        disabled={Object.keys(quizAnswers).length !== currentLesson.quiz.questions.length}
                        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Submit Quiz
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Quiz Results */
                  <div>
                    <div className={`p-6 rounded-xl mb-6 ${
                      quizScore >= currentLesson.quiz.passingScore
                        ? 'bg-green-50 border-2 border-green-500'
                        : 'bg-red-50 border-2 border-red-500'
                    }`}>
                      <div className="text-center">
                        {quizScore >= currentLesson.quiz.passingScore ? (
                          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                        ) : (
                          <X className="w-16 h-16 text-red-600 mx-auto mb-4" />
                        )}
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          {quizScore >= currentLesson.quiz.passingScore ? 'Congratulations!' : 'Keep Trying!'}
                        </h3>
                        <p className="text-4xl font-bold text-gray-900 mb-2">{quizScore}%</p>
                        <p className="text-gray-600">
                          {quizScore >= currentLesson.quiz.passingScore
                            ? 'You passed the quiz! You can now move to the next lesson.'
                            : `You need ${currentLesson.quiz.passingScore}% to pass. Review the lesson and try again.`
                          }
                        </p>
                      </div>
                    </div>
                    
                    {/* Answer Review */}
                    <div className="space-y-4 mb-6">
                      <h4 className="font-bold text-gray-800">Answer Review:</h4>
                      {currentLesson.quiz.questions.map((question, qIndex) => {
                        const userAnswer = quizAnswers[question.id];
                        const isCorrect = userAnswer === question.correctAnswer;
                        
                        return (
                          <div key={question.id} className={`p-4 rounded-lg border-2 ${
                            isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                          }`}>
                            <div className="flex items-start gap-2 mb-2">
                              {isCorrect ? (
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                              ) : (
                                <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                              )}
                              <p className="font-medium text-gray-800">
                                {qIndex + 1}. {question.question}
                              </p>
                            </div>
                            <div className="ml-7">
                              <p className="text-sm text-gray-600">
                                Your answer: <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                                  {question.options[userAnswer]}
                                </span>
                              </p>
                              {!isCorrect && (
                                <p className="text-sm text-green-700 mt-1">
                                  Correct answer: {question.options[question.correctAnswer]}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      {quizScore >= currentLesson.quiz.passingScore ? (
                        <>
                          <button
                            onClick={() => setShowQuiz(false)}
                            className="btn-secondary"
                          >
                            Review Lesson
                          </button>
                          
                          {currentLessonIndex < moduleData.lessons.length - 1 ? (
                            <button
                              onClick={handleNextLesson}
                              className="btn-primary"
                            >
                              Next Lesson
                              <ArrowRight className="w-4 h-4 inline ml-2" />
                            </button>
                          ) : (
                            <button
                              onClick={() => navigate('/student/modules')}
                              className="btn-primary"
                            >
                              <Award className="w-4 h-4 inline mr-2" />
                              Complete Module
                            </button>
                          )}
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => setShowQuiz(false)}
                            className="btn-secondary"
                          >
                            Review Lesson
                          </button>
                          
                          <button
                            onClick={handleStartQuiz}
                            className="btn-primary"
                          >
                            Retake Quiz
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LessonViewer;
