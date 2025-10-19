import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Star, Users, Award, BookOpen, Video, Trophy, Check, ArrowRight,
  Play, Sparkles, Zap, Globe, Brain, Gamepad2, ChevronLeft,
  ChevronRight, Quote, Clock, Shield, Target, TrendingUp, Heart
} from 'lucide-react';

function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const features = [
    {
      icon: Video,
      title: "Live Interactive Classes",
      description: "Join real-time sessions with expert teachers and collaborate with students worldwide",
      color: "from-gold-400 to-gold-600"
    },
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Personalized AI tutors adapt to your learning style and provide instant help 24/7",
      color: "from-gold-500 to-gold-700"
    },
    {
      icon: Gamepad2,
      title: "Gamified Experience",
      description: "Earn points, unlock achievements, and compete on leaderboards while learning",
      color: "from-gold-400 to-gold-600"
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connect with learners from around the world and share cultural experiences",
      color: "from-gold-500 to-gold-700"
    }
  ];

  const stats = [
    { icon: Users, value: "50K+", label: "Active Students", description: "Join our thriving community" },
    { icon: Award, value: "1K+", label: "Expert Teachers", description: "Learn from the best" },
    { icon: TrendingUp, value: "95%", label: "Success Rate", description: "Proven results" },
    { icon: Clock, value: "24/7", label: "Learning Access", description: "Study anytime" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Parent",
      text: "My children's grades improved by 40% in just 3 months. The interactive approach makes learning fun!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop",
      icon: "🌟"
    },
    {
      name: "Michael Chen",
      role: "Student",
      text: "The AI tutor helped me understand complex math concepts I struggled with for years. Amazing platform!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      icon: "🚀"
    },
    {
      name: "Emily Davis",
      role: "Teacher",
      text: "This platform revolutionized my teaching. The analytics and tools help me track every student's progress.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      icon: "📚"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen bg-charcoal-900">
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-charcoal-800">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>

        <div className="absolute top-20 left-10 w-72 h-72 bg-gold-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-6 py-3 backdrop-blur-sm">
                <Sparkles className="w-5 h-5 text-gold-500" />
                <span className="text-ivory-100 font-medium">Welcome to the Future of Education</span>
              </div>

              <h1 className="text-6xl md:text-7xl font-bold text-ivory-100 leading-tight">
                Master Your
                <span className="block text-transparent bg-clip-text bg-gradient-gold mt-2">
                  Learning Journey
                </span>
              </h1>

              <p className="text-xl text-ivory-200 leading-relaxed">
                Experience world-class education with AI-powered tutors, live interactive classes,
                and a global community of learners. Start your transformation today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup/student"
                  className="group bg-gradient-gold hover:shadow-gold text-charcoal-900 font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  <Users className="w-6 h-6" />
                  Start Learning Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/pricing"
                  className="bg-charcoal-800 hover:bg-charcoal-700 border-2 border-gold-500/30 hover:border-gold-500 text-ivory-100 font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Trophy className="w-6 h-6 text-gold-500" />
                  View Plans
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gold-500">50K+</div>
                  <div className="text-sm text-ivory-300">Students</div>
                </div>
                <div className="w-px h-12 bg-gold-500/20"></div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gold-500">1K+</div>
                  <div className="text-sm text-ivory-300">Teachers</div>
                </div>
                <div className="w-px h-12 bg-gold-500/20"></div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gold-500">95%</div>
                  <div className="text-sm text-ivory-300">Success</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-charcoal-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gold-500/20 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <div className="aspect-video bg-gradient-to-br from-charcoal-700 to-charcoal-900 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gold-500/5"></div>
                  <Play className="w-20 h-20 text-gold-500 relative z-10" />
                  <div className="absolute top-4 right-4 bg-green-500 text-ivory-100 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <div className="w-2 h-2 bg-ivory-100 rounded-full animate-pulse"></div>
                    LIVE
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-gold rounded-xl flex items-center justify-center">
                        <Brain className="w-6 h-6 text-charcoal-900" />
                      </div>
                      <div>
                        <p className="font-bold text-ivory-100">AI Advanced Mathematics</p>
                        <p className="text-sm text-ivory-300">2,847 students enrolled</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gold-500">+250</p>
                      <p className="text-xs text-ivory-300">Points</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-charcoal-800/80 backdrop-blur-xl rounded-2xl p-4 border border-gold-500/20 shadow-xl z-20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-charcoal-900" />
                  </div>
                  <div>
                    <p className="font-bold text-ivory-100 text-sm">Top Performer</p>
                    <p className="text-xs text-ivory-300">Achievement Unlocked</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-charcoal-800/80 backdrop-blur-xl rounded-2xl p-4 border border-gold-500/20 shadow-xl z-20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-gold rounded-full flex items-center justify-center">
                    <Globe className="w-5 h-5 text-charcoal-900" />
                  </div>
                  <div>
                    <p className="font-bold text-ivory-100 text-sm">Global</p>
                    <p className="text-xs text-ivory-300">15 Countries</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-charcoal-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-gold"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-6 py-3 mb-6">
              <Sparkles className="w-5 h-5 text-gold-500" />
              <span className="text-ivory-100 font-medium">Premium Features</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-ivory-100 mb-6">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-gold">Edu-Learn</span>
            </h2>
            <p className="text-xl text-ivory-300 max-w-3xl mx-auto">
              Discover the powerful features that make learning effective, engaging, and enjoyable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-charcoal-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gold-500/10 hover:border-gold-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-charcoal-900" />
                </div>
                <h3 className="text-2xl font-bold text-ivory-100 mb-4 group-hover:text-gold-500 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-ivory-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center bg-charcoal-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gold-500/10 hover:border-gold-500/30 transition-all duration-300 hover:scale-105"
              >
                <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <stat.icon className="w-8 h-8 text-charcoal-900" />
                </div>
                <div className="text-5xl font-bold text-gold-500 mb-2">{stat.value}</div>
                <h3 className="text-xl font-semibold text-ivory-100 mb-2">{stat.label}</h3>
                <p className="text-ivory-300 text-sm">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-charcoal-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-6 py-3 mb-6">
              <Quote className="w-5 h-5 text-gold-500" />
              <span className="text-ivory-100 font-medium">Success Stories</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-ivory-100 mb-6">
              What Our <span className="text-transparent bg-clip-text bg-gradient-gold">Community Says</span>
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-3xl">
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-charcoal-800/50 backdrop-blur-xl rounded-3xl p-12 border border-gold-500/20">
                      <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-shrink-0">
                          <div className="relative">
                            <img
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              className="w-24 h-24 rounded-full object-cover border-4 border-gold-500/30"
                            />
                            <div className="absolute -bottom-2 -right-2 text-4xl">{testimonial.icon}</div>
                          </div>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                          <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 text-gold-500 fill-current" />
                            ))}
                          </div>
                          <p className="text-xl text-ivory-100 leading-relaxed mb-6 italic">
                            "{testimonial.text}"
                          </p>
                          <div>
                            <p className="font-bold text-ivory-100 text-lg">{testimonial.name}</p>
                            <p className="text-gold-500">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="w-12 h-12 bg-charcoal-800 hover:bg-gold-500 rounded-full flex items-center justify-center transition-all duration-300 border border-gold-500/20"
              >
                <ChevronLeft className="w-6 h-6 text-ivory-100" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? 'bg-gold-500 w-8'
                        : 'bg-charcoal-700 w-2 hover:bg-charcoal-600'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="w-12 h-12 bg-charcoal-800 hover:bg-gold-500 rounded-full flex items-center justify-center transition-all duration-300 border border-gold-500/20"
              >
                <ChevronRight className="w-6 h-6 text-ivory-100" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-gold-600 via-gold-500 to-gold-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-charcoal-900 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-charcoal-900 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-6xl font-bold text-charcoal-900 mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-2xl text-charcoal-800 mb-12 max-w-3xl mx-auto">
            Join thousands of students and teachers transforming education. Begin your learning adventure today.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/signup/student"
              className="group bg-charcoal-900 hover:bg-charcoal-800 text-ivory-100 font-bold text-xl py-6 px-12 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-2xl flex items-center gap-3"
            >
              <Users className="w-6 h-6" />
              Start Learning Now
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/signup/teacher"
              className="bg-transparent border-3 border-charcoal-900 hover:bg-charcoal-900 text-charcoal-900 hover:text-ivory-100 font-bold text-xl py-6 px-12 rounded-2xl transition-all duration-300 flex items-center gap-3"
            >
              <Award className="w-6 h-6" />
              Become a Teacher
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
