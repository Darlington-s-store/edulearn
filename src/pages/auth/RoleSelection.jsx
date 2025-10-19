import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Users, User, Sparkles, ArrowRight } from 'lucide-react';

function RoleSelection() {
  const roles = [
    {
      type: 'student',
      icon: GraduationCap,
      title: 'Student',
      description: 'Join live classes, earn points, and learn with AI tutors',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      loginPath: '/login/student',
      signupPath: '/signup/student'
    },
    {
      type: 'parent',
      icon: Users,
      title: 'Parent',
      description: 'Monitor progress, support learning, and ensure safe education',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      loginPath: '/login/parent',
      signupPath: '/signup/parent'
    },
    {
      type: 'teacher',
      icon: User,
      title: 'Teacher',
      description: 'Create content, manage classes, and inspire students',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      loginPath: '/login/teacher',
      signupPath: '/signup/teacher'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-6">
            <Sparkles className="w-8 h-8 text-primary-600 animate-pulse" />
            <h1 className="text-5xl font-bold text-gray-800 font-playful">Choose Your Role</h1>
            <Sparkles className="w-8 h-8 text-primary-600 animate-pulse" />
          </div>
          <p className="text-xl text-gray-600">Select how you want to join Edu-Learn</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <div
                key={role.type}
                className="bg-white rounded-3xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${role.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <IconComponent className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">{role.title}</h2>
                <p className="text-gray-600 text-center mb-8">{role.description}</p>
                
                <div className="space-y-3">
                  <Link
                    to={role.signupPath}
                    className={`w-full bg-gradient-to-r ${role.color} text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2`}
                  >
                    Sign Up
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  
                  <Link
                    to={role.loginPath}
                    className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                  >
                    Login
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link to="/" className="text-gray-600 hover:text-gray-800 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;
