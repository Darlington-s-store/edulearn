import React, { useState } from 'react';
import { Settings, User, Bell, Lock, Shield, Mail, Phone, Users, Save, X, CheckCircle } from 'lucide-react';

function ParentSettings() {
  const [activeTab, setActiveTab] = useState('profile'); // profile, notifications, security, connected-students
  const [profileData, setProfileData] = useState({
    firstName: 'Maria',
    lastName: 'Rodriguez',
    email: 'maria.rodriguez@example.com',
    phone: '+233 24 123 4567',
    address: '123 Learning Lane, Accra, Ghana'
  });
  const [notificationSettings, setNotificationSettings] = useState({
    performanceUpdates: true,
    assignmentReminders: true,
    liveClassAlerts: false,
    communicationMessages: true,
    promotionalEmails: false
  });
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    faceRecognitionLogin: true,
    voiceRecognitionLogin: false
  });
  const [connectedStudents, setConnectedStudents] = useState([
    { id: 1, name: 'Emma Rodriguez', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', status: 'Active' },
    { id: 2, name: 'Daniel Rodriguez', avatar: 'https://randomuser.me/api/portraits/men/70.jpg', status: 'Active' }
  ]);
  const [newStudentId, setNewStudentId] = useState('');

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleNotificationChange = (e) => {
    setNotificationSettings({ ...notificationSettings, [e.target.name]: e.target.checked });
  };

  const handleSecurityChange = (e) => {
    setSecuritySettings({ ...securitySettings, [e.target.name]: e.target.checked });
  };

  const handleAddStudent = () => {
    if (newStudentId.trim()) {
      // In a real app, you'd verify this ID with the backend
      const newStudent = {
        id: connectedStudents.length + 1,
        name: `Student ${newStudentId}`, // Placeholder name
        avatar: `https://www.gravatar.com/avatar/${newStudentId}?s=200&d=retro`,
        status: 'Pending'
      };
      setConnectedStudents([...connectedStudents, newStudent]);
      setNewStudentId('');
      alert(`Request to connect with Student ID ${newStudentId} sent.`);
    }
  };

  const handleRemoveStudent = (id) => {
    if (window.confirm("Are you sure you want to remove this student?")) {
      setConnectedStudents(connectedStudents.filter(student => student.id !== id));
      alert("Student removed successfully.");
    }
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
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input type="text" id="address" name="address" value={profileData.address} onChange={handleProfileChange} className="form-input" />
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
                <label htmlFor="performanceUpdates" className="text-gray-700">Student Performance Updates</label>
                <input type="checkbox" id="performanceUpdates" name="performanceUpdates" checked={notificationSettings.performanceUpdates} onChange={handleNotificationChange} className="form-checkbox" />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="assignmentReminders" className="text-gray-700">Assignment Reminders</label>
                <input type="checkbox" id="assignmentReminders" name="assignmentReminders" checked={notificationSettings.assignmentReminders} onChange={handleNotificationChange} className="form-checkbox" />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="liveClassAlerts" className="text-gray-700">Live Class Alerts</label>
                <input type="checkbox" id="liveClassAlerts" name="liveClassAlerts" checked={notificationSettings.liveClassAlerts} onChange={handleNotificationChange} className="form-checkbox" />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="communicationMessages" className="text-gray-700">New Communication Messages</label>
                <input type="checkbox" id="communicationMessages" name="communicationMessages" checked={notificationSettings.communicationMessages} onChange={handleNotificationChange} className="form-checkbox" />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="promotionalEmails" className="text-gray-700">Promotional Emails</label>
                <input type="checkbox" id="promotionalEmails" name="promotionalEmails" checked={notificationSettings.promotionalEmails} onChange={handleNotificationChange} className="form-checkbox" />
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
      case 'connected-students':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Connected Students</h3>
            <div className="space-y-4">
              {connectedStudents.length > 0 ? (
                connectedStudents.map(student => (
                  <div key={student.id} className="flex items-center justify-between p-4 bg-gray-100 rounded-xl">
                    <div className="flex items-center gap-3">
                      <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="font-medium text-gray-800">{student.name}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          student.status === 'Active' ? 'bg-mint-100 text-mint-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {student.status}
                        </span>
                      </div>
                    </div>
                    <button onClick={() => handleRemoveStudent(student.id)} className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">No students connected yet.</p>
              )}
            </div>
            <div className="pt-4 border-t border-gray-200 mt-6">
              <h4 className="font-semibold text-gray-800 mb-2">Connect New Student</h4>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter Student ID"
                  value={newStudentId}
                  onChange={(e) => setNewStudentId(e.target.value)}
                  className="form-input flex-1"
                />
                <button onClick={handleAddStudent} className="btn-primary flex items-center gap-2">
                  <Users className="w-5 h-5" /> Connect
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">Your child needs to approve the connection request from their account.</p>
            </div>
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
          Parent Settings ⚙️
        </h1>
        <p className="text-gray-600 mt-2">Manage your profile, notifications, security, and connected students</p>
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
              onClick={() => setActiveTab('connected-students')}
              className={`w-full text-left flex items-center gap-3 p-3 rounded-xl transition-colors ${
                activeTab === 'connected-students' ? 'bg-primary-100 text-primary-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Users className="w-5 h-5" /> Connected Students
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

export default ParentSettings;