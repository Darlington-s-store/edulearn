import React, { useState } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
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
  Check,
  Calendar,
  School,
  Phone
} from 'lucide-react';

function Signup() {
  const { type } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { signup, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState(type || 'student');
  const [signupMethod, setSignupMethod] = useState('traditional'); // traditional, face, voice, bci
  const [error, setError] = useState('');
  const [showFaceRecognition, setShowFaceRecognition] = useState(false);
  const [showVoiceRecognition, setShowVoiceRecognition] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    age: '',
    school: '',
    grade: '',
    agreeToTerms: false
  });

  const roleConfig = {
    student: { icon: GraduationCap, color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-50', label: 'Student' },
    parent: { icon: Users, color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50', label: 'Parent' },
    teacher: { icon: User, color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-50', label: 'Teacher' }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Validate terms agreement
    if (!formData.agreeToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      return;
    }
    
    const result = await signup(formData, userType);
    
    if (!result.success) {
      setError(result.error);
      return;
    }
    // If there was a pending plan before signup and user is parent, send to subscribe
    if (userType === 'parent') {
      const pending = localStorage.getItem('pendingPlan');
      if (pending) {
        const { plan, billing } = JSON.parse(pending);
        navigate(`/subscribe?plan=${plan}&billing=${billing}`);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleBiometricSuccess = async (data) => {
    // In a real app, store biometric data with user profile
    console.log('Biometric registration successful:', data);
    
    // For demo, create a test account
    const demoFormData = {
      firstName: 'Demo',
      lastName: 'User',
      email: `demo.${userType}@example.com`,
      phone: '1234567890',
      password: 'password123',
      confirmPassword: 'password123',
      age: userType === 'student' ? '15' : '',
      school: 'Demo School',
      grade: userType === 'student' ? '10' : '',
      agreeToTerms: true
    };
    
    const result = await signup(demoFormData, userType);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setShowFaceRecognition(false);
    setShowVoiceRecognition(false);
  };

  const handleBiometricCancel = () => {
    setShowFaceRecognition(false);
    setShowVoiceRecognition(false);
    setSignupMethod('traditional');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Background Animation Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative max-w-2xl w-full">
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
            <h1 className="text-4xl font-bold text-gray-800 font-playful mb-2">Join Edu-Learn!</h1>
            <p className="text-gray-600">Create your account and start your learning adventure</p>
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

          {/* Signup Method Selection */}
          <div className="mb-6">
            <div className="flex bg-gray-100 rounded-2xl p-1">
              <button
                type="button"
                onClick={() => setSignupMethod('traditional')}
                className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                  signupMethod === 'traditional'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Mail className="w-4 h-4 inline mr-2" />
                Traditional
              </button>
              <button
                type="button"
                onClick={() => setSignupMethod('face')}
                className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                  signupMethod === 'face'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Camera className="w-4 h-4 inline mr-2" />
                Face ID
              </button>
              <button
                type="button"
                onClick={() => setSignupMethod('voice')}
                className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                  signupMethod === 'voice'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Mic className="w-4 h-4 inline mr-2" />
                Voice
              </button>
              <button
                type="button"
                onClick={() => setSignupMethod('bci')}
                className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                  signupMethod === 'bci'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Brain className="w-4 h-4 inline mr-2" />
                BCI
              </button>
            </div>
          </div>

          {/* Signup Form */}
          {signupMethod === 'traditional' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="First name"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="Last name"
                    />
                  </div>
                </div>
              </div>

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
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {userType === 'student' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                      Age
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        min="6"
                        max="18"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="Your age"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
                      Grade Level
                    </label>
                    <select
                      id="grade"
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select Grade</option>
                      <option value="1">Grade 1</option>
                      <option value="2">Grade 2</option>
                      <option value="3">Grade 3</option>
                      <option value="4">Grade 4</option>
                      <option value="5">Grade 5</option>
                      <option value="6">Grade 6</option>
                      <option value="7">Grade 7</option>
                      <option value="8">Grade 8</option>
                      <option value="9">Grade 9</option>
                      <option value="10">Grade 10</option>
                      <option value="11">Grade 11</option>
                      <option value="12">Grade 12</option>
                    </select>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-2">
                  {userType === 'student' ? 'School Name' : userType === 'parent' ? 'Child\'s School' : 'Institution/Organization'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <School className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="school"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder={userType === 'student' ? 'Your school name' : userType === 'parent' ? 'Child\'s school name' : 'Your institution'}
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
                    placeholder="Create a password"
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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                  className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-600">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary-600 hover:text-primary-700 transition-colors">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary-600 hover:text-primary-700 transition-colors">
                    Privacy Policy
                  </Link>
                </label>
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
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Future Tech Signup Options */}
              {signupMethod === 'face' && (
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <Camera className="w-16 h-16 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Face Registration</h3>
                  <p className="text-gray-600">Register your face for secure authentication</p>
                  <button 
                    onClick={() => setShowFaceRecognition(true)}
                    className="w-full btn-primary text-lg py-4 flex items-center justify-center gap-2"
                  >
                    <Camera className="w-5 h-5" />
                    Register Face ID
                  </button>
                  <p className="text-xs text-gray-500">✨ Advanced biometric registration</p>
                </div>
              )}

              {signupMethod === 'voice' && (
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <Mic className="w-16 h-16 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Voice Registration</h3>
                  <p className="text-gray-600">Record your voice for personalized authentication</p>
                  <button 
                    onClick={() => setShowVoiceRecognition(true)}
                    className="w-full btn-primary text-lg py-4 flex items-center justify-center gap-2"
                  >
                    <Mic className="w-5 h-5" />
                    Register Voice ID
                  </button>
                  <p className="text-xs text-gray-500">✨ AI-powered voice registration</p>
                </div>
              )}

              {signupMethod === 'bci' && (
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <Brain className="w-16 h-16 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Neural Registration</h3>
                  <p className="text-gray-600">Register your neural patterns for mind-based authentication</p>
                  <button className="w-full btn-primary text-lg py-4 flex items-center justify-center gap-2">
                    <Brain className="w-5 h-5" />
                    Register Neural ID
                  </button>
                  <p className="text-xs text-gray-500">*Coming Soon - Revolutionary neural registration</p>
                </div>
              )}
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Face Recognition Modal */}
      {showFaceRecognition && (
        <FaceRecognition
          mode="register"
          onSuccess={handleBiometricSuccess}
          onCancel={handleBiometricCancel}
        />
      )}

      {/* Voice Recognition Modal */}
      {showVoiceRecognition && (
        <VoiceRecognition
          mode="register"
          onSuccess={handleBiometricSuccess}
          onCancel={handleBiometricCancel}
        />
      )}
    </div>
  );
}

export default Signup;
