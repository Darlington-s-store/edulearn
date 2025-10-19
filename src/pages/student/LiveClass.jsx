import React, { useState, useRef, useEffect } from 'react';
import { Video, Play, Clock, Users, Calendar, Search, Filter, Plus, Mic, MicOff, Camera, CameraOff, MessageCircle, Send, Hand, Share2, Monitor, PenTool, BarChart3, UserCheck, Settings, UserPlus, Shuffle, Eye } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useContent } from '../../contexts/ContentContextAPI';

function LiveClass() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isJoined, setIsJoined] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [showChat, setShowChat] = useState(true);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, user: 'Mrs. Johnson', message: 'Welcome to today\'s mathematics class!', time: '10:00 AM', isTeacher: true },
    { id: 2, user: 'Alex', message: 'Good morning!', time: '10:01 AM', isTeacher: false }
  ]);
  const [handRaised, setHandRaised] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const [showPoll, setShowPoll] = useState(false);
  const [currentPoll, setCurrentPoll] = useState({
    question: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
    selectedOption: null
  });
  const [inBreakoutRoom, setInBreakoutRoom] = useState(false);
  const [breakoutRoomData, setBreakoutRoomData] = useState({
    roomNumber: 2,
    roomName: 'Group Discussion - Algebra',
    participants: ['You', 'Alice Johnson', 'Bob Smith'],
    timeRemaining: 15
  });
  const [showRecording, setShowRecording] = useState(false);
  const [showClassDetails, setShowClassDetails] = useState(false);
  const [selectedClassDetails, setSelectedClassDetails] = useState(null);
  const [countdowns, setCountdowns] = useState({});
  const chatEndRef = useRef(null);
  const { user } = useAuth();
  const { getStudentLiveClasses, enrollInLiveClass } = useContent();

  // Get live classes from published content
  const studentLiveClasses = getStudentLiveClasses(user?.id || '');
  
  const liveClasses = {
    upcoming: studentLiveClasses.filter(liveClass => liveClass.status === 'scheduled'),
    ongoing: studentLiveClasses.filter(liveClass => liveClass.status === 'live'),
    completed: studentLiveClasses.filter(liveClass => liveClass.status === 'completed')
  };

  const handleEnrollInLiveClass = (liveClassId) => {
    enrollInLiveClass(liveClassId, user?.id || '');
    alert('Successfully enrolled in the live class!');
  };

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: user?.name || 'Student',
        message: chatMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isTeacher: false
      };
      setMessages([...messages, newMessage]);
      setChatMessage('');
    }
  };

  const handlePollVote = (optionIndex) => {
    setCurrentPoll(prev => ({ ...prev, selectedOption: optionIndex }));
  };

  const toggleHandRaise = () => {
    setHandRaised(!handRaised);
    // In a real app, this would notify the teacher
  };

  const joinBreakoutRoom = () => {
    setInBreakoutRoom(true);
  };

  const leaveBreakoutRoom = () => {
    setInBreakoutRoom(false);
  };

  // Timer for breakout room
  useEffect(() => {
    let interval;
    if (inBreakoutRoom && breakoutRoomData.timeRemaining > 0) {
      interval = setInterval(() => {
        setBreakoutRoomData(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }));
      }, 60000); // Update every minute
    }
    return () => clearInterval(interval);
  }, [inBreakoutRoom, breakoutRoomData.timeRemaining]);
  
  // Countdown timer for upcoming classes
  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdowns = {};
      liveClasses.upcoming.forEach(classItem => {
        const classDateTime = new Date(`${classItem.scheduledDate}T${classItem.scheduledTime}`);
        const now = new Date();
        const diff = classDateTime - now;
        
        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          newCountdowns[classItem.id] = { hours, minutes, seconds, total: diff };
        }
      });
      setCountdowns(newCountdowns);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [liveClasses.upcoming]);
  
  const openClassDetails = (classItem) => {
    setSelectedClassDetails(classItem);
    setShowClassDetails(true);
  };

  const subjects = ['all', 'Mathematics', 'Science', 'English', 'History', 'Arts'];

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', icon: Calendar, count: liveClasses.upcoming.length },
    { id: 'ongoing', label: 'Live Now', icon: Play, count: liveClasses.ongoing.length },
    { id: 'completed', label: 'Replay', icon: Video, count: liveClasses.completed.length }
  ];

  const renderEmptyState = (type) => {
    const config = {
      upcoming: {
        icon: '📅',
        title: 'No Upcoming Classes',
        description: 'There are no scheduled live classes at the moment.',
        action: 'Check back later for new class schedules'
      },
      ongoing: {
        icon: '📹',
        title: 'No Live Classes',
        description: 'There are no live classes happening right now.',
        action: 'Join a scheduled class when it starts'
      },
      completed: {
        icon: '📺',
        title: 'No Replay Available',
        description: 'You haven\'t attended any live classes yet.',
        action: 'Join your first live class to see replays here'
      }
    };

    const current = config[type];

    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">{current.icon}</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{current.title}</h3>
        <p className="text-gray-600 mb-4">{current.description}</p>
        <p className="text-sm text-gray-500">{current.action}</p>
      </div>
    );
  };

  const renderClassCard = (classItem) => (
    <div key={classItem.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-semibold text-gray-800">{classItem.title}</h3>
            {classItem.status === 'live' && (
              <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                LIVE NOW
              </span>
            )}
            {classItem.status === 'scheduled' && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                Scheduled
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm mb-3">{classItem.description || 'No description provided'}</p>
          
          {/* Countdown Timer for Upcoming Classes */}
          {classItem.status === 'scheduled' && countdowns[classItem.id] && countdowns[classItem.id].total < 24 * 60 * 60 * 1000 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">
                  Starts in: {countdowns[classItem.id].hours}h {countdowns[classItem.id].minutes}m {countdowns[classItem.id].seconds}s
                </span>
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{classItem.scheduledDate} at {classItem.scheduledTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{classItem.duration} min</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{classItem.attendees?.length || 0}/{classItem.maxStudents || 50} students</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Teacher: {classItem.teacher}</p>
              <p className="text-sm text-gray-600">Subject: {classItem.subject}</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => openClassDetails(classItem)}
                className="px-4 py-2 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Details
              </button>
              <button 
                onClick={() => {
                  if (classItem.status === 'live') {
                    setIsJoined(true);
                  } else if (!classItem.isEnrolled) {
                    handleEnrollInLiveClass(classItem.id);
                  }
                }}
                className={`px-6 py-2 rounded-xl font-semibold transition-colors flex items-center gap-2 ${
                  classItem.status === 'live' 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : classItem.isEnrolled 
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                <Play className="w-4 h-4" />
                {classItem.status === 'live' ? 'Join Now' : classItem.isEnrolled ? 'Enrolled ✓' : 'Enroll Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderClassRoom = () => (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Main Video Area */}
      <div className="lg:col-span-3">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Class Header */}
          <div className="bg-gradient-to-r from-primary-600 to-purple-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Live Class: Mathematics</h2>
                <p className="text-primary-100">Mrs. Johnson • 25 students online</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowPoll(!showPoll)}
                  className="bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <BarChart3 className="w-4 h-4" />
                  Poll
                </button>
                <button
                  onClick={() => setIsJoined(false)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  Leave Class
                </button>
              </div>
            </div>
          </div>

          {/* Video Area */}
          <div className="relative">
            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              {showWhiteboard ? (
                <div className="w-full h-full bg-white flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <PenTool className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-xl">Interactive Whiteboard</p>
                    <p className="text-gray-400">Teacher is drawing on the whiteboard</p>
                  </div>
                </div>
              ) : isScreenSharing ? (
                <div className="w-full h-full bg-blue-900 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Monitor className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-xl">Screen Sharing</p>
                    <p className="text-blue-200">Teacher is sharing their screen</p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">📹</div>
                  <p className="text-xl">Live Class in Progress</p>
                  <p className="text-gray-400">Teacher's video stream will appear here</p>
                </div>
              )}
            </div>
            
            {/* Floating Poll */}
            {showPoll && (
              <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 w-80">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800">Live Poll</h3>
                  <button
                    onClick={() => setShowPoll(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
                <p className="text-gray-700 mb-3">{currentPoll.question}</p>
                <div className="space-y-2">
                  {currentPoll.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handlePollVote(index)}
                      className={`w-full text-left p-2 rounded border transition-colors ${
                        currentPoll.selectedOption === index
                          ? 'bg-primary-100 border-primary-500 text-primary-700'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {currentPoll.selectedOption !== null && (
                  <div className="mt-3 text-sm text-green-600">
                    ✓ Vote submitted!
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Enhanced Controls */}
          <div className="p-6 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3 rounded-full transition-colors ${
                    isMuted ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className={`p-3 rounded-full transition-colors ${
                    !isVideoOn ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {isVideoOn ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
                </button>
                <button
                  onClick={toggleHandRaise}
                  className={`p-3 rounded-full transition-colors ${
                    handRaised ? 'bg-yellow-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Raise Hand"
                >
                  <Hand className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowChat(!showChat)}
                  className="p-3 rounded-full bg-white text-gray-600 hover:bg-gray-100 transition-colors"
                  title="Toggle Chat"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span>Live</span>
                </div>
                <div className="text-sm text-gray-600">
                  01:23:45
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <UserCheck className="w-4 h-4" />
                  <span>25 online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Sidebar */}
      {showChat && (
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg h-full flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Class Chat
              </h3>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto max-h-96">
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex flex-col ${
                    msg.isTeacher ? 'items-start' : 'items-start'
                  }`}>
                    <div className={`max-w-full p-3 rounded-lg ${
                      msg.isTeacher 
                        ? 'bg-primary-100 text-primary-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-medium ${
                          msg.isTeacher ? 'text-primary-600' : 'text-gray-600'
                        }`}>
                          {msg.user}
                        </span>
                        <span className="text-xs text-gray-400">{msg.time}</span>
                      </div>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={sendMessage}
                  className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6 space-y-6 relative">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
          <Video className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 font-playful">Live Classes</h1>
          <p className="text-gray-600">Join live sessions and watch replays</p>
        </div>
      </div>

      {/* Enhanced Live Class Room */}
      {isJoined && (
        <div className="space-y-6">
          {/* Breakout Room Notification */}
          {!inBreakoutRoom && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <UserPlus className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-800">Breakout Room Available</p>
                    <p className="text-sm text-blue-600">Join a small group discussion: {breakoutRoomData.roomName}</p>
                  </div>
                </div>
                <button
                  onClick={joinBreakoutRoom}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Join Room {breakoutRoomData.roomNumber}
                </button>
              </div>
            </div>
          )}
          
          {/* Breakout Room Interface */}
          {inBreakoutRoom ? (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Breakout Room Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Breakout Room {breakoutRoomData.roomNumber}</h2>
                    <p className="text-blue-100">{breakoutRoomData.roomName} • {breakoutRoomData.participants.length} participants</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 px-3 py-2 rounded-lg">
                      <span className="font-semibold">{breakoutRoomData.timeRemaining} min left</span>
                    </div>
                    <button
                      onClick={leaveBreakoutRoom}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      Return to Main Room
                    </button>
                  </div>
                </div>
              </div>

              {/* Breakout Room Video Area */}
              <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">👥</div>
                  <p className="text-xl">Breakout Room Discussion</p>
                  <p className="text-gray-400">Small group collaboration space</p>
                </div>
                
                {/* Participant Thumbnails */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  {breakoutRoomData.participants.map((participant, index) => (
                    <div key={index} className="w-16 h-16 bg-primary-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                      {participant.split(' ').map(n => n[0]).join('')}
                    </div>
                  ))}
                </div>
              </div>

              {/* Breakout Room Controls */}
              <div className="p-6 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className={`p-3 rounded-full transition-colors ${
                        isMuted ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => setIsVideoOn(!isVideoOn)}
                      className={`p-3 rounded-full transition-colors ${
                        !isVideoOn ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {isVideoOn ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => setShowChat(!showChat)}
                      className="p-3 rounded-full bg-white text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Shuffle className="w-4 h-4" />
                      <span>Breakout Room {breakoutRoomData.roomNumber}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {breakoutRoomData.timeRemaining} minutes remaining
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            renderClassRoom()
          )}
          
          {/* Class Features Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowWhiteboard(!showWhiteboard)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    showWhiteboard 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <PenTool className="w-4 h-4" />
                  Whiteboard
                </button>
                <button
                  onClick={() => setIsScreenSharing(!isScreenSharing)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    isScreenSharing 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Share2 className="w-4 h-4" />
                  Screen Share
                </button>
                <button
                  onClick={() => setShowRecording(!showRecording)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    showRecording 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  {showRecording ? 'Recording...' : 'Record'}
                </button>
              </div>
              
              <div className="flex items-center gap-3 text-sm text-gray-600">
                {handRaised && (
                  <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                    <Hand className="w-4 h-4" />
                    Hand Raised
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Connected</span>
                </div>
                {showRecording && (
                  <div className="flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span>Recording</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {!isJoined && (
        <>
          {/* New Classes Notification */}
          {liveClasses.upcoming.length > 0 && (
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl p-6 shadow-lg mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">New Live Classes Available!</h3>
                    <p className="text-blue-100">You have {liveClasses.upcoming.length} upcoming {liveClasses.upcoming.length === 1 ? 'class' : 'classes'} scheduled</p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveTab('upcoming')}
                  className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  View Classes
                </button>
              </div>
            </div>
          )}
          
          {/* Live Now Alert */}
          {liveClasses.ongoing.length > 0 && (
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl p-6 shadow-lg mb-6 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Video className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                      Live Class in Progress!
                    </h3>
                    <p className="text-red-100">{liveClasses.ongoing.length} {liveClasses.ongoing.length === 1 ? 'class is' : 'classes are'} happening right now</p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveTab('ongoing')}
                  className="bg-white text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors"
                >
                  Join Now
                </button>
              </div>
            </div>
          )}
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search classes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>
                  {subject === 'all' ? 'All Subjects' : subject}
                </option>
              ))}
            </select>
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
                  {tab.count > 0 && (
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      activeTab === tab.id 
                        ? 'bg-primary-100 text-primary-700' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Class List */}
          <div className="bg-white rounded-2xl shadow-lg">
            <div className="p-6">
              {activeTab === 'upcoming' && (
                <>
                  {liveClasses.upcoming.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {liveClasses.upcoming.map(renderClassCard)}
                    </div>
                  ) : (
                    renderEmptyState('upcoming')
                  )}
                </>
              )}

              {activeTab === 'ongoing' && (
                <>
                  {liveClasses.ongoing.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {liveClasses.ongoing.map(renderClassCard)}
                    </div>
                  ) : (
                    renderEmptyState('ongoing')
                  )}
                </>
              )}

              {activeTab === 'completed' && (
                <>
                  {liveClasses.completed.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {liveClasses.completed.map(renderClassCard)}
                    </div>
                  ) : (
                    renderEmptyState('completed')
                  )}
                </>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">{liveClasses.ongoing.length}</p>
                  <p className="text-green-100 text-sm">Live Now</p>
                </div>
                <Play className="w-8 h-8 text-white/80" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">{liveClasses.upcoming.length}</p>
                  <p className="text-blue-100 text-sm">Upcoming</p>
                </div>
                <Calendar className="w-8 h-8 text-white/80" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">{liveClasses.completed.length}</p>
                  <p className="text-purple-100 text-sm">Completed</p>
                </div>
                <Video className="w-8 h-8 text-white/80" />
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Class Details Modal */}
      {showClassDetails && selectedClassDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedClassDetails.title}</h2>
                  <p className="text-gray-600 mt-1">{selectedClassDetails.subject}</p>
                </div>
                <button
                  onClick={() => setShowClassDetails(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Status Badge */}
              <div className="mb-6">
                {selectedClassDetails.status === 'live' && (
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium flex items-center gap-2 w-fit">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    LIVE NOW
                  </span>
                )}
                {selectedClassDetails.status === 'scheduled' && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium w-fit">
                    Scheduled
                  </span>
                )}
              </div>
              
              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600">{selectedClassDetails.description || 'No description provided'}</p>
              </div>
              
              {/* Class Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-primary-600" />
                    <h4 className="font-medium text-gray-800">Date & Time</h4>
                  </div>
                  <p className="text-gray-600">{selectedClassDetails.scheduledDate}</p>
                  <p className="text-gray-600">{selectedClassDetails.scheduledTime}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-primary-600" />
                    <h4 className="font-medium text-gray-800">Duration</h4>
                  </div>
                  <p className="text-gray-600">{selectedClassDetails.duration} minutes</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-primary-600" />
                    <h4 className="font-medium text-gray-800">Capacity</h4>
                  </div>
                  <p className="text-gray-600">{selectedClassDetails.attendees?.length || 0} / {selectedClassDetails.maxStudents || 50} students</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-primary-600" />
                    <h4 className="font-medium text-gray-800">Teacher</h4>
                  </div>
                  <p className="text-gray-600">{selectedClassDetails.teacher}</p>
                </div>
              </div>
              
              {/* Features */}
              {selectedClassDetails.settings && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Class Features</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedClassDetails.settings.enableChat && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MessageCircle className="w-4 h-4 text-green-600" />
                        <span>Chat Enabled</span>
                      </div>
                    )}
                    {selectedClassDetails.settings.enablePolls && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <BarChart3 className="w-4 h-4 text-green-600" />
                        <span>Live Polls</span>
                      </div>
                    )}
                    {selectedClassDetails.settings.enableWhiteboard && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <PenTool className="w-4 h-4 text-green-600" />
                        <span>Whiteboard</span>
                      </div>
                    )}
                    {selectedClassDetails.settings.enableScreenShare && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Monitor className="w-4 h-4 text-green-600" />
                        <span>Screen Share</span>
                      </div>
                    )}
                    {selectedClassDetails.settings.autoRecord && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Video className="w-4 h-4 text-green-600" />
                        <span>Auto Record</span>
                      </div>
                    )}
                    {selectedClassDetails.settings.enableBreakoutRooms && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4 text-green-600" />
                        <span>Breakout Rooms</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Countdown for upcoming classes */}
              {selectedClassDetails.status === 'scheduled' && countdowns[selectedClassDetails.id] && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Clock className="w-6 h-6 text-yellow-600" />
                      <div>
                        <p className="font-medium text-yellow-800">Class starts in</p>
                        <p className="text-2xl font-bold text-yellow-900">
                          {countdowns[selectedClassDetails.id].hours}h {countdowns[selectedClassDetails.id].minutes}m {countdowns[selectedClassDetails.id].seconds}s
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowClassDetails(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    if (selectedClassDetails.status === 'live') {
                      setIsJoined(true);
                      setShowClassDetails(false);
                    } else if (!selectedClassDetails.isEnrolled) {
                      handleEnrollInLiveClass(selectedClassDetails.id);
                      setShowClassDetails(false);
                    }
                  }}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                    selectedClassDetails.status === 'live'
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : selectedClassDetails.isEnrolled
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  <Play className="w-4 h-4" />
                  {selectedClassDetails.status === 'live' ? 'Join Class Now' : selectedClassDetails.isEnrolled ? 'Already Enrolled' : 'Enroll in Class'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LiveClass;
