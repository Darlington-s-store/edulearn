import React, { useState } from 'react';
import { Video, ExternalLink, Loader, Copy, Check } from 'lucide-react';
import axios from 'axios';

const ZoomMeetingButton = ({ liveClass, isTeacher = false }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleJoinMeeting = () => {
    const meetingLink = liveClass.meetingLink;
    if (meetingLink) {
      // Open Zoom meeting in new window
      window.open(meetingLink, '_blank', 'width=1200,height=800');
    }
  };

  const copyMeetingLink = () => {
    navigator.clipboard.writeText(liveClass.meetingLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyPassword = () => {
    const password = liveClass.settings?.zoomPassword;
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!liveClass.meetingLink) {
    return null;
  }

  return (
    <div>
      {/* Join Button */}
      <button
        onClick={handleJoinMeeting}
        disabled={isLoading}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            Connecting...
          </>
        ) : (
          <>
            <Video className="w-5 h-5" />
            {isTeacher ? 'Start Meeting' : 'Join Meeting'}
            <ExternalLink className="w-4 h-4" />
          </>
        )}
      </button>

      {/* Meeting Details Toggle */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="mt-2 text-sm text-blue-600 hover:text-blue-700 underline"
      >
        {showDetails ? 'Hide' : 'Show'} meeting details
      </button>

      {/* Meeting Details */}
      {showDetails && (
        <div className="mt-4 bg-gray-50 rounded-lg p-4 space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Meeting Link
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={liveClass.meetingLink}
                readOnly
                className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded text-sm"
              />
              <button
                onClick={copyMeetingLink}
                className="p-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                title="Copy link"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {liveClass.settings?.zoomPassword && (
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Meeting Password
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={liveClass.settings.zoomPassword}
                  readOnly
                  className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded text-sm font-mono"
                />
                <button
                  onClick={copyPassword}
                  className="p-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                  title="Copy password"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          )}

          {liveClass.settings?.zoomMeetingId && (
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Meeting ID
              </label>
              <input
                type="text"
                value={liveClass.settings.zoomMeetingId}
                readOnly
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm font-mono"
              />
            </div>
          )}

          <div className="pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-600">
              💡 Click "Join Meeting" to open Zoom in a new window. Make sure you have Zoom installed or use the web version.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZoomMeetingButton;
