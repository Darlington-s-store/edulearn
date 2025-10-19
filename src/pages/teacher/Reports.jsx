import React, { useMemo, useState } from 'react';
import { 
  BarChart3, 
  Users, 
  TrendingUp,
  Calendar,
  Download,
  Filter,
  Eye,
  Award,
  Clock,
  Target
} from 'lucide-react';
import { useContent } from '../../contexts/ContentContextAPI';

 function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const { publishedContent } = useContent();
  const assignments = publishedContent?.assignments || [];
  const liveClasses = publishedContent?.liveClasses || [];
  const modules = publishedContent?.modules || [];

  const classStats = useMemo(() => {
    const totalStudents = Math.max(...assignments.map(a => a.totalStudents || 0), 0);
    const allSubs = assignments.flatMap(a => a.submissions || []);
    const graded = allSubs.filter(s => typeof s.grade === 'number');
    const averageGrade = graded.length ? Math.round(graded.reduce((sum, s) => sum + s.grade, 0) / graded.length) : 0;
    const completionRate = modules.length ? Math.round((modules.filter(m => (m.enrollments || []).some(e => (e.progress || 0) >= 100)).length / modules.length) * 100) : 0;
    const attendanceRate = liveClasses.length ? Math.round((liveClasses.reduce((sum, c) => sum + (c.attendees?.length || 0), 0) / (liveClasses.length * (totalStudents || 1))) * 100) : 0;
    const activeStudents = allSubs.length ? new Set(allSubs.map(s => s.studentId)).size : 0;
    return { totalStudents, activeStudents, averageGrade, completionRate, attendanceRate };
  }, [assignments, liveClasses, modules]);

  const students = [];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-mint-500" />;
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-500 transform rotate-180" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const getGradeColor = (grade) => {
    if (grade >= 90) return 'text-mint-600';
    if (grade >= 80) return 'text-yellow-600';
    if (grade >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 font-playful">Student Reports 📊</h1>
            <p className="text-gray-600 mt-2">Track student progress and performance analytics</p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <button className="btn-secondary flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="btn-primary flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Subjects</option>
            <option value="math">Mathematics</option>
            <option value="science">Science</option>
            <option value="english">English</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
          <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            <option value="all">All Classes</option>
            <option value="8a">Grade 8A</option>
            <option value="8b">Grade 8B</option>
          </select>
        </div>
      </div>

      {/* Class Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-primary-600">{classStats.totalStudents}</p>
              <p className="text-gray-600 text-sm">Total Students</p>
            </div>
            <Users className="w-8 h-8 text-primary-500" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-mint-600">{classStats.activeStudents}</p>
              <p className="text-gray-600 text-sm">Active Students</p>
            </div>
            <Target className="w-8 h-8 text-mint-500" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-yellow-600">{classStats.averageGrade}%</p>
              <p className="text-gray-600 text-sm">Average Grade</p>
            </div>
            <Award className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-purple-600">{classStats.completionRate}%</p>
              <p className="text-gray-600 text-sm">Completion Rate</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-pink-600">{classStats.attendanceRate}%</p>
              <p className="text-gray-600 text-sm">Attendance</p>
            </div>
            <Calendar className="w-8 h-8 text-pink-500" />
          </div>
        </div>
      </div>

      {/* Student Performance Table */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Student Performance</h2>
          <button className="btn-secondary flex items-center gap-2 text-sm">
            <Eye className="w-4 h-4" />
            View Details
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Student</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Points</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Assignments</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Avg Grade</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Attendance</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Last Active</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Trend</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-500">No data yet. Reports will appear after students start participating.</td>
                </tr>
              ) : students.map((student) => (
                <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={student.avatar} 
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{student.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-primary-600">{student.totalPoints}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        {student.assignmentsCompleted}/{student.assignmentsTotal}
                      </span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-mint-500 h-2 rounded-full"
                          style={{ width: `${(student.assignmentsCompleted / student.assignmentsTotal) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-semibold ${getGradeColor(student.averageGrade)}`}>
                      {student.averageGrade}%
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-700">{student.attendance}%</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-500">{student.lastActive}</span>
                  </td>
                  <td className="py-4 px-4">
                    {getTrendIcon(student.trend)}
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Chart Placeholder */}
      <div className="mt-8 card p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Class Performance Trends</h2>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Performance chart would be displayed here</p>
            <p className="text-sm text-gray-400">Integration with charting library needed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
