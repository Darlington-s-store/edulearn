import React, { useState } from 'react';
import { Video, Calendar, Clock, Users, Settings, Shield, Bell, Zap, X, Check } from 'lucide-react';

function LiveClassSetupModal({ isOpen, onClose, classSetup, setClassSetup, onSave }) {
  const [activeTab, setActiveTab] = useState('basic');

  if (!isOpen) return null;

  const handleSave = () => {
    // Validate required fields
    if (!classSetup.title || !classSetup.subject || !classSetup.scheduledDate || !classSetup.scheduledTime) {
      alert('Please fill in all required fields');
      return;
    }
    onSave(classSetup);
    onClose();
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: Video },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'features', label: 'Features', icon: Zap },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'advanced', label: 'Advanced', icon: Settings }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl max-w-5xl w-full my-8">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Setup Live Class</h2>
              <p className="text-gray-600 mt-1">Configure your live class settings and schedule</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Basic Information Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Class Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={classSetup.title}
                  onChange={(e) => setClassSetup(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Advanced Mathematics - Calculus"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={classSetup.subject}
                    onChange={(e) => setClassSetup(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select Subject</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="English">English</option>
                    <option value="History">History</option>
                    <option value="Arts">Arts</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Languages">Languages</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Students
                  </label>
                  <input
                    type="number"
                    value={classSetup.maxStudents}
                    onChange={(e) => setClassSetup(prev => ({ ...prev, maxStudents: parseInt(e.target.value) }))}
                    min="1"
                    max="500"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={classSetup.description}
                  onChange={(e) => setClassSetup(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what students will learn in this class..."
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={classSetup.scheduledDate}
                    onChange={(e) => setClassSetup(prev => ({ ...prev, scheduledDate: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={classSetup.scheduledTime}
                    onChange={(e) => setClassSetup(prev => ({ ...prev, scheduledTime: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes)
                </label>
                <select
                  value={classSetup.duration}
                  onChange={(e) => setClassSetup(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="90">1.5 hours</option>
                  <option value="120">2 hours</option>
                  <option value="180">3 hours</option>
                </select>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={classSetup.allowLateJoin}
                    onChange={(e) => setClassSetup(prev => ({ ...prev, allowLateJoin: e.target.checked }))}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Allow students to join after class starts</span>
                </label>
              </div>
            </div>
          )}

          {/* Features Tab */}
          {activeTab === 'features' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={classSetup.enableChat}
                    onChange={(e) => setClassSetup(prev => ({ ...prev, enableChat: e.target.checked }))}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <div>
                    <p className="font-medium text-gray-800">Enable Chat</p>
                    <p className="text-sm text-gray-600">Allow students to send messages</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={classSetup.enablePolls}
                    onChange={(e) => setClassSetup(prev => ({ ...prev, enablePolls: e.target.checked }))}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <div>
                    <p className="font-medium text-gray-800">Enable Polls</p>
                    <p className="text-sm text-gray-600">Create live polls during class</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={classSetup.enableWhiteboard}
                    onChange={(e) => setClassSetup(prev => ({ ...prev, enableWhiteboard: e.target.checked }))}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <div>
                    <p className="font-medium text-gray-800">Enable Whiteboard</p>
                    <p className="text-sm text-gray-600">Use interactive whiteboard</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={classSetup.enableScreenShare}
                    onChange={(e) => setClassSetup(prev => ({ ...prev, enableScreenShare: e.target.checked }))}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <div>
                    <p className="font-medium text-gray-800">Enable Screen Share</p>
                    <p className="text-sm text-gray-600">Share your screen with students</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={classSetup.autoRecord}
                    onChange={(e) => setClassSetup(prev => ({ ...prev, autoRecord: e.target.checked }))}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <div>
                    <p className="font-medium text-gray-800">Auto Record</p>
                    <p className="text-sm text-gray-600">Automatically record the session</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={classSetup.enableBreakoutRooms}
                    onChange={(e) => setClassSetup(prev => ({ ...prev, enableBreakoutRooms: e.target.checked }))}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <div>
                    <p className="font-medium text-gray-800">Breakout Rooms</p>
                    <p className="text-sm text-gray-600">Enable group discussions</p>
                  </div>
                </label>
              </div>

              {classSetup.enableBreakoutRooms && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Breakout Rooms
                  </label>
                  <input
                    type="number"
                    value={classSetup.numberOfBreakoutRooms}
                    onChange={(e) => setClassSetup(prev => ({ ...prev, numberOfBreakoutRooms: parseInt(e.target.value) }))}
                    min="2"
                    max="20"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={classSetup.waitingRoom}
                    onChange={(e) => setClassSetup(prev => ({ ...prev, waitingRoom: e.target.checked }))}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <div>
                    <p className="font-medium text-gray-800">Enable Waiting Room</p>
                    <p className="text-sm text-gray-600">Approve students before they join</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={classSetup.requirePassword}
                    onChange={(e) => setClassSetup(prev => ({ ...prev, requirePassword: e.target.checked }))}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <div>
                    <p className="font-medium text-gray-800">Require Password</p>
                    <p className="text-sm text-gray-600">Protect class with a password</p>
                  </div>
                </label>

                {classSetup.requirePassword && (
                  <div className="ml-12">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Class Password
                    </label>
                    <input
                      type="text"
                      value={classSetup.password}
                      onChange={(e) => setClassSetup(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="Enter password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                )}

                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={classSetup.muteOnEntry}
                    onChange={(e) => setClassSetup(prev => ({ ...prev, muteOnEntry: e.target.checked }))}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <div>
                    <p className="font-medium text-gray-800">Mute Students on Entry</p>
                    <p className="text-sm text-gray-600">Automatically mute microphones when joining</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={classSetup.chatModeration}
                    onChange={(e) => setClassSetup(prev => ({ ...prev, chatModeration: e.target.checked }))}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <div>
                    <p className="font-medium text-gray-800">Chat Moderation</p>
                    <p className="text-sm text-gray-600">Review messages before they appear</p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={classSetup.sendReminders}
                  onChange={(e) => setClassSetup(prev => ({ ...prev, sendReminders: e.target.checked }))}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <div>
                  <p className="font-medium text-gray-800">Send Reminders</p>
                  <p className="text-sm text-gray-600">Notify students before class starts</p>
                </div>
              </label>

              {classSetup.sendReminders && (
                <div className="ml-12">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reminder Time (minutes before class)
                  </label>
                  <select
                    value={classSetup.reminderTime}
                    onChange={(e) => setClassSetup(prev => ({ ...prev, reminderTime: parseInt(e.target.value) }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="5">5 minutes</option>
                    <option value="10">10 minutes</option>
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="1440">1 day</option>
                  </select>
                </div>
              )}

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Notification Recipients</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                    <span className="text-sm text-gray-700">Email notifications</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                    <span className="text-sm text-gray-700">In-app notifications</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                    <span className="text-sm text-gray-700">SMS notifications (Premium)</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Advanced Tab */}
          {activeTab === 'advanced' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={classSetup.hostVideoOn}
                    onChange={(e) => setClassSetup(prev => ({ ...prev, hostVideoOn: e.target.checked }))}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <div>
                    <p className="font-medium text-gray-800">Host Video On</p>
                    <p className="text-sm text-gray-600">Start with video enabled</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={classSetup.participantVideoOn}
                    onChange={(e) => setClassSetup(prev => ({ ...prev, participantVideoOn: e.target.checked }))}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <div>
                    <p className="font-medium text-gray-800">Participant Video On</p>
                    <p className="text-sm text-gray-600">Students join with video</p>
                  </div>
                </label>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-3">Performance Settings</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Video Quality
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      <option value="auto">Auto (Recommended)</option>
                      <option value="hd">HD Quality</option>
                      <option value="standard">Standard Quality</option>
                      <option value="low">Low Bandwidth</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recording Quality
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      <option value="1080p">1080p (Full HD)</option>
                      <option value="720p">720p (HD)</option>
                      <option value="480p">480p (Standard)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <div className="flex items-center gap-3">
            <button className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Save as Draft
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Create Live Class
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveClassSetupModal;
