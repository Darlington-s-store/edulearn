import React, { useMemo, useState } from 'react';
import { Calendar, Video, Users, Clock, Play, CheckCircle, Settings, BarChart3, MessageCircle, Monitor, PenTool, UserCheck, Eye, Edit3, Award, TrendingUp, Activity, Mic, MicOff, Camera, CameraOff, Volume2, VolumeX, Shield, AlertTriangle, Download, FileText, Zap, Bell, Star } from 'lucide-react';
import { useContent } from '../../contexts/ContentContextAPI';
import LiveClassSetupModal from '../../components/LiveClassSetupModal';

function LiveClasses() {
  const [activeTab, setActiveTab] = useState('scheduled');
  const [selectedClass, setSelectedClass] = useState(null);
  const [showClassDetails, setShowClassDetails] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showModerationPanel, setShowModerationPanel] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [classSettings, setClassSettings] = useState({
    allowChat: true,
    allowMicrophone: true,
    allowCamera: true,
    allowScreenShare: false,
    recordSession: true,
    waitingRoomEnabled: false
  });
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [newClassSetup, setNewClassSetup] = useState({
    title: '',
    subject: '',
    description: '',
    scheduledDate: '',
    scheduledTime: '',
    duration: 60,
    maxStudents: 50,
    allowLateJoin: true,
    autoRecord: true,
    enableBreakoutRooms: false,
    numberOfBreakoutRooms: 4,
    enablePolls: true,
    enableWhiteboard: true,
    enableScreenShare: true,
    enableChat: true,
    chatModeration: false,
    waitingRoom: false,
    requirePassword: false,
    password: '',
    sendReminders: true,
    reminderTime: 15,
    muteOnEntry: false,
    hostVideoOn: true,
    participantVideoOn: true
  });
  const { publishedContent, publishLiveClass } = useContent();
  
  const handleSaveLiveClass = (classData) => {
    // Create the live class object
    const liveClassToPublish = {
      title: classData.title,
      subject: classData.subject,
      description: classData.description,
      scheduledDate: classData.scheduledDate,
      scheduledTime: classData.scheduledTime,
      duration: classData.duration,
      teacher: 'Current Teacher', // This would come from auth context
      maxStudents: classData.maxStudents,
      settings: {
        allowLateJoin: classData.allowLateJoin,
        autoRecord: classData.autoRecord,
        enableBreakoutRooms: classData.enableBreakoutRooms,
        numberOfBreakoutRooms: classData.numberOfBreakoutRooms,
        enablePolls: classData.enablePolls,
        enableWhiteboard: classData.enableWhiteboard,
        enableScreenShare: classData.enableScreenShare,
        enableChat: classData.enableChat,
        chatModeration: classData.chatModeration,
        waitingRoom: classData.waitingRoom,
        requirePassword: classData.requirePassword,
        password: classData.password,
        sendReminders: classData.sendReminders,
        reminderTime: classData.reminderTime,
        muteOnEntry: classData.muteOnEntry,
        hostVideoOn: classData.hostVideoOn,
        participantVideoOn: classData.participantVideoOn
      }
    };
    
    // Publish the live class
    publishLiveClass(liveClassToPublish);
    
    // Reset the form
    setNewClassSetup({
      title: '',
      subject: '',
      description: '',
      scheduledDate: '',
      scheduledTime: '',
      duration: 60,
      maxStudents: 50,
      allowLateJoin: true,
      autoRecord: true,
      enableBreakoutRooms: false,
      numberOfBreakoutRooms: 4,
      enablePolls: true,
      enableWhiteboard: true,
      enableScreenShare: true,
      enableChat: true,
      chatModeration: false,
      waitingRoom: false,
      requirePassword: false,
      password: '',
      sendReminders: true,
      reminderTime: 15,
      muteOnEntry: false,
      hostVideoOn: true,
      participantVideoOn: true
    });
    
    // Show success message
    alert('Live class scheduled successfully!');
  };
  
  // Mock attendance and participation data
  const attendanceData = {
    totalStudents: 25,
    presentStudents: 22,
    lateJoins: 3,
    earlyLeaves: 1,
    participationRate: 85,
    averageEngagement: 78
  };
  
  const studentParticipation = [
    { name: 'Alice Johnson', joinTime: '10:00 AM', status: 'present', participation: 95, handsRaised: 3, chatMessages: 8 },
    { name: 'Bob Smith', joinTime: '10:02 AM', status: 'present', participation: 78, handsRaised: 1, chatMessages: 5 },
    { name: 'Carol Davis', joinTime: '10:00 AM', status: 'present', participation: 92, handsRaised: 2, chatMessages: 12 },
    { name: 'David Wilson', joinTime: '10:05 AM', status: 'late', participation: 65, handsRaised: 0, chatMessages: 2 },
    { name: 'Emma Brown', joinTime: '10:01 AM', status: 'present', participation: 88, handsRaised: 4, chatMessages: 7 },
    { name: 'Frank Miller', joinTime: '10:00 AM', status: 'left_early', participation: 45, handsRaised: 1, chatMessages: 3 }
  ];
  
  // Advanced analytics data
  const classAnalytics = {
    totalDuration: 45,
    averageAttentionSpan: 38,
    peakEngagementTime: '10:15 AM',
    questionsAnswered: 12,
    pollsCompleted: 3,
    breakoutRoomsUsed: 4,
    screenShareDuration: 15,
    whiteboardUsage: 8,
    chatActivity: {
      totalMessages: 47,
      averagePerStudent: 2.1,
      mostActiveStudent: 'Carol Davis'
    },
    technicalIssues: 2,
    studentSatisfaction: 4.6
  };
  
  // Moderation actions
  const moderationActions = [
    { id: 1, student: 'David Wilson', action: 'Muted microphone', time: '10:15 AM', reason: 'Background noise' },
    { id: 2, student: 'Emma Brown', action: 'Granted presenter rights', time: '10:25 AM', reason: 'Student presentation' },
    { id: 3, student: 'Bob Smith', action: 'Moved to breakout room', time: '10:30 AM', reason: 'Group activity' }
  ];
  const all = publishedContent?.liveClasses || [];
  const classesByTab = useMemo(() => {
    const scheduled = [];
    const live = [];
    const completed = [];
    all.forEach(c => {
      const base = {
        id: c.id,
        title: c.title,
        subject: c.subject,
        teacher: c.teacher,
        scheduledDate: c.scheduledDate,
        scheduledTime: c.scheduledTime,
        duration: c.duration,
        attendees: c.attendees?.length || 0,
        status: c.status || 'scheduled'
      };
      if (base.status === 'live') live.push(base); else if (base.status === 'completed') completed.push(base); else scheduled.push(base);
    });
    return { scheduled, live, completed };
  }, [all]);

  const tabMeta = {
    scheduled: { label: 'Scheduled', icon: Calendar },
    live: { label: 'Live', icon: Play },
    completed: { label: 'Completed', icon: CheckCircle }
  };

  const list = classesByTab[activeTab];

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 font-playful">Live Classes 🎥</h1>
            <p className="text-gray-600 mt-2">Schedule and manage your live sessions</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm font-medium">
              {classesByTab.live.length} Live Now
            </div>
            <div className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium">
              {classesByTab.scheduled.length} Scheduled
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Tab Navigation */}
      <div className="mb-6">
        <div className="flex bg-gray-100 rounded-xl p-1">
          {Object.keys(tabMeta).map(key => {
            const Icon = tabMeta[key].icon;
            const count = classesByTab[key].length;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                  activeTab === key ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {tabMeta[key].label}
                  {count > 0 && (
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      activeTab === key 
                        ? 'bg-primary-100 text-primary-700' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {count}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        {list.map(item => (
          <div key={item.id} className="card p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4 justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'live' ? 'bg-red-100 text-red-700' :
                    item.status === 'completed' ? 'bg-green-100 text-green-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {item.status === 'live' ? '🔴 Live' : 
                     item.status === 'completed' ? '✅ Completed' : 
                     '📅 Scheduled'}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="font-medium text-primary-600">{item.subject}</span>
                  <span className="inline-flex items-center gap-1"><Calendar className="w-4 h-4" />{item.scheduledDate} {item.scheduledTime}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="w-4 h-4" />{item.duration} min</span>
                  <span className="inline-flex items-center gap-1"><Users className="w-4 h-4" />{item.attendees} attendees</span>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  {item.status === 'scheduled' && (
                    <button 
                      onClick={() => {
                        setSelectedClass(item);
                        setShowClassDetails(true);
                      }}
                      className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Start Class
                    </button>
                  )}
                  {item.status === 'live' && (
                    <button 
                      onClick={() => {
                        setSelectedClass(item);
                        setShowClassDetails(true);
                      }}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                      <Video className="w-4 h-4" />
                      Manage Live Class
                    </button>
                  )}
                  <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
                    <Edit3 className="w-4 h-4" />
                    Edit
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Video className={`w-8 h-8 ${
                  item.status === 'live' ? 'text-red-500' :
                  item.status === 'completed' ? 'text-green-500' :
                  'text-purple-500'
                }`} />
                {item.status === 'live' && (
                  <div className="flex items-center gap-1 text-xs text-red-600">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span>LIVE</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {list.length === 0 && (
        <div className="text-center py-12">
          <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-500 mb-2">No {tabMeta[activeTab].label.toLowerCase()} classes</h3>
          <p className="text-gray-400">Schedule a new live class from Publish Content.</p>
        </div>
      )}
      
      {/* Class Management Modal */}
      {showClassDetails && selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedClass.title}</h2>
                  <p className="text-gray-600">{selectedClass.subject} • {selectedClass.scheduledDate} {selectedClass.scheduledTime}</p>
                </div>
                <button
                  onClick={() => setShowClassDetails(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              {/* Class Control Panel */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Users className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{selectedClass.attendees}</p>
                      <p className="text-sm text-blue-600">Students Online</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold text-green-600">12</p>
                      <p className="text-sm text-green-600">Chat Messages</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-8 h-8 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold text-purple-600">3</p>
                      <p className="text-sm text-purple-600">Active Polls</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="w-8 h-8 text-orange-600" />
                    <div>
                      <p className="text-2xl font-bold text-orange-600">45m</p>
                      <p className="text-sm text-orange-600">Duration</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Teacher Controls */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Teacher Controls</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowAnalytics(!showAnalytics)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        showAnalytics ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Analytics
                    </button>
                    <button
                      onClick={() => setShowModerationPanel(!showModerationPanel)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        showModerationPanel ? 'bg-red-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Moderation
                    </button>
                  </div>
                </div>
                
                {/* Primary Controls */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-4">
                  <button className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                    <Monitor className="w-5 h-5 text-blue-600" />
                    <span className="text-xs font-medium">Share Screen</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                    <PenTool className="w-5 h-5 text-green-600" />
                    <span className="text-xs font-medium">Whiteboard</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    <span className="text-xs font-medium">Create Poll</span>
                  </button>
                  <button 
                    onClick={() => setShowAttendance(!showAttendance)}
                    className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <UserCheck className="w-5 h-5 text-orange-600" />
                    <span className="text-xs font-medium">Attendance</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                    <Bell className="w-5 h-5 text-yellow-600" />
                    <span className="text-xs font-medium">Announce</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                    <Download className="w-5 h-5 text-indigo-600" />
                    <span className="text-xs font-medium">Export</span>
                  </button>
                </div>
                
                {/* Class Settings */}
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-3">Class Settings</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={classSettings.allowChat}
                        onChange={(e) => setClassSettings(prev => ({ ...prev, allowChat: e.target.checked }))}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">Allow Chat</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={classSettings.allowMicrophone}
                        onChange={(e) => setClassSettings(prev => ({ ...prev, allowMicrophone: e.target.checked }))}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">Allow Microphone</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={classSettings.recordSession}
                        onChange={(e) => setClassSettings(prev => ({ ...prev, recordSession: e.target.checked }))}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">Record Session</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={classSettings.waitingRoomEnabled}
                        onChange={(e) => setClassSettings(prev => ({ ...prev, waitingRoomEnabled: e.target.checked }))}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">Waiting Room</span>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Analytics Panel */}
              {showAnalytics && (
                <div className="bg-white border border-gray-200 rounded-lg mb-6">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Live Class Analytics
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Clock className="w-6 h-6 text-blue-600" />
                          <div>
                            <p className="text-lg font-bold text-blue-600">{classAnalytics.totalDuration}m</p>
                            <p className="text-sm text-blue-600">Total Duration</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center gap-3">
                          <TrendingUp className="w-6 h-6 text-green-600" />
                          <div>
                            <p className="text-lg font-bold text-green-600">{classAnalytics.averageAttentionSpan}m</p>
                            <p className="text-sm text-green-600">Avg Attention</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Award className="w-6 h-6 text-purple-600" />
                          <div>
                            <p className="text-lg font-bold text-purple-600">{classAnalytics.questionsAnswered}</p>
                            <p className="text-sm text-purple-600">Questions Answered</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Star className="w-6 h-6 text-yellow-600" />
                          <div>
                            <p className="text-lg font-bold text-yellow-600">{classAnalytics.studentSatisfaction}/5</p>
                            <p className="text-sm text-yellow-600">Satisfaction</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-3">Engagement Timeline</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Peak Engagement</span>
                            <span className="font-medium">{classAnalytics.peakEngagementTime}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Screen Share Used</span>
                            <span className="font-medium">{classAnalytics.screenShareDuration}m</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Whiteboard Usage</span>
                            <span className="font-medium">{classAnalytics.whiteboardUsage}m</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-3">Chat Activity</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Total Messages</span>
                            <span className="font-medium">{classAnalytics.chatActivity.totalMessages}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Avg per Student</span>
                            <span className="font-medium">{classAnalytics.chatActivity.averagePerStudent}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Most Active</span>
                            <span className="font-medium">{classAnalytics.chatActivity.mostActiveStudent}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Moderation Panel */}
              {showModerationPanel && (
                <div className="bg-white border border-gray-200 rounded-lg mb-6">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Class Moderation
                    </h3>
                  </div>
                  <div className="p-4">
                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                      <button className="flex items-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                        <MicOff className="w-4 h-4" />
                        Mute All
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors">
                        <CameraOff className="w-4 h-4" />
                        Disable Cameras
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        Disable Chat
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
                        <AlertTriangle className="w-4 h-4" />
                        Send Warning
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                        <Zap className="w-4 h-4" />
                        Spotlight
                      </button>
                    </div>
                    
                    {/* Recent Actions */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-3">Recent Moderation Actions</h4>
                      <div className="space-y-2">
                        {moderationActions.map((action) => (
                          <div key={action.id} className="flex items-center justify-between p-2 bg-white rounded border">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-sm font-medium">{action.student}</span>
                              <span className="text-sm text-gray-600">{action.action}</span>
                            </div>
                            <div className="text-xs text-gray-500">{action.time}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Student List with Participation Metrics */}
              <div className="bg-white border border-gray-200 rounded-lg">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <h3 className="text-lg font-semibold text-gray-800">Students in Class</h3>
                      {selectedStudents.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">({selectedStudents.length} selected)</span>
                          <button className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200 transition-colors">
                            Mute Selected
                          </button>
                          <button className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs hover:bg-yellow-200 transition-colors">
                            Move to Breakout
                          </button>
                          <button className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 transition-colors">
                            Send Message
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600">Present ({attendanceData.presentStudents})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-gray-600">Late ({attendanceData.lateJoins})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-gray-600">Left Early ({attendanceData.earlyLeaves})</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  {showAttendance ? (
                    <div className="space-y-4">
                      {/* Attendance Overview */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="flex items-center gap-3">
                            <UserCheck className="w-6 h-6 text-green-600" />
                            <div>
                              <p className="text-lg font-bold text-green-600">{Math.round((attendanceData.presentStudents / attendanceData.totalStudents) * 100)}%</p>
                              <p className="text-sm text-green-600">Attendance Rate</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Activity className="w-6 h-6 text-blue-600" />
                            <div>
                              <p className="text-lg font-bold text-blue-600">{attendanceData.participationRate}%</p>
                              <p className="text-sm text-blue-600">Participation</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <div className="flex items-center gap-3">
                            <TrendingUp className="w-6 h-6 text-purple-600" />
                            <div>
                              <p className="text-lg font-bold text-purple-600">{attendanceData.averageEngagement}%</p>
                              <p className="text-sm text-purple-600">Engagement</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Award className="w-6 h-6 text-orange-600" />
                            <div>
                              <p className="text-lg font-bold text-orange-600">{studentParticipation.reduce((sum, s) => sum + s.handsRaised, 0)}</p>
                              <p className="text-sm text-orange-600">Total Questions</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Detailed Student Participation */}
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-3 px-4 font-medium text-gray-700">Student</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-700">Join Time</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-700">Participation</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-700">Questions</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-700">Chat Messages</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {studentParticipation.map((student, index) => (
                              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4">
                                  <div className="flex items-center gap-3">
                                    <input
                                      type="checkbox"
                                      checked={selectedStudents.includes(student.name)}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          setSelectedStudents([...selectedStudents, student.name]);
                                        } else {
                                          setSelectedStudents(selectedStudents.filter(s => s !== student.name));
                                        }
                                      }}
                                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                    />
                                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                      {student.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <span className="font-medium text-gray-800">{student.name}</span>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-600">{student.joinTime}</td>
                                <td className="py-3 px-4">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    student.status === 'present' ? 'bg-green-100 text-green-700' :
                                    student.status === 'late' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-red-100 text-red-700'
                                  }`}>
                                    {student.status === 'present' ? 'Present' :
                                     student.status === 'late' ? 'Late' : 'Left Early'}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center gap-2">
                                    <div className="w-16 bg-gray-200 rounded-full h-2">
                                      <div 
                                        className={`h-2 rounded-full ${
                                          student.participation >= 80 ? 'bg-green-500' :
                                          student.participation >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                        }`}
                                        style={{ width: `${student.participation}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{student.participation}%</span>
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center gap-1">
                                    <span className="text-sm font-medium text-gray-700">{student.handsRaised}</span>
                                    <Award className="w-4 h-4 text-orange-500" />
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center gap-1">
                                    <span className="text-sm font-medium text-gray-700">{student.chatMessages}</span>
                                    <MessageCircle className="w-4 h-4 text-blue-500" />
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center gap-1">
                                    <button className="p-1 hover:bg-gray-100 rounded" title="Mute Student">
                                      <MicOff className="w-4 h-4 text-red-500" />
                                    </button>
                                    <button className="p-1 hover:bg-gray-100 rounded" title="Disable Camera">
                                      <CameraOff className="w-4 h-4 text-yellow-500" />
                                    </button>
                                    <button className="p-1 hover:bg-gray-100 rounded" title="Private Message">
                                      <MessageCircle className="w-4 h-4 text-blue-500" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {studentParticipation.map((student, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="font-medium text-gray-800">{student.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              student.status === 'present' ? 'bg-green-500' :
                              student.status === 'late' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></div>
                            <span className="text-xs text-gray-500">
                              {student.status === 'present' ? 'Online' :
                               student.status === 'late' ? 'Late' : 'Left Early'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={() => setShowClassDetails(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <div className="flex items-center gap-3">
                  {selectedClass.status === 'scheduled' && (
                    <button className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                      Start Class Now
                    </button>
                  )}
                  {selectedClass.status === 'live' && (
                    <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
                      End Class
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Quick Actions Bar */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button 
            onClick={() => {
              const now = new Date();
              setNewClassSetup(prev => ({ 
                ...prev, 
                scheduledDate: now.toISOString().split('T')[0], 
                scheduledTime: now.toTimeString().slice(0,5) 
              }));
              setShowSetupModal(true);
            }}
            className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all"
          >
            <Play className="w-6 h-6" />
            <div className="text-left">
              <p className="font-semibold">Start Instant Class</p>
              <p className="text-sm text-blue-100">Begin a class right now</p>
            </div>
          </button>
          
          <button 
            onClick={() => setShowSetupModal(true)}
            className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
          >
            <Calendar className="w-6 h-6" />
            <div className="text-left">
              <p className="font-semibold">Schedule Class</p>
              <p className="text-sm text-green-100">Plan a future session</p>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all">
            <BarChart3 className="w-6 h-6" />
            <div className="text-left">
              <p className="font-semibold">View Analytics</p>
              <p className="text-sm text-purple-100">Check class performance</p>
            </div>
          </button>
        </div>
        
        {/* Advanced Features */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Advanced Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-6 h-6 text-red-500" />
                <h4 className="font-medium text-gray-800">Class Security</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">Manage waiting rooms, passwords, and access controls</p>
              <button className="text-sm text-red-600 hover:text-red-700 font-medium">Configure →</button>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-6 h-6 text-blue-500" />
                <h4 className="font-medium text-gray-800">Auto Reports</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">Generate automated attendance and engagement reports</p>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Setup →</button>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-6 h-6 text-yellow-500" />
                <h4 className="font-medium text-gray-800">AI Assistant</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">Get AI-powered insights and teaching suggestions</p>
              <button className="text-sm text-yellow-600 hover:text-yellow-700 font-medium">Enable →</button>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <Star className="w-6 h-6 text-purple-500" />
                <h4 className="font-medium text-gray-800">Gamification</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">Add points, badges, and leaderboards to classes</p>
              <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">Activate →</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Live Class Setup Modal */}
      <LiveClassSetupModal
        isOpen={showSetupModal}
        onClose={() => setShowSetupModal(false)}
        classSetup={newClassSetup}
        setClassSetup={setNewClassSetup}
        onSave={handleSaveLiveClass}
      />
    </div>
  );
}

export default LiveClasses;
