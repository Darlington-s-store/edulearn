import React from 'react';
import { 
  Trophy, 
  Star, 
  Award, 
  Target,
  TrendingUp,
  Calendar,
  BookOpen,
  Users,
  CheckCircle
} from 'lucide-react';

function Points() {
  const pointsData = {
    total: 1250,
    thisWeek: 180,
    thisMonth: 720,
    rank: 5,
    nextMilestone: 1500,
    level: 'Gold Scholar'
  };

  const recentActivities = [
    {
      id: 1,
      activity: 'Completed Math Assignment #5',
      points: 50,
      date: '2024-02-12',
      type: 'assignment',
      icon: BookOpen
    },
    {
      id: 2,
      activity: 'Attended Live Science Class',
      points: 25,
      date: '2024-02-12',
      type: 'attendance',
      icon: Users
    },
    {
      id: 3,
      activity: 'Perfect Quiz Score - English',
      points: 75,
      date: '2024-02-11',
      type: 'quiz',
      icon: Star
    },
    {
      id: 4,
      activity: 'Submitted History Project',
      points: 60,
      date: '2024-02-10',
      type: 'project',
      icon: CheckCircle
    },
    {
      id: 5,
      activity: 'Helped Classmate in Forum',
      points: 15,
      date: '2024-02-09',
      type: 'community',
      icon: Users
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'Perfect Attendance',
      description: 'Attended all classes this week',
      icon: Calendar,
      earned: true,
      points: 100
    },
    {
      id: 2,
      title: 'Quiz Master',
      description: 'Scored 90+ on 5 consecutive quizzes',
      icon: Star,
      earned: true,
      points: 150
    },
    {
      id: 3,
      title: 'Early Bird',
      description: 'Submit 10 assignments before deadline',
      icon: Target,
      earned: false,
      progress: 7,
      total: 10,
      points: 200
    },
    {
      id: 4,
      title: 'Community Helper',
      description: 'Help 20 classmates in discussion forums',
      icon: Users,
      earned: false,
      progress: 12,
      total: 20,
      points: 250
    }
  ];

  const getActivityColor = (type) => {
    switch (type) {
      case 'assignment':
        return 'bg-blue-100 text-blue-700';
      case 'attendance':
        return 'bg-mint-100 text-mint-700';
      case 'quiz':
        return 'bg-yellow-100 text-yellow-700';
      case 'project':
        return 'bg-purple-100 text-purple-700';
      case 'community':
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const progressToNext = (pointsData.total / pointsData.nextMilestone) * 100;

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 font-playful">Points & Rewards 🏆</h1>
        <p className="text-gray-600 mt-2">Track your progress and earn rewards for your achievements</p>
      </div>

      {/* Points Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card p-6 bg-gradient-to-br from-primary-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-primary-600">{pointsData.total}</p>
              <p className="text-gray-600 text-sm">Total Points</p>
            </div>
            <Trophy className="w-10 h-10 text-primary-500" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-mint-600">{pointsData.thisWeek}</p>
              <p className="text-gray-600 text-sm">This Week</p>
            </div>
            <TrendingUp className="w-8 h-8 text-mint-500" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-purple-600">#{pointsData.rank}</p>
              <p className="text-gray-600 text-sm">Class Rank</p>
            </div>
            <Award className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-yellow-600">{pointsData.level}</p>
              <p className="text-gray-600 text-sm">Current Level</p>
            </div>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Progress to Next Milestone */}
      <div className="card p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Progress to Next Milestone</h2>
          <span className="text-sm text-gray-600">{pointsData.total} / {pointsData.nextMilestone} points</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div 
            className="bg-gradient-to-r from-primary-500 to-purple-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${progressToNext}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>Current: {pointsData.level}</span>
          <span>{pointsData.nextMilestone - pointsData.total} points to Platinum Scholar</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary-600" />
            Recent Activities
          </h2>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getActivityColor(activity.type)}`}>
                    <activity.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{activity.activity}</p>
                    <p className="text-xs text-gray-500">{activity.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary-600">+{activity.points}</p>
                  <p className="text-xs text-gray-500">points</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-600" />
            Achievements
          </h2>
          
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className={`p-4 rounded-xl border-2 ${
                achievement.earned 
                  ? 'border-yellow-200 bg-yellow-50' 
                  : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      achievement.earned 
                        ? 'bg-yellow-100 text-yellow-600' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      <achievement.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${
                        achievement.earned ? 'text-yellow-800' : 'text-gray-600'
                      }`}>
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-medium ${
                    achievement.earned ? 'text-yellow-600' : 'text-gray-500'
                  }`}>
                    {achievement.points} pts
                  </span>
                </div>
                
                {!achievement.earned && achievement.progress && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{achievement.progress}/{achievement.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {achievement.earned && (
                  <div className="mt-2">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      Earned
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Points;
