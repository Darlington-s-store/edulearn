import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, Check, AlertCircle, Loader } from 'lucide-react';

function FaceRecognition({ mode = 'login', onSuccess, onCancel }) {
  const [status, setStatus] = useState('idle'); // idle, initializing, scanning, success, error
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    return () => {
      // Cleanup: stop video stream when component unmounts
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      setStatus('initializing');
      setMessage('Initializing camera...');

      // Request camera access
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        }
      });

      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }

      setStatus('scanning');
      setMessage(mode === 'login' ? 'Position your face in the frame' : 'Registering your face...');
      
      // Start face detection simulation
      startFaceDetection();
    } catch (error) {
      console.error('Camera access error:', error);
      setStatus('error');
      setMessage('Camera access denied. Please enable camera permissions.');
    }
  };

  const startFaceDetection = () => {
    let progressValue = 0;
    const interval = setInterval(() => {
      progressValue += 5;
      setProgress(progressValue);

      if (progressValue === 30) {
        setMessage('Face detected! Hold still...');
      } else if (progressValue === 60) {
        setMessage('Analyzing facial features...');
      } else if (progressValue === 90) {
        setMessage('Verifying identity...');
      } else if (progressValue >= 100) {
        clearInterval(interval);
        completeFaceRecognition();
      }
    }, 100);
  };

  const completeFaceRecognition = async () => {
    // Capture face image
    const faceData = captureFaceImage();
    
    setStatus('success');
    setMessage(mode === 'login' ? 'Face recognized successfully!' : 'Face registered successfully!');
    
    // Stop camera
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    // Wait a moment to show success message
    setTimeout(() => {
      onSuccess({
        method: 'face',
        faceData: faceData,
        timestamp: new Date().toISOString()
      });
    }, 1500);
  };

  const captureFaceImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      
      // Convert to base64
      return canvas.toDataURL('image/jpeg', 0.8);
    }
    return null;
  };

  const handleCancel = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    onCancel();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Camera className="w-6 h-6" />
            <div>
              <h2 className="text-2xl font-bold">
                {mode === 'login' ? 'Face Recognition Login' : 'Face Registration'}
              </h2>
              <p className="text-blue-100 text-sm">
                {mode === 'login' ? 'Authenticate with your face' : 'Register your face for future logins'}
              </p>
            </div>
          </div>
          <button
            onClick={handleCancel}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {status === 'idle' && (
            <div className="text-center space-y-6">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Camera className="w-16 h-16 text-blue-600" />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {mode === 'login' ? 'Ready to Authenticate' : 'Ready to Register'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {mode === 'login' 
                    ? 'Click the button below to start face recognition authentication'
                    : 'Click the button below to register your face for secure login'
                  }
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                <h4 className="font-semibold text-blue-900 mb-2">Tips for best results:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Ensure good lighting on your face</li>
                  <li>• Remove glasses if possible</li>
                  <li>• Look directly at the camera</li>
                  <li>• Keep your face centered in the frame</li>
                  <li>• Stay still during scanning</li>
                </ul>
              </div>

              <button
                onClick={startCamera}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
              >
                <Camera className="w-5 h-5" />
                Start Camera
              </button>
            </div>
          )}

          {(status === 'initializing' || status === 'scanning') && (
            <div className="space-y-6">
              {/* Video Feed */}
              <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                
                {/* Face Detection Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Face Frame */}
                    <div className="w-64 h-80 border-4 border-blue-500 rounded-3xl relative">
                      {/* Corner Indicators */}
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-3xl"></div>
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-3xl"></div>
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-3xl"></div>
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-3xl"></div>
                      
                      {/* Scanning Line */}
                      {status === 'scanning' && (
                        <div 
                          className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-scan"
                          style={{ top: `${progress}%` }}
                        ></div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Camera Active</span>
                </div>
              </div>

              {/* Hidden canvas for capturing */}
              <canvas ref={canvasRef} className="hidden" />

              {/* Progress */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 font-medium">{message}</span>
                  <span className="text-blue-600 font-semibold">{progress}%</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">Keep your face in the frame</p>
                    <p>Make sure your entire face is visible and well-lit. Stay still while we scan.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center space-y-6 py-8">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-12 h-12 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
                <p className="text-gray-600">{message}</p>
              </div>

              <div className="flex items-center justify-center gap-2 text-green-600">
                <Loader className="w-5 h-5 animate-spin" />
                <span className="text-sm font-medium">
                  {mode === 'login' ? 'Logging you in...' : 'Completing registration...'}
                </span>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center space-y-6 py-8">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-12 h-12 text-red-600" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Error</h3>
                <p className="text-gray-600">{message}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={startCamera}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% {
            top: 0%;
          }
          100% {
            top: 100%;
          }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default FaceRecognition;
