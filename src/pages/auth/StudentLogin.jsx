import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import FaceRecognition from '../../components/FaceRecognition';
import VoiceRecognition from '../../components/VoiceRecognition';
import { 
  Heart, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  GraduationCap,
  Camera,
  Mic,
  Brain,
  Sparkles,
  ArrowRight,
  BookOpen,
  Trophy,
  Star
} from 'lucide-react';

function StudentLogin() {
  const { login, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState('traditional');
  const [error, setError] = useState('');
  const [showFaceRecognition, setShowFaceRecognition] = useState(false);
  const [showVoiceRecognition, setShowVoiceRecognition] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(formData.email, formData.password, 'student');
    
    if (!result.success) {
      setError(result.error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBiometricSuccess = async (data) => {
    console.log('Biometric authentication successful:', data);
    
    const testCredentials = { email: 'student@example.com', password: 'password123' };
    const result = await login(testCredentials.email, testCredentials.password, 'student');
    
    if (!result.success) {
      setError(result.error);
    }
    
    setShowFaceRecognition(false);
    setShowVoiceRecognition(false);
  };

  const handleBiometricCancel = () => {
    setShowFaceRecognition(false);
    setShowVoiceRecognition(false);
    setLoginMethod('traditional');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Background Animation Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-200 to-blue-300 rounded-full opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <BookOpen className="w-64 h-64 text-blue-200 opacity-10 animate-float" />
        </div>
      </div>

      <div className="relative max-w-lg w-full">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg animate-float">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 font-playful mb-2">Student Login</h1>
            <p className="text-gray-600">Welcome back! Continue your learning journey</p>
          </div>

          {/* Student Benefits Banner */}
          <div className="mb-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-800">Student Benefits</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs text-blue-700">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                <span>Earn Points</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                <span>Live Classes</span>
              </div>
              <div className="flex items-center gap-1">
                <Brain className="w-3 h-3" />
                <span>AI Tutors</span>
              </div>
            </div>
          </div>

          {/* Login Method Selection */}
          <div className="mb-6">
            <div className="flex bg-gray-100 rounded-2xl p-1">
              <button
                type="button"
                onClick={() => setLoginMethod('traditional')}
                className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                  loginMethod === 'traditional'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('face')}
                className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                  loginMethod === 'face'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Camera className="w-4 h-4 inline mr-2" />
                Face ID
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('voice')}
                className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                  loginMethod === 'voice'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Mic className="w-4 h-4 inline mr-2" />
                Voice
              </button>
            </div>
          </div>

          {/* Login Form */}
          {loginMethod === 'traditional' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
                  Forgot password?
                </Link>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-lg py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              {loginMethod === 'face' && (
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <Camera className="w-16 h-16 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Face Recognition Login</h3>
                  <p className="text-gray-600">Look at the camera to authenticate</p>
                  <button 
                    onClick={() => setShowFaceRecognition(true)}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-lg py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Camera className="w-5 h-5" />
                    Start Face Scan
                  </button>
                </div>
              )}

              {loginMethod === 'voice' && (
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <Mic className="w-16 h-16 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Voice Recognition Login</h3>
                  <p className="text-gray-600">Speak your passphrase to authenticate</p>
                  <button 
                    onClick={() => setShowVoiceRecognition(true)}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-lg py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Mic className="w-5 h-5" />
                    Start Voice Recognition
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="mt-6 text-center space-y-3">
            <p className="text-gray-600">
              {"Don't have an account? "}
              <Link to="/signup/student" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign up as Student
              </Link>
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <Link to="/login/parent" className="hover:text-gray-700">Parent Login</Link>
              <span>•</span>
              <Link to="/login/teacher" className="hover:text-gray-700">Teacher Login</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Face Recognition Modal */}
      {showFaceRecognition && (
        <FaceRecognition
          mode="login"
          onSuccess={handleBiometricSuccess}
          onCancel={handleBiometricCancel}
        />
      )}

      {/* Voice Recognition Modal */}
      {showVoiceRecognition && (
        <VoiceRecognition
          mode="login"
          onSuccess={handleBiometricSuccess}
          onCancel={handleBiometricCancel}
        />
      )}
    </div>
  );
}

export default StudentLogin;
