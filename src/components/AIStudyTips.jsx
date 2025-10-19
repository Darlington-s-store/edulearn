import React, { useState, useEffect } from 'react';
import { Lightbulb, Loader, RefreshCw, Clock, BookOpen, Target, Zap } from 'lucide-react';
import axios from 'axios';

const AIStudyTips = () => {
  const [tips, setTips] = useState([]);
  const [performance, setPerformance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudyTips();
  }, []);

  const fetchStudyTips = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:5000/api/ai/study-tips',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTips(response.data.data.tips);
      setPerformance(response.data.data.performance);
      setError(null);
    } catch (error) {
      console.error('Study tips error:', error);
      setError('Failed to load study tips');
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'time_management':
        return <Clock className="w-5 h-5" />;
      case 'study_technique':
        return <BookOpen className="w-5 h-5" />;
      case 'subject_specific':
        return <Target className="w-5 h-5" />;
      case 'motivation':
        return <Zap className="w-5 h-5" />;
      default:
        return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'time_management':
        return 'from-blue-500 to-cyan-500';
      case 'study_technique':
        return 'from-green-500 to-emerald-500';
      case 'subject_specific':
        return 'from-purple-500 to-pink-500';
      case 'motivation':
        return 'from-orange-500 to-red-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-center py-8">
          <Loader className="w-8 h-8 animate-spin text-yellow-600" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="text-center py-8">
          <p className="text-gray-600">{error}</p>
          <button
            onClick={fetchStudyTips}
            className="mt-4 text-yellow-600 hover:text-yellow-700 font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-2 rounded-lg">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">AI Study Tips</h2>
            <p className="text-sm text-gray-600">Personalized advice based on your performance</p>
          </div>
        </div>
        <button
          onClick={fetchStudyTips}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Refresh tips"
        >
          <RefreshCw className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Performance Summary */}
      {performance && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-blue-600">{performance.avgQuizScore}%</p>
            <p className="text-xs text-gray-600">Avg Quiz Score</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-green-600">{performance.completionRate}%</p>
            <p className="text-xs text-gray-600">Completion Rate</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-purple-600">{performance.strongAreas?.length || 0}</p>
            <p className="text-xs text-gray-600">Strong Areas</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-orange-600">{performance.strugglingAreas?.length || 0}</p>
            <p className="text-xs text-gray-600">Areas to Improve</p>
          </div>
        </div>
      )}

      {/* Tips */}
      {tips.length === 0 ? (
        <div className="text-center py-8">
          <Lightbulb className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">Complete some quizzes and assignments to get personalized tips!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className={`bg-gradient-to-r ${getCategoryColor(tip.category)} p-2 rounded-lg text-white flex-shrink-0`}>
                  {getCategoryIcon(tip.category)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-2">{tip.title}</h3>
                  <p className="text-sm text-gray-600">{tip.description}</p>
                  <div className="mt-2">
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                      {tip.category.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIStudyTips;
