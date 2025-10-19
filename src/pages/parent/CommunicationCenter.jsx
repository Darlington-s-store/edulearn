import React, { useState } from 'react';
import { MessageCircle, Send, User, GraduationCap, Info, Search, X } from 'lucide-react';

function CommunicationCenter() {
  const [activeChat, setActiveChat] = useState(null); // null, 'teacher', 'support'
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); // { sender: 'user' | 'other', text: '...' }
  const [searchQuery, setSearchQuery] = useState('');

  const contacts = [
    { id: 'teacher1', name: 'Mr. David Lee (Math)', role: 'Teacher', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 'teacher2', name: 'Ms. Emily White (Science)', role: 'Teacher', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 'support', name: 'Support Team', role: 'Admin', avatar: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250' },
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (message.trim() && activeChat) {
      setMessages([...messages, { sender: 'user', text: message }]);
      setMessage('');
      // Simulate a response
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'other', text: `Thanks for your message! We'll get back to you shortly.` }]);
      }, 1000);
    }
  };

  const getChatHeader = () => {
    if (!activeChat) return "Select a chat";
    const contact = contacts.find(c => c.id === activeChat);
    return contact ? `${contact.name} (${contact.role})` : "Unknown Chat";
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex">
      <div className="card flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Panel - Contacts */}
        <div className="w-full lg:w-1/3 border-r border-gray-200 bg-white flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-primary-600" /> Communication Center
            </h2>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search contacts..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredContacts.length > 0 ? (
              filteredContacts.map(contact => (
                <button
                  key={contact.id}
                  onClick={() => {
                    setActiveChat(contact.id);
                    setMessages([]); // Clear messages when switching chat
                  }}
                  className={`flex items-center gap-4 p-4 w-full text-left border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    activeChat === contact.id ? 'bg-primary-50 border-l-4 border-primary-600' : ''
                  }`}
                >
                  <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-gray-800">{contact.name}</p>
                    <p className="text-sm text-gray-500">{contact.role}</p>
                  </div>
                </button>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">No contacts found.</p>
            )}
          </div>
        </div>

        {/* Right Panel - Chat Window */}
        <div className="flex-1 flex flex-col bg-gray-100">
          <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">{getChatHeader()}</h3>
            <button className="text-gray-500 hover:text-gray-700">
              <Info className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {!activeChat ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <MessageCircle className="w-16 h-16 mb-4 text-gray-300" />
                <p className="text-lg">Select a contact to start chatting</p>
              </div>
            ) : (
              messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        msg.sender === 'user'
                          ? 'bg-primary-600 text-white rounded-br-none'
                          : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Start a conversation with {getChatHeader().split('(')[0].trim()}.
                </div>
              )
            )}
          </div>
          {activeChat && (
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-primary-600 text-white p-3 rounded-xl hover:bg-primary-700 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommunicationCenter;