import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit3,
  Save,
  X,
  Camera,
  Shield,
  Bell,
  CreditCard,
  Users,
  Plus,
  Trash2
} from 'lucide-react';

function Profile({ userRole = 'student' }) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@email.com',
    phone: '+233 123 456 789',
    dateOfBirth: '2010-05-15',
    school: 'Accra International School',
    address: '123 Main Street, Accra, Ghana',
    bio: 'I love learning new things, especially math and science!',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  });

  const [subscriptionData] = useState({
    plan: 'Individual Plan',
    price: '₵500/month',
    nextBilling: '2024-02-15',
    status: 'Active',
    studentsCount: 1,
    maxStudents: userRole === 'family' ? 4 : 1
  });

  const [familyMembers, setFamilyMembers] = useState([
    {
      id: 1,
      name: 'Alex Johnson',
      age: 14,
      grade: '8th Grade',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    }
  ]);

  const handleSave = () => {
    setIsEditing(false);
    // Handle save logic here
    console.log('Profile updated:', profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const addFamilyMember = () => {
    if (familyMembers.length < subscriptionData.maxStudents) {
      const newMember = {
        id: Date.now(),
        name: '',
        age: '',
        grade: '',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
      };
      setFamilyMembers([...familyMembers, newMember]);
    }
  };

  const removeFamilyMember = (id) => {
    setFamilyMembers(familyMembers.filter(member => member.id !== id));
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'family', label: 'Family Members', icon: Users, show: userRole === 'family' },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield }
  ].filter(tab => tab.show !== false);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 font-playful">Profile & Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="card p-6">
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <img 
                  src={profileData.avatar} 
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white hover:bg-primary-600 transition-colors">
                  <Camera className="w-3 h-3" />
                </button>
              </div>
              <h3 className="font-semibold text-gray-800 mt-3">{profileData.firstName} {profileData.lastName}</h3>
              <p className="text-sm text-gray-500">{subscriptionData.plan}</p>
            </div>

            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="card p-8">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">Profile Information</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="btn-secondary flex items-center gap-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        className="btn-primary flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn-secondary flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={profileData.dateOfBirth}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">School</label>
                    <input
                      type="text"
                      name="school"
                      value={profileData.school}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:bg-gray-50"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={profileData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:bg-gray-50"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleChange}
                      disabled={!isEditing}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:bg-gray-50 resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Subscription Tab */}
            {activeTab === 'subscription' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Subscription Management</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="card p-6 bg-gradient-to-br from-primary-50 to-purple-50">
                    <h3 className="font-semibold text-gray-800 mb-2">Current Plan</h3>
                    <p className="text-2xl font-bold text-primary-600 mb-1">{subscriptionData.plan}</p>
                    <p className="text-gray-600">{subscriptionData.price}</p>
                    <div className="mt-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        subscriptionData.status === 'Active' 
                          ? 'bg-mint-100 text-mint-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {subscriptionData.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="card p-6">
                    <h3 className="font-semibold text-gray-800 mb-2">Next Billing</h3>
                    <p className="text-lg text-gray-600 mb-1">{subscriptionData.nextBilling}</p>
                    <p className="text-sm text-gray-500">Auto-renewal enabled</p>
                    <div className="mt-4">
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Update payment method
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <button className="btn-primary">
                    Upgrade to Family Plan
                  </button>
                  <button className="btn-secondary">
                    Change to Yearly Billing (Save 17%)
                  </button>
                  <button className="text-red-600 hover:text-red-700 font-medium">
                    Cancel Subscription
                  </button>
                </div>
              </div>
            )}

            {/* Family Members Tab */}
            {activeTab === 'family' && userRole === 'family' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">Family Members</h2>
                  <button
                    onClick={addFamilyMember}
                    disabled={familyMembers.length >= subscriptionData.maxStudents}
                    className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                    Add Student ({familyMembers.length}/{subscriptionData.maxStudents})
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {familyMembers.map((member) => (
                    <div key={member.id} className="card p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={member.avatar} 
                            alt={member.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-800">{member.name || 'New Student'}</h3>
                            <p className="text-sm text-gray-500">{member.grade}</p>
                          </div>
                        </div>
                        {familyMembers.length > 1 && (
                          <button
                            onClick={() => removeFamilyMember(member.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Student name"
                          value={member.name}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="number"
                            placeholder="Age"
                            value={member.age}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            placeholder="Grade"
                            value={member.grade}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Notification Preferences</h2>
                
                <div className="space-y-6">
                  <div className="card p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Email Notifications</h3>
                    <div className="space-y-3">
                      {[
                        'Assignment reminders',
                        'Class notifications',
                        'Progress reports',
                        'Payment reminders',
                        'Platform updates'
                      ].map((item, index) => (
                        <label key={index} className="flex items-center gap-3">
                          <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                          <span className="text-gray-700">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="card p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Push Notifications</h3>
                    <div className="space-y-3">
                      {[
                        'Live class starting soon',
                        'New assignments posted',
                        'Achievement unlocked',
                        'Friend requests'
                      ].map((item, index) => (
                        <label key={index} className="flex items-center gap-3">
                          <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                          <span className="text-gray-700">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Security Settings</h2>
                
                <div className="space-y-6">
                  <div className="card p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Change Password</h3>
                    <div className="space-y-4 max-w-md">
                      <input
                        type="password"
                        placeholder="Current password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <input
                        type="password"
                        placeholder="New password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <button className="btn-primary">Update Password</button>
                    </div>
                  </div>

                  <div className="card p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Two-Factor Authentication</h3>
                    <p className="text-gray-600 mb-4">Add an extra layer of security to your account</p>
                    <button className="btn-secondary">Enable 2FA</button>
                  </div>

                  <div className="card p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Login Sessions</h3>
                    <p className="text-gray-600 mb-4">Manage your active login sessions</p>
                    <button className="text-red-600 hover:text-red-700 font-medium">
                      Sign out all other sessions
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
