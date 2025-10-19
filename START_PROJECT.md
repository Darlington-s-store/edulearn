# 🚀 Start Your Edu-Learn Project

## Quick Start (2 Terminals)

### Terminal 1: Backend
```bash
cd backend
npm run dev
```

Wait for:
```
✅ Database connection established successfully.
🚀 Server running on port 5000
```

### Terminal 2: Frontend
```bash
npm install
npm run dev
```

Your app will open at: `http://localhost:5173`

## 🧪 Test Accounts

Login with these credentials:

| Role | Email | Password |
|------|-------|----------|
| **Student** | student@example.com | password123 |
| **Teacher** | teacher@example.com | password123 |
| **Admin** | admin@example.com | password123 |
| **Parent** | parent@example.com | password123 |

## ✅ Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Can login with test account
- [ ] Dashboard loads correctly

## 🔧 If Something Goes Wrong

### Backend won't start
```bash
cd backend
npm install
npm run migrate
npm run dev
```

### Frontend won't start
```bash
npm install
npm run dev
```

### Can't login
- Check backend is running
- Check browser console for errors
- Try clearing localStorage

## 📚 Documentation

- **Backend API**: `backend/README.md`
- **Integration Guide**: `FRONTEND_BACKEND_INTEGRATION.md`
- **Backend Setup**: `backend/QUICKSTART.md`

## 🎯 What You Can Do Now

### As a Student
- ✅ View and enroll in modules
- ✅ Submit assignments
- ✅ Take quizzes
- ✅ Join live classes
- ✅ View notifications

### As a Teacher
- ✅ Create modules
- ✅ Create assignments
- ✅ Create quizzes
- ✅ Schedule live classes
- ✅ Grade student work

### As an Admin
- ✅ Manage all content
- ✅ View all users
- ✅ Access all features

## 🔄 To Use Backend API

In `src/app.jsx`, change:

```javascript
import { ContentProvider } from './contexts/ContentContext';
```

To:

```javascript
import { ContentProvider } from './contexts/ContentContextAPI';
```

This switches from mock data to real API calls!

## 🎉 You're Ready!

Your full-stack educational platform is now running with:
- ✅ PostgreSQL database (Neon)
- ✅ Express.js backend API
- ✅ React frontend
- ✅ JWT authentication
- ✅ Role-based access control

Happy coding! 🚀
