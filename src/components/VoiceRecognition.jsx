import React, { useState, useRef, useEffect } from 'react';
import { Mic, X, Check, AlertCircle, Loader, Volume2 } from 'lucide-react';

function VoiceRecognition({ mode = 'login', onSuccess, onCancel }) {
  const [status, setStatus] = useState('idle'); // idle, recording, processing, success, error
  const [message, setMessage] = useState('');
  const [audioLevel, setAudioLevel] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [countdown, setCountdown] = useState(3);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recognitionRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);

  const passphrase = mode === 'login' 
    ? 'My voice is my password' 
    : 'I am registering my voice for secure authentication';

  useEffect(() => {
    // Initialize Web Speech API if available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript || interimTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };
    }

    return () => {
      // Cleanup
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      setStatus('recording');
      setMessage('Get ready to speak...');
      
      // Countdown before recording
      let count = 3;
      setCountdown(count);
      const countdownInterval = setInterval(() => {
        count--;
        setCountdown(count);
        if (count === 0) {
          clearInterval(countdownInterval);
          beginRecording();
        }
      }, 1000);

    } catch (error) {
      console.error('Recording error:', error);
      setStatus('error');
      setMessage('Microphone access denied. Please enable microphone permissions.');
    }
  };

  const beginRecording = async () => {
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Setup audio context for visualization
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;

      // Start audio level monitoring
      monitorAudioLevel();

      // Setup media recorder
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        processVoiceData(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      // Start recording
      mediaRecorderRef.current.start();
      setIsListening(true);
      setMessage(`Please say: "${passphrase}"`);

      // Start speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }

      // Auto-stop after 10 seconds
      setTimeout(() => {
        stopRecording();
      }, 10000);

    } catch (error) {
      console.error('Recording error:', error);
      setStatus('error');
      setMessage('Failed to start recording. Please check microphone permissions.');
    }
  };

  const monitorAudioLevel = () => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    
    const updateLevel = () => {
      analyserRef.current.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      setAudioLevel(Math.min(100, (average / 128) * 100));
      
      if (isListening) {
        animationFrameRef.current = requestAnimationFrame(updateLevel);
      }
    };

    updateLevel();
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    setStatus('processing');
    setMessage('Processing your voice...');
  };

  const processVoiceData = async (audioBlob) => {
    // Simulate voice processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Check if transcript matches passphrase (simplified check)
    const transcriptLower = transcript.toLowerCase();
    const passphraseLower = passphrase.toLowerCase();
    const similarity = calculateSimilarity(transcriptLower, passphraseLower);

    if (similarity > 0.6) {
      setStatus('success');
      setMessage(mode === 'login' ? 'Voice recognized successfully!' : 'Voice registered successfully!');
      
      // Convert audio blob to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setTimeout(() => {
          onSuccess({
            method: 'voice',
            voiceData: reader.result,
            transcript: transcript,
            timestamp: new Date().toISOString()
          });
        }, 1500);
      };
      reader.readAsDataURL(audioBlob);
    } else {
      setStatus('error');
      setMessage('Voice not recognized. Please try again and speak clearly.');
    }
  };

  const calculateSimilarity = (str1, str2) => {
    // Simple word matching similarity
    const words1 = str1.split(' ').filter(w => w.length > 2);
    const words2 = str2.split(' ').filter(w => w.length > 2);
    
    let matches = 0;
    words1.forEach(word => {
      if (words2.some(w => w.includes(word) || word.includes(w))) {
        matches++;
      }
    });

    return words1.length > 0 ? matches / words1.length : 0;
  };

  const playPassphrase = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(passphrase);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Mic className="w-6 h-6" />
            <div>
              <h2 className="text-2xl font-bold">
                {mode === 'login' ? 'Voice Recognition Login' : 'Voice Registration'}
              </h2>
              <p className="text-green-100 text-sm">
                {mode === 'login' ? 'Authenticate with your voice' : 'Register your voice for future logins'}
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {status === 'idle' && (
            <div className="text-center space-y-6">
              <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <Mic className="w-16 h-16 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {mode === 'login' ? 'Ready to Authenticate' : 'Ready to Register'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {mode === 'login' 
                    ? 'Speak your passphrase to authenticate'
                    : 'Record your voice to register for secure login'
                  }
                </p>
              </div>

              {/* Passphrase Display */}
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-green-900">Your Passphrase:</h4>
                  <button
                    onClick={playPassphrase}
                    className="flex items-center gap-2 text-green-700 hover:text-green-900 transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span className="text-sm">Listen</span>
                  </button>
                </div>
                <p className="text-lg font-medium text-green-800 italic">
                  "{passphrase}"
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                <h4 className="font-semibold text-blue-900 mb-2">Tips for best results:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Speak clearly and at a normal pace</li>
                  <li>• Find a quiet environment</li>
                  <li>• Hold your device at a comfortable distance</li>
                  <li>• Pronounce each word distinctly</li>
                  <li>• Avoid background noise</li>
                </ul>
              </div>

              <button
                onClick={startRecording}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all flex items-center justify-center gap-2"
              >
                <Mic className="w-5 h-5" />
                Start Recording
              </button>
            </div>
          )}

          {status === 'recording' && (
            <div className="space-y-6">
              {countdown > 0 ? (
                <div className="text-center py-12">
                  <div className="text-8xl font-bold text-green-600 mb-4 animate-pulse">
                    {countdown}
                  </div>
                  <p className="text-xl text-gray-600">Get ready to speak...</p>
                </div>
              ) : (
                <>
                  {/* Microphone Visualization */}
                  <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-12 flex items-center justify-center">
                    {/* Animated Circles */}
                    <div className="relative">
                      <div 
                        className="absolute inset-0 bg-green-500 rounded-full opacity-20 animate-ping"
                        style={{ 
                          animationDuration: '1.5s',
                          transform: `scale(${1 + audioLevel / 100})`
                        }}
                      ></div>
                      <div 
                        className="absolute inset-0 bg-green-400 rounded-full opacity-30 animate-pulse"
                        style={{ 
                          transform: `scale(${0.8 + audioLevel / 150})`
                        }}
                      ></div>
                      <div className="relative w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
                        <Mic className="w-16 h-16 text-white animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Audio Level Indicator */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 font-medium">Audio Level</span>
                      <span className="text-green-600 font-semibold">{Math.round(audioLevel)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-100 rounded-full"
                        style={{ width: `${audioLevel}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Passphrase Reminder */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <p className="text-sm text-green-700 font-medium mb-2">{message}</p>
                    <p className="text-lg font-semibold text-green-900 italic">
                      "{passphrase}"
                    </p>
                  </div>

                  {/* Live Transcript */}
                  {transcript && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-500 mb-1">You said:</p>
                      <p className="text-gray-800">{transcript}</p>
                    </div>
                  )}

                  {/* Recording Indicator */}
                  <div className="flex items-center justify-center gap-2 text-red-600">
                    <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Recording in progress...</span>
                  </div>

                  <button
                    onClick={stopRecording}
                    className="w-full bg-red-600 text-white py-4 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                  >
                    Stop Recording
                  </button>
                </>
              )}
            </div>
          )}

          {status === 'processing' && (
            <div className="text-center space-y-6 py-12">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Loader className="w-12 h-12 text-green-600 animate-spin" />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Processing...</h3>
                <p className="text-gray-600">{message}</p>
              </div>

              {transcript && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-xs text-gray-500 mb-1">Transcript:</p>
                  <p className="text-gray-800 text-sm">{transcript}</p>
                </div>
              )}
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

              {transcript && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-xs text-gray-500 mb-1">What we heard:</p>
                  <p className="text-gray-800 text-sm">{transcript}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={startRecording}
                  className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={onCancel}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VoiceRecognition;
