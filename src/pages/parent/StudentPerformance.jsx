import React from 'react';
import { BarChart3, Award, TrendingUp, BookOpen, CheckCircle, XCircle, Clock } from 'lucide-react';

function StudentPerformance() {
  const studentData = {
    name: "Emma Johnson",
    grade: "Grade 7",
    overallProgress: 75,
    averageScore: 82,
    badgesEarned: 12,
    recentScores: [
      { subject: "Math", score: 88, date: "2023-10-26" },
      { subject: "Science", score: 75, date: "2023-10-25" },
      { subject: "English", score: 92, date: "2023-10-24" },
      { subject: "History", score: 78, date: "2023-10-23" },
    ],
    upcomingAssignments: [
      { title: "Algebra II Quiz", dueDate: "2023-11-01", status: "pending" },
      { title: "Biology Project", dueDate: "2023-11-05", status: "pending" },
    ],
    engagement: {
      liveClasses: 8,
      modulesCompleted: 15,
      aiTutorSessions: 5
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 font-playful">
          {studentData.name}'s Performance Overview 📈
        </h1>
        <p className="text-gray-600 mt-2">Track your child's progress and achievements</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card p-6 flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-primary-600">{studentData.overallProgress}%</p>
            <p className="text-gray-600 text-sm">Overall Progress</p>
          </div>
          <TrendingUp className="w-8 h-8 text-primary-500" />
        </div>
        <div className="card p-6 flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-purple-600">{studentData.averageScore}%</p>
            <p className="text-gray-600 text-sm">Average Score</p>
          </div>
          <BarChart3 className="w-8 h-8 text-purple-500" />
        </div>
        <div className="card p-6 flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-mint-600">{studentData.badgesEarned}</p>
            <p className="text-gray-600 text-sm">Badges Earned</p>
          </div>
          <Award className="w-8 h-8 text-mint-500" />
        </div>
        <div className="card p-6 flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-yellow-600">{studentData.grade}</p>
            <p className="text-gray-600 text-sm">Current Grade</p>
          </div>
          <BookOpen className="w-8 h-8 text-yellow-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Scores */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary-600" /> Recent Assignment Scores
          </h2>
          <div className="space-y-4">
            {studentData.recentScores.length > 0 ? (
              studentData.recentScores.map((score, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-800">{score.subject}</p>
                    <p className="text-sm text-gray-600">{score.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-800">{score.score}%</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      score.score >= 80 ? 'bg-mint-100 text-mint-700' :
                      score.score >= 60 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {score.score >= 80 ? 'Excellent' : score.score >= 60 ? 'Good' : 'Needs Work'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">No recent scores available.</p>
            )}
          </div>
        </div>

        {/* Upcoming Assignments */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-600" /> Upcoming Assignments
          </h2>
          <div className="space-y-4">
            {studentData.upcomingAssignments.length > 0 ? (
              studentData.upcomingAssignments.map((assignment, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-800">{assignment.title}</p>
                    <p className="text-sm text-gray-600">Due: {assignment.dueDate}</p>
                  </div>
                  <div>
                    {assignment.status === 'pending' ? (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Pending</span>
                    ) : (
                      <span className="text-xs bg-mint-100 text-mint-700 px-2 py-1 rounded-full">Completed</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">No upcoming assignments.</p>
            )}
          </div>
        </div>
      </div>

      {/* Engagement Overview */}
      <div className="card p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-mint-600" /> Engagement Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-mint-600">{studentData.engagement.liveClasses}</p>
            <p className="text-gray-600 text-sm">Live Classes Attended</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary-600">{studentData.engagement.modulesCompleted}</p>
            <p className="text-gray-600 text-sm">Modules Completed</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-purple-600">{studentData.engagement.aiTutorSessions}</p>
            <p className="text-gray-600 text-sm">AI Tutor Sessions</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentPerformance;