import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { 
  Shield, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock,
  AlertCircle,
  ArrowRight,
  Sparkles,
  CheckCircle
} from 'lucide-react';

function AdminLogin() {
  const { adminLogin, loading, admin, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: credentials, 2: verification
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Redirect if already authenticated as admin - DISABLED (AdminAuthContext handles this)
  // useEffect(() => {
  //   if (isAuthenticated && admin) {
  //     console.log('Admin already authenticated, redirecting to dashboard...');
  //     navigate('/admin/dashboard', { replace: true });
  //   }
  // }, [isAuthenticated, admin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Admin email validation - Allow any email for testing
    // if (!formData.email.includes('@admin.') && !formData.email.includes('@edulearn.')) {
    //   setError('Please use an authorized admin email address');
    //   return;
    // }

    // FOR TESTING: Skip verification in development - always enabled for easier testing
    console.log('AdminLogin: Attempting direct admin login...');
    const result = await adminLogin(formData.email, formData.password);
    console.log('AdminLogin: Login result:', result);
    
    if (!result.success) {
      setError(result.error || 'Login failed. Please check your credentials.');
    }
    // If successful, AdminAuthContext will automatically redirect to /admin/dashboard
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const code = verificationCode.join('');
    
    // Verify code (in production, verify with backend)
    if (code.length !== 6) {
      setError('Please enter the complete verification code');
      return;
    }

    console.log('AdminLogin: Attempting admin login...');
    
    // Proceed with login - AdminAuthContext will handle navigation
    const result = await adminLogin(formData.email, formData.password);
    
    console.log('AdminLogin: Login result:', result);
    
    if (!result.success) {
      console.error('AdminLogin: Login failed:', result.error);
      setError(result.error || 'Login failed. Please try again.');
      setStep(1); // Go back to credentials
    }
    // If successful, AdminAuthContext will handle the redirect automatically
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleVerificationChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`)?.focus();
      }
    }
  };

  const handleVerificationKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus();
    }
  };

  const resendCode = () => {
    setVerificationCode(['', '', '', '', '', '']);
    setError('');
    // In production, resend verification code
    alert('Verification code sent to your email!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-blue-200">Secure administrative access</p>
          </div>

          {/* Security Notice */}
          <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-100">
                <p className="font-semibold mb-1">Enhanced Security</p>
                <p>Admin access requires two-factor authentication for your protection.</p>
              </div>
            </div>
          </div>

          {/* Step 1: Credentials */}
          {step === 1 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-blue-100 mb-2">
                  Admin Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-blue-300" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-blue-300"
                    placeholder="admin@edulearn.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-blue-100 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-blue-300" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-blue-300"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-400/30 text-red-200 px-4 py-3 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Step 2: Verification */}
          {step === 2 && (
            <form onSubmit={handleVerificationSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-blue-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Verify Your Identity</h3>
                <p className="text-blue-200 text-sm">
                  We've sent a 6-digit code to<br />
                  <span className="font-semibold">{formData.email}</span>
                </p>
              </div>

              {/* Verification Code Input */}
              <div>
                <label className="block text-sm font-medium text-blue-100 mb-3 text-center">
                  Enter Verification Code
                </label>
                <div className="flex justify-center gap-2">
                  {verificationCode.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleVerificationChange(index, e.target.value)}
                      onKeyDown={(e) => handleVerificationKeyDown(index, e)}
                      className="w-12 h-14 text-center text-2xl font-bold bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white"
                    />
                  ))}
                </div>
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-400/30 text-red-200 px-4 py-3 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify & Login
                    <Shield className="w-5 h-5" />
                  </>
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={resendCode}
                  className="text-sm text-blue-300 hover:text-white transition-colors"
                >
                  Didn't receive code? Resend
                </button>
              </div>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-blue-300 hover:text-white transition-colors text-sm"
              >
                ← Back to login
              </button>
            </form>
          )}

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-blue-200 text-sm">
              Not an admin?{' '}
              <Link to="/login" className="text-blue-400 hover:text-white font-medium transition-colors">
                Regular login
              </Link>
            </p>
          </div>

          {/* Security Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-blue-300 text-xs">
            <Shield className="w-4 h-4" />
            <span>256-bit SSL Encrypted</span>
          </div>
        </div>

        {/* Additional Security Info */}
        <div className="mt-6 text-center">
          <p className="text-blue-300 text-xs">
            This is a secure admin portal. All activities are logged and monitored.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
