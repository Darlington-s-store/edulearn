import React, { useState } from 'react';
import { Settings, User, Bell, Lock, Shield, Mail, Phone, Save, X, CheckCircle, BookOpen, Video, FileText } from 'lucide-react';

function TeacherSettings() {
  const [activeTab, setActiveTab] = useState('profile'); // profile, notifications, security, course-management
  const [profileData, setProfileData] = useState({
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'sarah.williams@example.com',
    phone: '+233 20 987 6543',
    bio: 'Passionate educator with 10 years of experience in science and technology. Dedicated to fostering a love for learning in students.',
    subjects: ['Science', 'Technology', 'Robotics'],
    qualifications: 'M.Sc. Education, B.Sc. Biology'
  });
  const [notificationSettings, setNotificationSettings] = useState({
    newAssignmentSubmissions: true,
    quizCompletions: true,
    liveClassReminders: true,
    studentMessages: true,
    platformAnnouncements: true
  });
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    faceRecognitionLogin: true,
    voiceRecognitionLogin: false
  });
  const [courseManagementSettings, setCourseManagementSettings] = useState({
    autoApproveAssignments: false,
    defaultQuizTimeLimit: 60, // minutes
    enableLiveClassRecording: true
  });

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleNotificationChange = (e) => {
    setNotificationSettings({ ...notificationSettings, [e.target.name]: e.target.checked });
  };

  const handleSecurityChange = (e) => {
    setSecuritySettings({ ...securitySettings, [e.target.name]: e.target.checked });
  };

  const handleCourseManagementChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourseManagementSettings({
      ...courseManagementSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input type="text" id="firstName" name="firstName" value={profileData.firstName} onChange={handleProfileChange} className="form-input" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input type="text" id="lastName" name="lastName" value={profileData.lastName} onChange={handleProfileChange} className="form-input" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" id="email" name="email" value={profileData.email} onChange={handleProfileChange} className="form-input" disabled />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="text" id="phone" name="phone" value={profileData.phone} onChange={handleProfileChange} className="form-input" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea id="bio" name="bio" value={profileData.bio} onChange={handleProfileChange} rows="3" className="form-textarea"></textarea>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="subjects" className="block text-sm font-medium text-gray-700 mb-1">Subjects Taught (comma-separated)</label>
                <input type="text" id="subjects" name="subjects" value={profileData.subjects.join(', ')} onChange={(e) => setProfileData({ ...profileData, subjects: e.target.value.split(',').map(s => s.trim()) })} className="form-input" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700 mb-1">Qualifications</label>
                <input type="text" id="qualifications" name="qualifications" value={profileData.qualifications} onChange={handleProfileChange} className="form-input" />
              </div>
            </div>
            <button className="btn-primary flex items-center gap-2">
              <Save className="w-5 h-5" /> Save Changes
            </button>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="newAssignmentSubmissions" className="text-gray-700">New Assignment Submissions</label>
                <input type="checkbox" id="newAssignmentSubmissions" name="newAssignmentSubmissions" checked={notificationSettings.newAssignmentSubmissions} onChange={handleNotificationChange} className="form-checkbox" />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="quizCompletions" className="text-gray-700">Quiz Completions</label>
                <input type="checkbox" id="quizCompletions" name="quizCompletions" checked={notificationSettings.quizCompletions} onChange={handleNotificationChange} className="form-checkbox" />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="liveClassReminders" className="text-gray-700">Live Class Reminders</label>
                <input type="checkbox" id="liveClassReminders" name="liveClassReminders" checked={notificationSettings.liveClassReminders} onChange={handleNotificationChange} className="form-checkbox" />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="studentMessages" className="text-gray-700">New Student Messages</label>
                <input type="checkbox" id="studentMessages" name="studentMessages" checked={notificationSettings.studentMessages} onChange={handleNotificationChange} className="form-checkbox" />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="platformAnnouncements" className="text-gray-700">Platform Announcements</label>
                <input type="checkbox" id="platformAnnouncements" name="platformAnnouncements" checked={notificationSettings.platformAnnouncements} onChange={handleNotificationChange} className="form-checkbox" />
              </div>
            </div>
            <button className="btn-primary flex items-center gap-2">
              <Save className="w-5 h-5" /> Save Preferences
            </button>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Security Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="twoFactorAuth" className="text-gray-700">Two-Factor Authentication</label>
                <input type="checkbox" id="twoFactorAuth" name="twoFactorAuth" checked={securitySettings.twoFactorAuth} onChange={handleSecurityChange} className="form-checkbox" />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="faceRecognitionLogin" className="text-gray-700">Face Recognition Login</label>
                <input type="checkbox" id="faceRecognitionLogin" name="faceRecognitionLogin" checked={securitySettings.faceRecognitionLogin} onChange={handleSecurityChange} className="form-checkbox" />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="voiceRecognitionLogin" className="text-gray-700">Voice Recognition Login</label>
                <input type="checkbox" id="voiceRecognitionLogin" name="voiceRecognitionLogin" checked={securitySettings.voiceRecognitionLogin} onChange={handleSecurityChange} className="form-checkbox" />
              </div>
            </div>
            <button className="btn-primary flex items-center gap-2">
              <Save className="w-5 h-5" /> Update Security
            </button>
            <div className="pt-4">
              <h4 className="font-semibold text-gray-800 mb-2">Change Password</h4>
              <button className="btn-secondary">Change Password</button>
            </div>
          </div>
        );
      case 'course-management':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Course & Content Management</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="autoApproveAssignments" className="text-gray-700">Auto-approve Assignments</label>
                <input type="checkbox" id="autoApproveAssignments" name="autoApproveAssignments" checked={courseManagementSettings.autoApproveAssignments} onChange={handleCourseManagementChange} className="form-checkbox" />
              </div>
              <div>
                <label htmlFor="defaultQuizTimeLimit" className="block text-sm font-medium text-gray-700 mb-1">Default Quiz Time Limit (minutes)</label>
                <input type="number" id="defaultQuizTimeLimit" name="defaultQuizTimeLimit" value={courseManagementSettings.defaultQuizTimeLimit} onChange={handleCourseManagementChange} className="form-input" />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="enableLiveClassRecording" className="text-gray-700">Enable Live Class Recording</label>
                <input type="checkbox" id="enableLiveClassRecording" name="enableLiveClassRecording" checked={courseManagementSettings.enableLiveClassRecording} onChange={handleCourseManagementChange} className="form-checkbox" />
              </div>
            </div>
            <button className="btn-primary flex items-center gap-2">
              <Save className="w-5 h-5" /> Save Course Settings
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 font-playful">
          Teacher Settings ⚙️
        </h1>
        <p className="text-gray-600 mt-2">Manage your profile, notifications, security, and course preferences</p>
      </div>

      <div className="card flex flex-col lg:flex-row">
        {/* Sidebar for tabs */}
        <div className="lg:w-1/4 border-b lg:border-b-0 lg:border-r border-gray-200 p-6 bg-white">
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left flex items-center gap-3 p-3 rounded-xl transition-colors ${
                activeTab === 'profile' ? 'bg-primary-100 text-primary-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <User className="w-5 h-5" /> Profile
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full text-left flex items-center gap-3 p-3 rounded-xl transition-colors ${
                activeTab === 'notifications' ? 'bg-primary-100 text-primary-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Bell className="w-5 h-5" /> Notifications
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full text-left flex items-center gap-3 p-3 rounded-xl transition-colors ${
                activeTab === 'security' ? 'bg-primary-100 text-primary-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Shield className="w-5 h-5" /> Security
            </button>
            <button
              onClick={() => setActiveTab('course-management')}
              className={`w-full text-left flex items-center gap-3 p-3 rounded-xl transition-colors ${
                activeTab === 'course-management' ? 'bg-primary-100 text-primary-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <BookOpen className="w-5 h-5" /> Course Management
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 bg-white">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default TeacherSettings;