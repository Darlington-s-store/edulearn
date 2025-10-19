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
  User, 
  Users, 
  GraduationCap, 
  Shield,
  Camera,
  Mic,
  Brain,
  Sparkles,
  ArrowRight,
  Check
} from 'lucide-react';

function Login() {
  const { login, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('student');
  const [loginMethod, setLoginMethod] = useState('traditional'); // traditional, face, voice, bci
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
    
    const result = await login(formData.email, formData.password, userType);
    
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
    // In a real app, send biometric data to backend for verification
    console.log('Biometric authentication successful:', data);
    
    // For demo, use test credentials based on role
    const testCredentials = {
      student: { email: 'student@example.com', password: 'password123' },
      teacher: { email: 'teacher@example.com', password: 'password123' },
      parent: { email: 'parent@example.com', password: 'password123' }
    };
    
    const credentials = testCredentials[userType];
    const result = await login(credentials.email, credentials.password, userType);
    
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

  const roleConfig = {
    student: { icon: GraduationCap, color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-50', label: 'Student' },
    parent: { icon: Users, color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50', label: 'Parent' },
    teacher: { icon: User, color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-50', label: 'Teacher' }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Background Animation Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-200 to-indigo-300 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative max-w-lg w-full">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg animate-float">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 font-playful mb-2">Welcome Back!</h1>
            <p className="text-gray-600">Sign in to continue your learning journey</p>
          </div>

          {/* Role Selection Tabs */}
          <div className="mb-8">
            <div className="grid grid-cols-3 gap-2 bg-gray-100 rounded-2xl p-1">
              {Object.entries(roleConfig).map(([key, config]) => {
                const IconComponent = config.icon;
                const isActive = userType === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setUserType(key)}
                    className={`flex flex-col items-center py-3 px-2 rounded-xl text-xs font-medium transition-all duration-300 ${
                      isActive
                        ? `${config.bgColor} text-gray-800 shadow-lg transform scale-105`
                        : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                    }`}
                  >
                    <IconComponent className={`w-5 h-5 mb-1 ${isActive ? 'text-primary-600' : 'text-gray-500'}`} />
                    <span>{config.label}</span>
                  </button>
                );
              })}
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
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Mail className="w-4 h-4 inline mr-2" />
                Traditional
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('face')}
                className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                  loginMethod === 'face'
                    ? 'bg-white text-primary-600 shadow-sm'
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
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Mic className="w-4 h-4 inline mr-2" />
                Voice
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('bci')}
                className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                  loginMethod === 'bci'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Brain className="w-4 h-4 inline mr-2" />
                BCI
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
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
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
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
                  <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700 transition-colors">
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
                className="w-full btn-primary text-lg py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
              {/* Future Tech Login Options */}
              {loginMethod === 'face' && (
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <Camera className="w-16 h-16 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Face Recognition Login</h3>
                  <p className="text-gray-600">Look at the camera to authenticate</p>
                  <button 
                    onClick={() => setShowFaceRecognition(true)}
                    className="w-full btn-primary text-lg py-4 flex items-center justify-center gap-2"
                  >
                    <Camera className="w-5 h-5" />
                    Start Face Scan
                  </button>
                  <p className="text-xs text-gray-500">✨ Advanced biometric authentication</p>
                </div>
              )}

              {loginMethod === 'voice' && (
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <Mic className="w-16 h-16 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Voice Recognition Login</h3>
                  <p className="text-gray-600">Speak your passphrase to authenticate</p>
                  <button 
                    onClick={() => setShowVoiceRecognition(true)}
                    className="w-full btn-primary text-lg py-4 flex items-center justify-center gap-2"
                  >
                    <Mic className="w-5 h-5" />
                    Start Voice Recognition
                  </button>
                  <p className="text-xs text-gray-500">✨ AI-powered voice authentication</p>
                </div>
              )}

              {loginMethod === 'bci' && (
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <Brain className="w-16 h-16 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Brain-Computer Interface</h3>
                  <p className="text-gray-600">Think your password to authenticate</p>
                  <button className="w-full btn-primary text-lg py-4 flex items-center justify-center gap-2">
                    <Brain className="w-5 h-5" />
                    Start BCI Scan
                  </button>
                  <p className="text-xs text-gray-500">*Coming Soon - Revolutionary neural authentication</p>
                </div>
              )}
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {"Don't have an account? "}
              <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-medium">
                Sign up here
              </Link>
            </p>
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

export default Login;
