# ✅ Frontend-Backend Integration Checklist

## 🎯 Quick Integration Steps

### Step 1: Install Frontend Dependencies ⏱️ 2 min
```bash
npm install
```

### Step 2: Start Backend Server ⏱️ 1 min
```bash
cd backend
npm run dev
```

**Expected Output:**
```
✅ Database connection established successfully.
✅ Database models synchronized
🚀 Server running on port 5000 in development mode
📡 API available at http://localhost:5000/api
```

### Step 3: Test Backend Health ⏱️ 30 sec
Open browser: `http://localhost:5000/health`

**Expected Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-10-03T..."
}
```

### Step 4: Activate API Integration ⏱️ 1 min

Edit `src/app.jsx`:

**Find this line (around line 16):**
```javascript
import { ContentProvider } from './contexts/ContentContext';
```

**Replace with:**
```javascript
import { ContentProvider } from './contexts/ContentContextAPI';
```

**Save the file.**

### Step 5: Start Frontend ⏱️ 1 min
```bash
# In root folder (not backend)
npm run dev
```

### Step 6: Test Login ⏱️ 1 min

1. Go to `http://localhost:5173/login`
2. Login as student:
   - Email: `student@example.com`
   - Password: `password123`
   - Role: Student
3. Click Login

**Expected:** Redirected to `/student/dashboard`

## ✅ Verification Checklist

### Backend Verification
- [ ] Backend server running on port 5000
- [ ] Health endpoint returns success
- [ ] No errors in backend terminal
- [ ] Database connection established

### Frontend Verification
- [ ] Frontend running on port 5173
- [ ] No console errors in browser
- [ ] Can access login page
- [ ] Can access signup page

### Integration Verification
- [ ] Can login with test account
- [ ] JWT token stored in localStorage
- [ ] User data stored in localStorage
- [ ] Dashboard loads after login
- [ ] Can logout successfully
- [ ] Can register new user

### Feature Testing
- [ ] Student can view modules
- [ ] Student can view assignments
- [ ] Teacher can create content
- [ ] Notifications load
- [ ] Profile page works

## 🐛 Troubleshooting

### Issue: "Network Error"
**Solution:**
```bash
# Check backend is running
cd backend
npm run dev
```

### Issue: "Cannot find module 'axios'"
**Solution:**
```bash
# Install dependencies
npm install
```

### Issue: "401 Unauthorized"
**Solution:**
- Clear localStorage
- Login again
- Check token in localStorage

### Issue: "CORS Error"
**Solution:**
- Backend should allow `http://localhost:5173`
- Check `backend/server.js` CORS config

### Issue: Changes not reflecting
**Solution:**
1. Hard refresh browser (Ctrl+Shift+R)
2. Clear browser cache
3. Restart frontend dev server

## 📊 Success Indicators

### You'll know it's working when:

1. **Login works** ✅
   - No errors in console
   - Token appears in localStorage
   - Redirected to dashboard

2. **Dashboard loads** ✅
   - User name displays correctly
   - Role-specific content shows
   - No API errors

3. **API calls work** ✅
   - Check Network tab in DevTools
   - See requests to `localhost:5000/api`
   - Status codes are 200 or 201

4. **Data persists** ✅
   - Logout and login again
   - Data is still there
   - Changes are saved

## 🎯 What You Can Test Now

### As Student (student@example.com)
1. Login
2. View dashboard
3. Check notifications
4. View modules
5. View assignments
6. View quizzes
7. Update profile

### As Teacher (teacher@example.com)
1. Login
2. View dashboard
3. Create new module
4. Create assignment
5. Create quiz
6. View student submissions

### As Admin (admin@example.com)
1. Login
2. View dashboard
3. Access all features
4. View system stats

## 📝 Quick Test Script

Run these in order:

```bash
# 1. Start backend
cd backend && c

# 2. In new terminal, start frontend
npm run dev

# 3. Open browser
# http://localhost:5173

# 4. Login with student@example.com / password123

# 5. Check browser console - should be no errors

# 6. Check Network tab - should see API calls to localhost:5000
```

## 🎉 Success!

If all checkboxes are ticked, your full-stack app is running!

### What's Connected:
- ✅ React Frontend
- ✅ Express Backend
- ✅ PostgreSQL Database
- ✅ JWT Authentication
- ✅ API Integration

### What You Can Do:
- ✅ Create real users
- ✅ Store real data
- ✅ Authenticate securely
- ✅ Access role-based features
- ✅ Deploy to production

## 🚀 Next Steps

1. **Test all features** with different roles
2. **Create your own content** (modules, assignments)
3. **Customize the UI** to your needs
4. **Add more features** as needed
5. **Deploy to production** when ready

## 📚 Documentation

- Full API docs: `backend/README.md`
- Integration guide: `FRONTEND_BACKEND_INTEGRATION.md`
- Project summary: `PROJECT_SUMMARY.md`

---

**Time to complete: ~10 minutes**
**Difficulty: Easy** 🟢

You've got this! 💪
