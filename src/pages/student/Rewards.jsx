import React, { useState } from 'react';
import { Star, Trophy, Award, Gift, Target, Zap, Crown, Medal, Badge, Lock } from 'lucide-react';

function Rewards() {
  const [activeTab, setActiveTab] = useState('achievements');
  
  // Empty state - no rewards earned yet
  const earnedRewards = [];
  const availableRewards = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Complete your first lesson',
      icon: Star,
      points: 50,
      category: 'achievement',
      rarity: 'common',
      earned: false
    },
    {
      id: 2,
      title: 'Math Wizard',
      description: 'Complete 10 math problems correctly',
      icon: Trophy,
      points: 100,
      category: 'achievement',
      rarity: 'rare',
      earned: false
    },
    {
      id: 3,
      title: 'Perfect Score',
      description: 'Get 100% on any quiz',
      icon: Crown,
      points: 200,
      category: 'achievement',
      rarity: 'epic',
      earned: false
    },
    {
      id: 4,
      title: 'Week Warrior',
      description: 'Study for 7 consecutive days',
      icon: Zap,
      points: 150,
      category: 'streak',
      rarity: 'rare',
      earned: false
    },
    {
      id: 5,
      title: 'Knowledge Seeker',
      description: 'Complete 5 different courses',
      icon: Badge,
      points: 300,
      category: 'achievement',
      rarity: 'legendary',
      earned: false
    },
    {
      id: 6,
      title: 'Helping Hand',
      description: 'Help 3 classmates with their questions',
      icon: Medal,
      points: 75,
      category: 'social',
      rarity: 'common',
      earned: false
    }
  ];

  const tabs = [
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'badges', label: 'Badges', icon: Award },
    { id: 'points', label: 'Points Shop', icon: Gift }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-500';
      case 'rare': return 'from-blue-400 to-blue-500';
      case 'epic': return 'from-purple-400 to-purple-500';
      case 'legendary': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const renderAchievements = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {availableRewards.map(reward => {
        const IconComponent = reward.icon;
        return (
          <div
            key={reward.id}
            className={`relative bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 ${
              reward.earned 
                ? 'border-primary-300 bg-gradient-to-br from-primary-50 to-purple-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {!reward.earned && (
              <div className="absolute top-4 right-4">
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
            )}
            
            <div className={`w-16 h-16 bg-gradient-to-br ${getRarityColor(reward.rarity)} rounded-2xl flex items-center justify-center mx-auto mb-4 ${
              !reward.earned ? 'opacity-50' : ''
            }`}>
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            
            <h3 className={`text-xl font-bold text-center mb-2 ${
              reward.earned ? 'text-gray-800' : 'text-gray-500'
            }`}>
              {reward.title}
            </h3>
            
            <p className={`text-sm text-center mb-4 ${
              reward.earned ? 'text-gray-600' : 'text-gray-400'
            }`}>
              {reward.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                reward.earned 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'bg-gray-100 text-gray-500'
              }`}>
                {reward.points} points
              </span>
              
              <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                reward.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-700' :
                reward.rarity === 'epic' ? 'bg-purple-100 text-purple-700' :
                reward.rarity === 'rare' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {reward.rarity}
              </span>
            </div>
            
            {reward.earned && (
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  const renderPointsShop = () => (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">🛍️</div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Points Shop Coming Soon!</h3>
      <p className="text-gray-600 mb-6">Use your earned points to unlock special rewards and features</p>
      <div className="bg-gradient-to-r from-primary-100 to-purple-100 rounded-xl p-6 max-w-md mx-auto">
        <h4 className="font-semibold text-gray-800 mb-2">Coming Soon:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Custom avatars and themes</li>
          <li>• Special study tools</li>
          <li>• Exclusive content access</li>
          <li>• Virtual gifts for friends</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
          <Star className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 font-playful">Rewards</h1>
          <p className="text-gray-600">Earn achievements and unlock amazing rewards!</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{earnedRewards.length}</p>
              <p className="text-yellow-100 text-sm">Achievements Earned</p>
            </div>
            <Trophy className="w-8 h-8 text-white/80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">0</p>
              <p className="text-blue-100 text-sm">Total Points</p>
            </div>
            <Zap className="w-8 h-8 text-white/80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">0</p>
              <p className="text-purple-100 text-sm">Current Streak</p>
            </div>
            <Target className="w-8 h-8 text-white/80" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
        {tabs.map(tab => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <IconComponent className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        {activeTab === 'achievements' && renderAchievements()}
        {activeTab === 'badges' && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Badges Yet</h3>
            <p className="text-gray-600">Complete achievements to earn badges!</p>
          </div>
        )}
        {activeTab === 'points' && renderPointsShop()}
      </div>
    </div>
  );
}

export default Rewards;
