import React, { useState, useEffect } from 'react';
import { Sparkles, BookOpen, TrendingUp, Loader, ArrowRight } from 'lucide-react';
import axios from 'axios';

const AIRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:5000/api/ai/recommendations',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setRecommendations(response.data.data);
      setError(null);
    } catch (error) {
      console.error('Recommendations error:', error);
      setError('Failed to load recommendations');
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-center py-8">
          <Loader className="w-8 h-8 animate-spin text-purple-600" />
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
            onClick={fetchRecommendations}
            className="mt-4 text-purple-600 hover:text-purple-700 font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">AI Recommendations</h2>
          <p className="text-sm text-gray-600">Personalized learning paths just for you</p>
        </div>
      </div>

      {recommendations.length === 0 ? (
        <div className="text-center py-8">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">Complete more courses to get personalized recommendations!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-800">
                      {rec.module?.title || 'Module'}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(rec.priority)}`}>
                      {rec.priority} priority
                    </span>
                  </div>
                  
                  {rec.module && (
                    <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {rec.module.subject}
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {rec.module.difficulty}
                      </span>
                    </div>
                  )}
                  
                  <p className="text-sm text-gray-700 mb-3">
                    <span className="font-medium">Why recommended:</span> {rec.reason}
                  </p>
                  
                  {rec.module?.description && (
                    <p className="text-sm text-gray-600 mb-3">
                      {rec.module.description}
                    </p>
                  )}
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <span>Start Learning</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={fetchRecommendations}
        className="w-full mt-4 text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center justify-center gap-2"
      >
        <Sparkles className="w-4 h-4" />
        Refresh Recommendations
      </button>
    </div>
  );
};

export default AIRecommendations;
