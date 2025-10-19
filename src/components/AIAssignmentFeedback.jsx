import React, { useState } from 'react';
import { Sparkles, Loader, CheckCircle, AlertCircle, TrendingUp, MessageSquare } from 'lucide-react';
import axios from 'axios';

const AIAssignmentFeedback = ({ submissionId, onFeedbackGenerated }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleGenerateFeedback = async () => {
    setIsGenerating(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:5000/api/ai/assignment-feedback/${submissionId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setFeedback(response.data.data);
      setShowModal(true);
    } catch (error) {
      console.error('AI Feedback error:', error);
      alert(error.response?.data?.message || 'Failed to generate feedback. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUseFeedback = () => {
    if (onFeedbackGenerated && feedback) {
      onFeedbackGenerated({
        grade: feedback.suggestedGrade,
        feedback: `${feedback.feedback}\n\n${feedback.encouragement}`
      });
    }
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={handleGenerateFeedback}
        disabled={isGenerating}
        className="btn-secondary flex items-center gap-2 disabled:opacity-50"
      >
        {isGenerating ? (
          <>
            <Loader className="w-4 h-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            AI Feedback
          </>
        )}
      </button>

      {showModal && feedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">AI-Generated Feedback</h2>
                  <p className="text-sm text-gray-600">Review and customize before applying</p>
                </div>
              </div>

              {/* Suggested Grade */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-800">Suggested Grade</h3>
                </div>
                <p className="text-3xl font-bold text-purple-600">{feedback.suggestedGrade}</p>
              </div>

              {/* Strengths */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-gray-800">Strengths</h3>
                </div>
                <ul className="space-y-2">
                  {feedback.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Areas for Improvement */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  <h3 className="font-semibold text-gray-800">Areas for Improvement</h3>
                </div>
                <ul className="space-y-2">
                  {feedback.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Detailed Feedback */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-800">Detailed Feedback</h3>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{feedback.feedback}</p>
                </div>
              </div>

              {/* Encouragement */}
              <div className="mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700 italic">{feedback.encouragement}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUseFeedback}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Use This Feedback
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                You can edit the feedback after applying it
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssignmentFeedback;
