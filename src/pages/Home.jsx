import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  Users, 
  Award, 
  BookOpen, 
  Video, 
  Trophy,
  Check,
  ArrowRight,
  Play,
  Sparkles,
  Zap,
  Globe,
  Brain,
  Gamepad2,
  ChevronLeft,
  ChevronRight,
  Quote,
  Clock,
  Shield,
  Smartphone,
  Headphones,
  Target,
  TrendingUp,
  Heart,
  MessageCircle,
  Camera,
  Mic,
  Download,
  Upload,
  Wifi,
  Battery
} from 'lucide-react';

function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const features = [
    {
      icon: Video,
      title: "Live Classes",
      description: "Join interactive live sessions with amazing teachers and classmates from around the world!",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      delay: "0ms"
    },
    {
      icon: Brain,
      title: "VR Learning Labs",
      description: "Experience immersive virtual reality learning environments that make complex concepts fun and engaging!",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      delay: "100ms"
    },
    {
      icon: Gamepad2,
      title: "Gamified Points",
      description: "Earn awesome points, unlock achievements, and compete with friends in our exciting reward system!",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      delay: "200ms"
    },
    {
      icon: Sparkles,
      title: "AI Tutors",
      description: "Get personalized help from our smart AI tutors that adapt to your learning style and pace!",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      delay: "300ms"
    },
    {
      icon: Globe,
      title: "Global Classrooms",
      description: "Connect with students worldwide, share cultures, and learn together in our global community!",
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50",
      delay: "400ms"
    },
    {
      icon: Shield,
      title: "Secure Learning",
      description: "Your data and privacy are protected with enterprise-grade security and encryption!",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50",
      delay: "500ms"
    },
    {
      icon: Smartphone,
      title: "Mobile Learning",
      description: "Learn anywhere, anytime with our responsive mobile app that works on all devices!",
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-50",
      delay: "600ms"
    },
    {
      icon: Headphones,
      title: "Audio Learning",
      description: "Listen to lessons, podcasts, and audiobooks while commuting or exercising!",
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-50",
      delay: "700ms"
    }
  ];

  const learningStats = [
    {
      icon: TrendingUp,
      value: "95%",
      label: "Student Success Rate",
      description: "Students show improved grades within 3 months"
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Always Available",
      description: "Learn at your own pace, anytime you want"
    },
    {
      icon: Users,
      value: "50K+",
      label: "Active Students",
      description: "Join our growing community of learners"
    },
    {
      icon: Award,
      value: "1000+",
      label: "Expert Teachers",
      description: "Learn from certified and experienced educators"
    }
  ];

  const learningMethods = [
    {
      icon: Camera,
      title: "Video Lessons",
      description: "High-quality video content with interactive elements",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Mic,
      title: "Audio Learning",
      description: "Listen to lessons while doing other activities",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: BookOpen,
      title: "Interactive Books",
      description: "Engaging digital textbooks with animations",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Target,
      title: "Practice Tests",
      description: "Regular assessments to track your progress",
      color: "from-purple-500 to-violet-500"
    }
  ];

  const testimonials = [
    {
      name: "Emma Johnson",
      age: "Age 12",
      text: "I love Lovable! The VR labs are amazing and I've learned so much about space. My favorite part is earning points and competing with friends!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      illustration: "🚀"
    },
    {
      name: "Mrs. Sarah Williams",
      role: "Teacher",
      text: "This platform has revolutionized my classroom! The AI tutors help students when I'm busy, and the global classrooms create amazing cultural exchanges.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      illustration: "👩‍🏫"
    },
    {
      name: "Alex Chen",
      age: "Age 14",
      text: "The gamified learning is incredible! I've improved my math scores by 40% since using Lovable. The AI tutor explains things in ways I actually understand!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      illustration: "🎮"
    },
    {
      name: "Mrs. Maria Rodriguez",
      role: "Parent",
      text: "My daughter has never been more excited about learning! The VR experiences and global connections have opened her eyes to the world.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      illustration: "🌟"
    }
  ];

  const pricingPlans = [
    {
      name: "Individual Plan",
      price: "₵500",
      period: "per month",
      yearlyPrice: "₵5,000",
      yearlyPeriod: "per year",
      description: "Perfect for individual students",
      features: [
        "Access to all live classes",
        "Assignment submissions",
        "Points & leaderboard",
        "Learning modules",
        "Community access",
        "Progress tracking"
      ],
      popular: false,
      savings: "Save ₵1,000 yearly"
    },
    {
      name: "Family Plan",
      price: "₵1,200",
      period: "per month",
      yearlyPrice: "₵12,000",
      yearlyPeriod: "per year",
      description: "Great for families with up to 4 children",
      features: [
        "Up to 4 student accounts",
        "Individual login IDs for each child",
        "All Individual Plan features",
        "Family dashboard",
        "Parental controls",
        "Priority support",
        "Bulk progress reports"
      ],
      popular: true,
      savings: "Save ₵2,400 yearly"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Main Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23667eea;stop-opacity:1" /><stop offset="100%" style="stop-color:%23764ba2;stop-opacity:1" /></linearGradient><pattern id="dots" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse"><circle cx="30" cy="30" r="2" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23bg)"/><rect width="100%" height="100%" fill="url(%23dots)"/></svg>')`
          }}
        ></div>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-purple-900/70 to-pink-900/80"></div>
        
        {/* Animated Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large Floating Circle */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-primary-400/20 to-purple-400/20 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-yellow-400/20 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          
          {/* Floating Triangles */}
          <div className="absolute top-1/4 left-1/4 w-0 h-0 border-l-[30px] border-r-[30px] border-b-[50px] border-l-transparent border-r-transparent border-b-primary-300/30 animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-0 h-0 border-l-[40px] border-r-[40px] border-b-[60px] border-l-transparent border-r-transparent border-b-purple-300/30 animate-float" style={{animationDelay: '1.5s'}}></div>
          
          {/* Floating Squares */}
          <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-br from-mint-400/20 to-blue-400/20 transform rotate-45 animate-float" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-1/3 left-1/3 w-12 h-12 bg-gradient-to-br from-pink-400/20 to-orange-400/20 transform rotate-12 animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        {/* Floating Educational Icons */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Books */}
          <div className="absolute top-20 left-10 w-16 h-16 opacity-30 animate-float">
            <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-xl transform rotate-12 flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl">📚</span>
            </div>
          </div>
          
          {/* Floating Calculator */}
          <div className="absolute top-32 right-20 w-12 h-12 opacity-30 animate-float" style={{animationDelay: '0.5s'}}>
            <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-xl transform -rotate-12 flex items-center justify-center shadow-lg">
              <span className="text-white text-lg">🧮</span>
            </div>
          </div>
          
          {/* Floating Globe */}
          <div className="absolute bottom-40 left-20 w-14 h-14 opacity-30 animate-float" style={{animationDelay: '1s'}}>
            <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-lg">🌍</span>
            </div>
          </div>
          
          {/* Floating Microscope */}
          <div className="absolute bottom-20 right-16 w-10 h-10 opacity-30 animate-float" style={{animationDelay: '1.5s'}}>
            <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-xl transform rotate-45 flex items-center justify-center shadow-lg">
              <span className="text-white text-sm">🔬</span>
            </div>
          </div>
          
          {/* Floating Paint Brush */}
          <div className="absolute top-1/3 right-1/4 w-8 h-8 opacity-30 animate-float" style={{animationDelay: '2s'}}>
            <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-xl transform -rotate-45 flex items-center justify-center shadow-lg">
              <span className="text-white text-sm">🎨</span>
            </div>
          </div>
          
          {/* Floating Music Note */}
          <div className="absolute top-1/2 left-1/3 w-6 h-6 opacity-30 animate-float" style={{animationDelay: '2.5s'}}>
            <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-xs">🎵</span>
            </div>
          </div>
          
          {/* Floating Rocket */}
          <div className="absolute top-1/4 right-1/5 w-12 h-12 opacity-30 animate-float" style={{animationDelay: '3s'}}>
            <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-lg">🚀</span>
            </div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/90 text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4" />
                  <span>Edu-Learn: Revolutionary Learning Platform</span>
                </div>
                
                <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight font-playful">
                  The Future of{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 animate-gradient">
                    Fun Learning
                </span>
              </h1>
                <p className="text-2xl text-white/80 leading-relaxed">
                  Experience the most engaging educational platform with VR labs, AI tutors, 
                  and global classrooms that make learning an adventure!
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/signup/student" className="bg-white text-primary-600 hover:bg-white/90 text-lg px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 font-semibold flex items-center justify-center">
                  <Users className="w-6 h-6 inline mr-3" />
                  Sign Up as Student
                </Link>
                <button className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/20 hover:bg-white/20 text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 font-semibold flex items-center justify-center">
                  <Play className="w-6 h-6 inline mr-3" />
                  Watch Demo
                </button>
              </div>
              
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">50K+</div>
                  <div className="text-sm text-white/70">Happy Students</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">1K+</div>
                  <div className="text-sm text-white/70">Expert Teachers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">95%</div>
                  <div className="text-sm text-white/70">Success Rate</div>
                </div>
              </div>
            </div>
            
            {/* Right Side - 3D Character & Interactive Elements */}
            <div className="relative">
              <div className="relative z-10">
                {/* Main Character Card */}
                <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500 border border-white/20">
            <div className="relative">
                    {/* 3D Character Placeholder - Using a fun illustration */}
                    <div className="w-full h-80 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center relative overflow-hidden border border-white/20">
                      <div className="text-8xl animate-bounce">🎓</div>
                      <div className="absolute top-4 right-4 text-4xl animate-pulse">✨</div>
                      <div className="absolute bottom-4 left-4 text-3xl animate-bounce" style={{animationDelay: '0.5s'}}>🚀</div>
                    </div>
                    
                    {/* Live Class Indicator */}
                    <div className="absolute top-4 left-4 bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 border border-white/20">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      Live Class
                    </div>
                    
                    {/* Floating Elements */}
                    <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                          <Video className="w-6 h-6 text-white" />
                    </div>
                    <div>
                          <p className="font-semibold text-white">VR Space Exploration</p>
                          <p className="text-sm text-white/70">28 students joined</p>
                    </div>
                  </div>
                  <div className="text-right">
                        <p className="text-2xl font-bold text-white">+150</p>
                        <p className="text-sm text-white/70">Points earned</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Cards */}
                <div className="absolute -bottom-8 -left-8 bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-lg transform -rotate-12 hover:rotate-0 transition-transform duration-300 border border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">AI Tutor</p>
                      <p className="text-xs text-white/70">24/7 Available</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -top-8 -right-8 bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300 border border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">Global</p>
                      <p className="text-xs text-white/70">15 Countries</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNlNWU3ZWYiIGZpbGwtb3BhY2l0eT0iMC41Ij48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Amazing Features
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 font-playful">
              Why Students{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-purple-500">
                Love Edu-Learn
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the cutting-edge features that make learning an exciting adventure with VR, AI, and global connections!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group relative animate-fade-in-up"
                style={{animationDelay: feature.delay}}
              >
                <div className={`${feature.bgColor} rounded-3xl p-8 h-full transition-all duration-500 transform group-hover:scale-105 group-hover:shadow-2xl border border-gray-100 hover:border-transparent group-hover:-translate-y-2`}>
                  <div className="relative z-10">
                    <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:rotate-6`}>
                      <feature.icon className="w-10 h-10 text-white" />
                </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center group-hover:text-primary-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </p>
                  </div>
                  
                  {/* Hover Effect Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-bounce"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            ))}
          </div>
          
          {/* Additional Feature Card - Full Width */}
          <div className="mt-16">
            <div className="bg-gradient-to-r from-primary-500 to-purple-500 rounded-3xl p-12 text-white text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Zap className="w-8 h-8 text-yellow-300" />
                  <h3 className="text-3xl font-bold font-playful">Ready to Transform Learning?</h3>
                </div>
                <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                  Join thousands of students already experiencing the future of education. Start your learning adventure today!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/signup/student" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-2xl transition-all duration-200 transform hover:-translate-y-1 shadow-lg">
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 inline ml-2" />
                  </Link>
                  <Link to="/signup/teacher" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-2xl transition-all duration-200">
                    Teach with Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 font-playful">
              Choose Your Learning Adventure
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select the perfect plan for your learning needs. All plans include our amazing features!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`card p-8 relative ${plan.popular ? 'ring-2 ring-primary-500 scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  {/* Monthly Pricing */}
                  <div className="mb-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-800">{plan.price}</span>
                      <span className="text-gray-600 ml-2">/{plan.period}</span>
                    </div>
                  </div>
                  
                  {/* Yearly Pricing */}
                  <div className="bg-mint-50 rounded-lg p-3 mb-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-2xl font-bold text-mint-700">{plan.yearlyPrice}</span>
                      <span className="text-mint-600 ml-2">/{plan.yearlyPeriod}</span>
                    </div>
                    <p className="text-sm text-mint-600 font-medium mt-1">{plan.savings}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-mint-500 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <Link to={`/subscribe?plan=${plan.id || 'family'}&billing=monthly`} className={`block text-center w-full py-3 px-6 rounded-2xl font-medium transition-all duration-200 ${
                    plan.popular 
                      ? 'btn-primary' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}>
                    Subscribe Monthly
                  </Link>
                  <Link to={`/subscribe?plan=${plan.id || 'family'}&billing=yearly`} className="block text-center w-full py-3 px-6 rounded-2xl font-medium bg-mint-100 hover:bg-mint-200 text-mint-700 transition-all duration-200">
                    Subscribe Yearly (Save More!)
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Stats Section */}
      <section className="py-24 bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="%23ffffff" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grid)"/></svg>')`
          }}
        ></div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-10 right-1/3 w-24 h-24 bg-white/10 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              <span>Proven Results</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 font-playful">
              Learning That{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                Works
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Join thousands of successful students who have transformed their learning journey with our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {learningStats.map((stat, index) => (
              <div 
                key={index} 
                className="group text-center animate-fade-in-up"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 h-full transition-all duration-500 transform group-hover:scale-105 group-hover:bg-white/20 border border-white/20">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {stat.label}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Methods Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="2" fill="%23000000"/></pattern></defs><rect width="100%" height="100%" fill="url(%23dots)"/></svg>')`
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              <span>Multiple Learning Styles</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 font-playful">
              Learn Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-purple-500">
                Way
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover different ways to learn that match your unique style and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {learningMethods.map((method, index) => (
              <div 
                key={index} 
                className="group relative animate-fade-in-up"
                style={{animationDelay: `${index * 150}ms`}}
              >
                <div className="bg-white rounded-3xl p-8 h-full transition-all duration-500 transform group-hover:scale-105 group-hover:shadow-2xl border border-gray-100 hover:border-transparent group-hover:-translate-y-2">
                  <div className="relative z-10">
                    <div className={`w-20 h-20 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:rotate-12`}>
                      <method.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center group-hover:text-primary-600 transition-colors duration-300">
                      {method.title}
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      {method.description}
                    </p>
                  </div>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 text-6xl opacity-10 animate-bounce">🎓</div>
          <div className="absolute top-40 right-20 text-5xl opacity-10 animate-bounce" style={{animationDelay: '1s'}}>🌟</div>
          <div className="absolute bottom-20 left-20 text-4xl opacity-10 animate-bounce" style={{animationDelay: '2s'}}>🚀</div>
          <div className="absolute bottom-40 right-10 text-5xl opacity-10 animate-bounce" style={{animationDelay: '0.5s'}}>✨</div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-sm">
              <Quote className="w-4 h-4" />
              Happy Stories
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 font-playful">
              What Our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-purple-500">
                Community Says
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Hear from students, teachers, and parents who are already part of our amazing learning family!
            </p>
          </div>

          {/* Testimonials Carousel */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
            {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4 animate-fade-in-up" style={{animationDelay: `${index * 200}ms`}}>
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20 max-w-4xl mx-auto transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                        {/* Left Side - Illustration */}
                        <div className="text-center lg:text-left">
                          <div className="text-8xl mb-4 animate-bounce">{testimonial.illustration}</div>
                          <div className="flex items-center justify-center lg:justify-start gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                          <p className="text-gray-600 font-medium">{testimonial.age || testimonial.role}</p>
                        </div>
                        
                        {/* Center - Testimonial Text */}
                        <div className="lg:col-span-2">
                          <blockquote className="text-2xl text-gray-700 leading-relaxed mb-8 italic">
                  "{testimonial.text}"
                          </blockquote>
                          
                          {/* Author Info */}
                          <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                              className="w-16 h-16 rounded-full object-cover shadow-lg"
                  />
                  <div>
                              <p className="font-bold text-xl text-gray-800">{testimonial.name}</p>
                              <p className="text-gray-500">{testimonial.age || testimonial.role}</p>
                            </div>
                          </div>
                        </div>
                  </div>
                </div>
              </div>
            ))}
              </div>
            </div>
            
            {/* Carousel Navigation */}
            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentTestimonial 
                        ? 'bg-gradient-to-r from-primary-500 to-purple-500 w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 font-playful">
                Ready to Start Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                  Learning Adventure?
                </span>
          </h2>
              <p className="text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                Join thousands of students and teachers already using Edu-Learn. 
                Experience the future of education with VR, AI, and global connections!
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/signup/student" className="bg-white text-primary-600 hover:bg-gray-100 font-bold text-xl py-6 px-12 rounded-3xl transition-all duration-500 transform hover:-translate-y-2 shadow-2xl hover:shadow-3xl flex items-center gap-3 hover:scale-105 animate-fade-in-up" style={{animationDelay: '200ms'}}>
                <Users className="w-6 h-6" />
                Start Learning Now
                <ArrowRight className="w-6 h-6" />
              </Link>
              <Link to="/signup/teacher" className="bg-transparent border-3 border-white text-white hover:bg-white hover:text-primary-600 font-bold text-xl py-6 px-12 rounded-3xl transition-all duration-500 transform hover:-translate-y-2 flex items-center gap-3 hover:scale-105 animate-fade-in-up" style={{animationDelay: '400ms'}}>
                <Award className="w-6 h-6" />
                Become a Teacher
              </Link>
            </div>
            
            <div className="flex items-center justify-center gap-12 pt-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">50K+</div>
                <div className="text-white/80">Happy Students</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white">1K+</div>
                <div className="text-white/80">Expert Teachers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white">95%</div>
                <div className="text-white/80">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
