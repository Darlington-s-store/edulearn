# Frontend-Backend Integration Guide

## ✅ What's Been Done

### 1. Backend API Setup
- ✅ PostgreSQL database with Neon
- ✅ Express.js REST API
- ✅ JWT authentication
- ✅ All CRUD endpoints for modules, assignments, quizzes, live classes
- ✅ Role-based access control

### 2. Frontend API Integration
- ✅ Axios HTTP client configured
- ✅ API utility with interceptors
- ✅ AuthContext updated to use backend API
- ✅ ContentContextAPI created with backend integration
- ✅ Service layer for all API calls

## 🔄 How to Switch to Backend

### Option 1: Quick Switch (Recommended)

Replace the ContentContext import in `app.jsx`:

**Before:**
```javascript
import { ContentProvider } from './contexts/ContentContext';
```

**After:**
```javascript
import { ContentProvider } from './contexts/ContentContextAPI';
```

### Option 2: Gradual Migration

Keep both contexts and migrate features one by one.

## 📦 Installation Steps

### 1. Install Frontend Dependencies

```bash
# In the root project folder (not backend)
npm install
```

This will install axios which was added to package.json.

### 2. Start Backend Server

```bash
cd backend
npm run dev
```

Backend should be running on `http://localhost:5000`

### 3. Start Frontend

```bash
# In root folder
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🧪 Testing the Integration

### Test Login

1. Go to `http://localhost:5173/login`
2. Use test credentials:
   - **Student**: student@example.com / password123
   - **Teacher**: teacher@example.com / password123
   - **Admin**: admin@example.com / password123

### Test Registration

1. Go to `http://localhost:5173/signup`
2. Fill in the form
3. New user will be created in the database

## 🔑 Key Changes

### AuthContext Changes

**Before (Mock Data):**
```javascript
const mockUsers = { ... };
// Local storage only
```

**After (Real API):**
```javascript
import api from '../utils/api';

const login = async (email, password, userType) => {
  const response = await api.post('/auth/login', { email, password, role: userType });
  const { user, token } = response.data.data;
  localStorage.setItem('token', token);
  // ...
};
```

### ContentContext Changes

**Before (Local State):**
```javascript
const [publishedContent, setPublishedContent] = useState({ ... });
localStorage.setItem('eduLearnContent', JSON.stringify(publishedContent));
```

**After (API Calls):**
```javascript
import { assignmentService } from '../services/contentService';

const publishAssignment = async (assignment) => {
  const response = await assignmentService.create(assignment);
  return response.data.data;
};
```

## 🔐 Authentication Flow

### 1. Login
```
User enters credentials
  ↓
POST /api/auth/login
  ↓
Backend validates & returns JWT token
  ↓
Token stored in localStorage
  ↓
Token sent in Authorization header for all requests
```

### 2. Protected Routes
```
User navigates to protected page
  ↓
API interceptor adds token to request
  ↓
Backend validates token
  ↓
Returns data or 401 Unauthorized
```

### 3. Token Expiration
```
Token expires (7 days by default)
  ↓
API returns 401
  ↓
Interceptor catches error
  ↓
Redirects to login page
```

## 📡 API Endpoints Used

### Authentication
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Modules
- `GET /api/modules` - Get all modules
- `POST /api/modules` - Create module (teacher)
- `PUT /api/modules/:id/publish` - Publish module
- `POST /api/modules/:id/enroll` - Enroll in module (student)

### Assignments
- `GET /api/assignments` - Get all assignments
- `POST /api/assignments` - Create assignment (teacher)
- `POST /api/assignments/:id/submit` - Submit assignment (student)
- `PUT /api/assignments/submissions/:id/grade` - Grade submission (teacher)

### Quizzes
- `GET /api/quizzes` - Get all quizzes
- `POST /api/quizzes` - Create quiz (teacher)
- `POST /api/quizzes/:id/attempt` - Start quiz attempt (student)
- `PUT /api/quizzes/attempts/:id/submit` - Submit quiz (student)

### Live Classes
- `GET /api/live-classes` - Get all live classes
- `POST /api/live-classes` - Create live class (teacher)
- `POST /api/live-classes/:id/enroll` - Enroll in class (student)
- `PUT /api/live-classes/:id/start` - Start class (teacher)

### Notifications
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read

## 🐛 Troubleshooting

### "Network Error" or "CORS Error"

**Solution:** Make sure backend is running on port 5000
```bash
cd backend
npm run dev
```

### "401 Unauthorized"

**Solution:** Token expired or invalid
- Clear localStorage
- Login again

### "Cannot connect to database"

**Solution:** Check backend .env file
- Verify DATABASE_URL is correct
- Check Neon database is active

### Changes not reflecting

**Solution:** 
1. Clear browser cache
2. Check browser console for errors
3. Verify API calls in Network tab

## 📝 Environment Variables

### Frontend (.env in root)
```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (backend/.env)
```env
DATABASE_URL=your_neon_connection_string
JWT_SECRET=your_secret_key
PORT=5000
FRONTEND_URL=http://localhost:5173
```

## 🚀 Production Deployment

### Backend
1. Deploy to Heroku, Railway, or Render
2. Set environment variables
3. Update FRONTEND_URL to production domain

### Frontend
1. Update VITE_API_URL to production backend URL
2. Build: `npm run build`
3. Deploy to Vercel, Netlify, or similar

## 📚 Next Steps

1. ✅ Test all user flows (login, signup, dashboard)
2. ✅ Test teacher features (create module, assignment, quiz)
3. ✅ Test student features (enroll, submit, take quiz)
4. 🔄 Add real-time features with Socket.IO (optional)
5. 🔄 Add file upload for assignments
6. 🔄 Add email notifications

## 💡 Tips

- Keep both backend and frontend running during development
- Use browser DevTools Network tab to debug API calls
- Check backend terminal for API logs
- Use the test accounts for quick testing
- Backend auto-creates notifications when content is published

## 🆘 Need Help?

Check these files:
- `backend/README.md` - Complete API documentation
- `backend/QUICKSTART.md` - Backend setup guide
- `src/utils/api.js` - API configuration
- `src/services/contentService.js` - API service functions
