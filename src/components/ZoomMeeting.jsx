import React, { useEffect, useRef, useState } from 'react';
import { Video, VideoOff, Mic, MicOff, Monitor, Users, X, Loader } from 'lucide-react';
import axios from 'axios';

const ZoomMeeting = ({ liveClassId, onClose }) => {
  const meetingContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meetingJoined, setMeetingJoined] = useState(false);

  useEffect(() => {
    initializeZoomMeeting();
  }, [liveClassId]);

  const initializeZoomMeeting = async () => {
    try {
      setIsLoading(true);
      
      // Get Zoom SDK token from backend
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:5000/api/live-classes/${liveClassId}/zoom-token`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const { sdkToken, meetingNumber, password, userName, userEmail } = response.data.data;

      // Load Zoom SDK
      await loadZoomSDK();

      // Initialize Zoom Meeting SDK
      const { ZoomMtg } = window;
      ZoomMtg.setZoomJSLib('https://source.zoom.us/2.18.0/lib', '/av');
      ZoomMtg.preLoadWasm();
      ZoomMtg.prepareWebSDK();

      // Join meeting
      ZoomMtg.init({
        leaveUrl: window.location.origin,
        success: (success) => {
          console.log('Zoom SDK initialized', success);
          
          ZoomMtg.join({
            sdkKey: process.env.REACT_APP_ZOOM_SDK_KEY || 'YOUR_ZOOM_SDK_KEY',
            signature: sdkToken,
            meetingNumber: meetingNumber,
            password: password,
            userName: userName,
            userEmail: userEmail,
            success: (success) => {
              console.log('Joined meeting successfully', success);
              setMeetingJoined(true);
              setIsLoading(false);
            },
            error: (error) => {
              console.error('Failed to join meeting', error);
              setError('Failed to join meeting');
              setIsLoading(false);
            }
          });
        },
        error: (error) => {
          console.error('Zoom SDK initialization failed', error);
          setError('Failed to initialize Zoom');
          setIsLoading(false);
        }
      });

    } catch (error) {
      console.error('Zoom meeting error:', error);
      setError(error.response?.data?.message || 'Failed to start Zoom meeting');
      setIsLoading(false);
    }
  };

  const loadZoomSDK = () => {
    return new Promise((resolve, reject) => {
      if (window.ZoomMtg) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://source.zoom.us/2.18.0/lib/vendor/react.min.js';
      script.async = true;
      script.onload = () => {
        const script2 = document.createElement('script');
        script2.src = 'https://source.zoom.us/2.18.0/lib/vendor/react-dom.min.js';
        script2.async = true;
        script2.onload = () => {
          const script3 = document.createElement('script');
          script3.src = 'https://source.zoom.us/2.18.0/lib/vendor/redux.min.js';
          script3.async = true;
          script3.onload = () => {
            const script4 = document.createElement('script');
            script4.src = 'https://source.zoom.us/2.18.0/lib/vendor/redux-thunk.min.js';
            script4.async = true;
            script4.onload = () => {
              const script5 = document.createElement('script');
              script5.src = 'https://source.zoom.us/2.18.0/lib/vendor/lodash.min.js';
              script5.async = true;
              script5.onload = () => {
                const mainScript = document.createElement('script');
                mainScript.src = 'https://source.zoom.us/zoom-meeting-2.18.0.min.js';
                mainScript.async = true;
                mainScript.onload = resolve;
                mainScript.onerror = reject;
                document.body.appendChild(mainScript);
              };
              document.body.appendChild(script5);
            };
            document.body.appendChild(script4);
          };
          document.body.appendChild(script3);
        };
        document.body.appendChild(script2);
      };
      script.onerror = reject;
      document.body.appendChild(script);

      // Load CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://source.zoom.us/2.18.0/css/bootstrap.css';
      document.head.appendChild(link);

      const link2 = document.createElement('link');
      link2.rel = 'stylesheet';
      link2.href = 'https://source.zoom.us/2.18.0/css/react-select.css';
      document.head.appendChild(link2);
    });
  };

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md">
          <h3 className="text-xl font-bold text-red-600 mb-4">Error</h3>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={onClose}
            className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 text-center">
          <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-700">Connecting to Zoom meeting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Zoom Meeting Container */}
      <div id="zmmtg-root" ref={meetingContainerRef} className="w-full h-full"></div>
      
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-red-600 text-white p-3 rounded-full hover:bg-red-700 z-[100]"
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ZoomMeeting;
