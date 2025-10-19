# 🎥 Zoom SDK Integration for Live Classes

## ✅ What Was Implemented

Your educational platform now has **full Zoom integration** for live classes! Teachers can create Zoom meetings directly from the platform, and students can join with one click.

## 🎯 Features

### For Teachers:
- ✅ **Auto-create Zoom meetings** when scheduling live classes
- ✅ **Meeting management** (update, delete)
- ✅ **View participants** in real-time
- ✅ **Access recordings** after class
- ✅ **Waiting room** and **password** options
- ✅ **Auto-recording** to cloud

### For Students:
- ✅ **One-click join** meetings
- ✅ **Copy meeting link** and password
- ✅ **View meeting details**
- ✅ **Access recordings** after class

## 🔑 Setup Instructions

### Step 1: Create Zoom App

1. Go to [Zoom Marketplace](https://marketplace.zoom.us/)
2. Sign in with your Zoom account
3. Click **"Develop"** → **"Build App"**
4. Choose **"Server-to-Server OAuth"** app type
5. Fill in app details:
   - **App Name**: Edu-Learn Platform
   - **Company Name**: Your Company
   - **Developer Contact**: Your Email

### Step 2: Get Credentials

After creating the app:

1. Go to **"App Credentials"** tab
2. Copy these values:
   - **Account ID**
   - **Client ID** (this is your API Key)
   - **Client Secret** (this is your API Secret)

### Step 3: Add Scopes

1. Go to **"Scopes"** tab
2. Add these scopes:
   - `meeting:write:admin` - Create meetings
   - `meeting:read:admin` - Read meeting details
   - `meeting:update:admin` - Update meetings
   - `meeting:delete:admin` - Delete meetings
   - `recording:read:admin` - Access recordings
   - `user:read:admin` - Read user info

3. Click **"Continue"** and **"Activate"** your app

### Step 4: Configure Backend

Add to `backend/.env`:

```env
ZOOM_API_KEY=your_client_id_here
ZOOM_API_SECRET=your_client_secret_here
ZOOM_ACCOUNT_ID=your_account_id_here
```

### Step 5: Restart Backend

```bash
cd backend
npm start
```

That's it! Zoom integration is ready! 🎉

## 📦 Files Created

### Backend (1 file):
- `backend/utils/zoomService.js` - Zoom API service

### Frontend (2 files):
- `src/components/ZoomMeeting.jsx` - Full Zoom SDK integration (embedded)
- `src/components/ZoomMeetingButton.jsx` - Simple join button (recommended)

### Modified Files:
- `backend/controllers/liveClassController.js` - Added Zoom meeting creation
- `backend/routes/liveClassRoutes.js` - Added Zoom endpoints

## 🚀 How to Use

### For Teachers - Create Live Class with Zoom

```javascript
// In your LiveClass creation form
import React, { useState } from 'react';

function CreateLiveClass() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    scheduledDate: '',
    scheduledTime: '',
    duration: 60,
    useZoom: true,  // Enable Zoom
    password: '',    // Optional meeting password
    settings: {
      recordSession: true,
      waitingRoom: false
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await axios.post(
      'http://localhost:5000/api/live-classes',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    // Zoom meeting created automatically!
    console.log('Meeting Link:', response.data.data.meetingLink);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      
      <label>
        <input
          type="checkbox"
          checked={formData.useZoom}
          onChange={(e) => setFormData({...formData, useZoom: e.target.checked})}
        />
        Create Zoom Meeting
      </label>
      
      <button type="submit">Create Live Class</button>
    </form>
  );
}
```

### For Students - Join Live Class

```javascript
import ZoomMeetingButton from '../components/ZoomMeetingButton';

function LiveClassView({ liveClass }) {
  return (
    <div>
      <h1>{liveClass.title}</h1>
      <p>{liveClass.description}</p>
      
      {/* Add Zoom join button */}
      <ZoomMeetingButton 
        liveClass={liveClass}
        isTeacher={false}
      />
    </div>
  );
}
```

## 🌐 API Endpoints

### Create Live Class with Zoom
```
POST /api/live-classes
Body: {
  title: string,
  description: string,
  scheduledDate: string,
  scheduledTime: string,
  duration: number,
  useZoom: boolean,
  password: string (optional),
  settings: {
    recordSession: boolean,
    waitingRoom: boolean
  }
}
```

### Get Zoom SDK Token
```
POST /api/live-classes/:id/zoom-token
Response: {
  sdkToken: string,
  meetingNumber: string,
  password: string,
  role: number,
  userName: string,
  userEmail: string
}
```

### Get Meeting Participants
```
GET /api/live-classes/:id/participants
Response: Array of participant objects
```

### Get Meeting Recordings
```
GET /api/live-classes/:id/recordings
Response: Array of recording objects
```

## 💻 Component Usage

### Simple Join Button (Recommended)

```javascript
import ZoomMeetingButton from '../components/ZoomMeetingButton';

<ZoomMeetingButton 
  liveClass={liveClass}
  isTeacher={user.role === 'teacher'}
/>
```

**Features:**
- Opens Zoom in new window
- Shows meeting details
- Copy link and password
- Works with Zoom app or web

### Embedded Meeting (Advanced)

```javascript
import ZoomMeeting from '../components/ZoomMeeting';

const [showZoom, setShowZoom] = useState(false);

{showZoom && (
  <ZoomMeeting 
    liveClassId={liveClass.id}
    onClose={() => setShowZoom(false)}
  />
)}
```

**Features:**
- Embedded Zoom in your app
- Full SDK integration
- Requires Zoom SDK setup

## 🎨 Example Integration

### Complete Live Class Page

```javascript
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Video } from 'lucide-react';
import ZoomMeetingButton from '../components/ZoomMeetingButton';
import axios from 'axios';

function LiveClassDetails({ classId }) {
  const [liveClass, setLiveClass] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    fetchLiveClass();
  }, [classId]);

  const fetchLiveClass = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `http://localhost:5000/api/live-classes/${classId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    setLiveClass(response.data.data);
  };

  const handleEnroll = async () => {
    const token = localStorage.getItem('token');
    await axios.post(
      `http://localhost:5000/api/live-classes/${classId}/enroll`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    setIsEnrolled(true);
  };

  if (!liveClass) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {liveClass.title}
        </h1>
        <p className="text-gray-600 mb-6">{liveClass.description}</p>

        {/* Class Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span>{liveClass.scheduledDate}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Clock className="w-5 h-5 text-blue-600" />
            <span>{liveClass.scheduledTime}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Users className="w-5 h-5 text-blue-600" />
            <span>{liveClass.enrollments?.length || 0} enrolled</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Video className="w-5 h-5 text-blue-600" />
            <span>{liveClass.duration} minutes</span>
          </div>
        </div>

        {/* Zoom Meeting Section */}
        {liveClass.settings?.useZoom && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Video className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-800">Zoom Meeting</h3>
            </div>
            
            {isEnrolled ? (
              <ZoomMeetingButton 
                liveClass={liveClass}
                isTeacher={false}
              />
            ) : (
              <p className="text-sm text-gray-600">
                Enroll in this class to access the Zoom meeting
              </p>
            )}
          </div>
        )}

        {/* Enroll Button */}
        {!isEnrolled && (
          <button
            onClick={handleEnroll}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Enroll in This Class
          </button>
        )}
      </div>

      {/* Teacher Info */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Instructor</h3>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            {liveClass.teacher?.firstName?.[0]}
          </div>
          <div>
            <p className="font-medium text-gray-800">
              {liveClass.teacher?.firstName} {liveClass.teacher?.lastName}
            </p>
            <p className="text-sm text-gray-600">{liveClass.subject} Teacher</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveClassDetails;
```

## 🔧 Troubleshooting

### "Zoom credentials not configured"
**Solution:** Add `ZOOM_API_KEY`, `ZOOM_API_SECRET`, and `ZOOM_ACCOUNT_ID` to `backend/.env`

### "Failed to create Zoom meeting"
**Solutions:**
1. Check if Zoom app is activated
2. Verify scopes are added
3. Check API credentials are correct
4. Ensure account has meeting creation permissions

### Meeting link not working
**Solutions:**
1. Check if meeting was created successfully
2. Verify meeting hasn't expired
3. Check if meeting link is in database

### Can't join meeting
**Solutions:**
1. Make sure student is enrolled
2. Check if meeting time is correct
3. Verify Zoom app or web version is accessible

## 💡 Best Practices

1. **Always use `useZoom: true`** when creating live classes for automatic Zoom integration
2. **Enable recording** for students who can't attend live
3. **Use waiting room** for better class control
4. **Set passwords** for private classes
5. **Test meetings** before actual class time

## 📊 Zoom Features Available

| Feature | Supported | Notes |
|---------|-----------|-------|
| Create Meeting | ✅ | Automatic on class creation |
| Join Meeting | ✅ | One-click for students |
| Host Meeting | ✅ | Teachers get host privileges |
| Screen Share | ✅ | Enabled by default |
| Recording | ✅ | Cloud recording available |
| Waiting Room | ✅ | Optional setting |
| Password | ✅ | Optional setting |
| Participants List | ✅ | Teachers can view |
| Chat | ✅ | Built into Zoom |
| Breakout Rooms | ✅ | Available in Zoom |

## 🎓 Usage Flow

### Teacher Workflow:
1. Create live class with "Use Zoom" enabled
2. Zoom meeting created automatically
3. Share meeting link with students (automatic)
4. Start meeting at scheduled time
5. View participants during class
6. Access recordings after class

### Student Workflow:
1. Browse available live classes
2. Enroll in class
3. Receive meeting details
4. Click "Join Meeting" at class time
5. Zoom opens automatically
6. Access recordings later

## 🚀 Next Steps

1. **Add to LiveClass creation form:**
   - Add "Use Zoom" checkbox
   - Add password field (optional)
   - Add recording toggle

2. **Add to LiveClass view page:**
   - Import `ZoomMeetingButton`
   - Add component with liveClass data

3. **Test the integration:**
   - Create a test class with Zoom
   - Join as student
   - Verify meeting works

## 📚 Resources

- [Zoom API Documentation](https://marketplace.zoom.us/docs/api-reference/introduction)
- [Zoom Meeting SDK](https://marketplace.zoom.us/docs/sdk/native-sdks/web)
- [Server-to-Server OAuth](https://marketplace.zoom.us/docs/guides/build/server-to-server-oauth-app)

---

**Your live classes now have professional Zoom integration!** 🎉

Teachers can create meetings with one click, and students can join seamlessly. All meeting management is handled automatically.
