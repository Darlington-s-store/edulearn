import React, { useState } from 'react';
import { Trophy, Award, Medal, Crown, Star, Users, TrendingUp, Calendar, Filter } from 'lucide-react';

function Leaderboard() {
  const [timeFilter, setTimeFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  
  // Empty state - no leaderboard data yet
  const leaderboardData = [];
  
  const timeFilters = [
    { id: 'all', label: 'All Time' },
    { id: 'month', label: 'This Month' },
    { id: 'week', label: 'This Week' },
    { id: 'today', label: 'Today' }
  ];

  const subjectFilters = [
    { id: 'all', label: 'All Subjects' },
    { id: 'math', label: 'Mathematics' },
    { id: 'science', label: 'Science' },
    { id: 'english', label: 'English' },
    { id: 'history', label: 'History' }
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankBadge = (rank) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-400';
      case 3: return 'bg-gradient-to-r from-amber-500 to-yellow-600';
      default: return 'bg-gradient-to-r from-blue-400 to-blue-500';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
          <Trophy className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 font-playful">Leaderboard</h1>
          <p className="text-gray-600">See how you rank among your peers!</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-500" />
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {timeFilters.map(filter => (
              <option key={filter.id} value={filter.id}>{filter.label}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {subjectFilters.map(filter => (
              <option key={filter.id} value={filter.id}>{filter.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">-</p>
              <p className="text-yellow-100 text-sm">Your Rank</p>
            </div>
            <Trophy className="w-8 h-8 text-white/80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">0</p>
              <p className="text-blue-100 text-sm">Your Points</p>
            </div>
            <Star className="w-8 h-8 text-white/80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">0</p>
              <p className="text-purple-100 text-sm">Total Students</p>
            </div>
            <Users className="w-8 h-8 text-white/80" />
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-2xl shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Global Rankings</h2>
          <p className="text-gray-600 text-sm">Rankings based on {timeFilters.find(f => f.id === timeFilter)?.label.toLowerCase()}</p>
        </div>
        
        <div className="p-6">
          {leaderboardData.length > 0 ? (
            <div className="space-y-4">
              {leaderboardData.map((student, index) => (
                <div
                  key={student.id}
                  className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                    student.isCurrentUser 
                      ? 'bg-gradient-to-r from-primary-100 to-purple-100 border-2 border-primary-300' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${getRankBadge(student.rank)} rounded-full flex items-center justify-center`}>
                      {getRankIcon(student.rank)}
                    </div>
                    <div>
                      <p className={`font-semibold ${student.isCurrentUser ? 'text-primary-700' : 'text-gray-800'}`}>
                        {student.name} {student.isCurrentUser && '(You)'}
                      </p>
                      <p className="text-sm text-gray-500">{student.school || 'Student'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">{student.points.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">points</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Rankings Yet</h3>
              <p className="text-gray-600 mb-6">Start participating in activities to see your rank!</p>
              <div className="bg-gradient-to-r from-primary-100 to-purple-100 rounded-xl p-6 max-w-md mx-auto">
                <h4 className="font-semibold text-gray-800 mb-2">How to earn points:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Complete assignments (+10-50 points)</li>
                  <li>• Attend live classes (+25 points)</li>
                  <li>• Help classmates (+15 points)</li>
                  <li>• Maintain study streaks (+5 points/day)</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Achievements</h2>
        {leaderboardData.length > 0 ? (
          <div className="space-y-3">
            {/* Achievement items would go here */}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🎯</div>
            <p className="text-gray-600">No recent achievements yet</p>
            <p className="text-sm text-gray-500">Complete activities to unlock achievements!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
