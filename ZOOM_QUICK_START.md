# 🚀 Zoom Integration - Quick Start

## ✅ What's Ready

Your platform now has **full Zoom integration** for live classes!

## 🔑 5-Minute Setup

### Step 1: Get Zoom Credentials (2 minutes)

1. Go to https://marketplace.zoom.us/
2. Sign in → Click **"Develop"** → **"Build App"**
3. Choose **"Server-to-Server OAuth"**
4. Fill in basic info and create app
5. Copy these 3 values:
   - **Account ID**
   - **Client ID** (API Key)
   - **Client Secret** (API Secret)

### Step 2: Add to Backend (1 minute)

Add to `backend/.env`:

```env
ZOOM_API_KEY=your_client_id
ZOOM_API_SECRET=your_client_secret
ZOOM_ACCOUNT_ID=your_account_id
```

### Step 3: Add Scopes (1 minute)

In your Zoom app settings, add these scopes:
- `meeting:write:admin`
- `meeting:read:admin`
- `meeting:update:admin`
- `recording:read:admin`

Click **"Activate"** your app.

### Step 4: Restart Backend (30 seconds)

```bash
cd backend
npm start
```

### Step 5: Use in Frontend (30 seconds)

```javascript
import ZoomMeetingButton from '../components/ZoomMeetingButton';

// In your LiveClass view:
<ZoomMeetingButton 
  liveClass={liveClass}
  isTeacher={user.role === 'teacher'}
/>
```

**Done!** 🎉

## 🎯 How It Works

### For Teachers:
1. Create live class with `useZoom: true`
2. Zoom meeting created automatically
3. Students get meeting link
4. Click "Start Meeting" to host

### For Students:
1. Enroll in live class
2. Click "Join Meeting" button
3. Zoom opens automatically
4. Join with one click!

## 📦 What Was Created

### Backend:
- ✅ `backend/utils/zoomService.js` - Zoom API integration
- ✅ `backend/controllers/liveClassController.js` - Auto-create meetings
- ✅ `backend/routes/liveClassRoutes.js` - New endpoints

### Frontend:
- ✅ `src/components/ZoomMeetingButton.jsx` - Join button
- ✅ `src/components/ZoomMeeting.jsx` - Embedded option

### API Endpoints:
- ✅ `POST /api/live-classes` - Create with Zoom
- ✅ `POST /api/live-classes/:id/zoom-token` - Get join token
- ✅ `GET /api/live-classes/:id/participants` - View participants
- ✅ `GET /api/live-classes/:id/recordings` - Get recordings

## 💻 Example Usage

### Create Live Class with Zoom

```javascript
const createClass = async () => {
  const response = await axios.post(
    'http://localhost:5000/api/live-classes',
    {
      title: 'Math Class',
      description: 'Algebra basics',
      scheduledDate: '2025-10-05',
      scheduledTime: '10:00',
      duration: 60,
      useZoom: true,  // ← Enable Zoom
      password: '123456',  // Optional
      settings: {
        recordSession: true,
        waitingRoom: false
      }
    },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  
  console.log('Meeting Link:', response.data.data.meetingLink);
};
```

### Display Join Button

```javascript
function LiveClassView({ liveClass }) {
  return (
    <div className="p-6">
      <h1>{liveClass.title}</h1>
      
      {/* Zoom Join Button */}
      <ZoomMeetingButton 
        liveClass={liveClass}
        isTeacher={false}
      />
    </div>
  );
}
```

## 🎨 Features

- ✅ **Auto-create meetings** when scheduling classes
- ✅ **One-click join** for students
- ✅ **Copy meeting link** and password
- ✅ **Cloud recordings** available after class
- ✅ **Waiting room** and **password** options
- ✅ **View participants** (teachers only)
- ✅ **Host controls** for teachers

## 🔧 Troubleshooting

### "Zoom credentials not configured"
→ Add credentials to `backend/.env` and restart

### "Failed to create meeting"
→ Check if Zoom app is activated and scopes are added

### Meeting link not working
→ Verify meeting was created (check `liveClass.meetingLink`)

## 📚 Full Documentation

See `ZOOM_INTEGRATION.md` for complete details, examples, and advanced features.

---

**Your live classes now have professional Zoom integration!** Teachers can create meetings instantly, and students can join with one click. 🎉
