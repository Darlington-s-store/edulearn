# 🔧 Troubleshooting: Courses Not Showing

## Issue: Can't see courses in student dashboard

### ✅ Backend Check (Completed)
- Backend is running ✅
- Database has 1 module: "Introduction to Algebra" ✅
- Module is published ✅

### 🔍 Possible Issues & Solutions

## Issue 1: Frontend Not Loading Data

### Check Browser Console:
1. Open browser (where app is running)
2. Press `F12` to open Developer Tools
3. Go to **Console** tab
4. Look for errors (red text)

### Common Errors:

#### Error: "Failed to load modules"
**Solution**: Backend not running or wrong API URL
```bash
# Check backend is running:
cd backend
npm run dev
```

#### Error: "401 Unauthorized" or "403 Forbidden"
**Solution**: Not logged in or token expired
```bash
# Clear localStorage and login again
1. Press F12
2. Go to Application tab
3. Click "Local Storage"
4. Click "Clear All"
5. Login again
```

#### Error: Network Error or CORS
**Solution**: Backend CORS issue
- Backend should be on port 5000
- Frontend should be on port 5173 or 5175
- Already fixed in backend/server.js

## Issue 2: Courses Page Shows Loading Forever

### Symptoms:
- Spinner keeps spinning
- No courses appear
- No error messages

### Solution:
Check if `getStudentModules()` is working:

1. Open browser console (F12)
2. Go to **Network** tab
3. Refresh the page
4. Look for request to `/api/modules`
5. Check if it returns data

### If No Request is Made:
The `useEffect` might not be triggering. Check if:
- Component is mounted
- Dependencies are correct

## Issue 3: Empty State Shows (No Courses)

### Symptoms:
- Page loads successfully
- Shows "No courses available" message
- But database has courses

### Possible Causes:

#### A. API Returns Empty Array
**Check**: Open Network tab, click on `/api/modules` request, check Response

**Solution**: Backend might be filtering out courses
```javascript
// In backend, check if status filter is correct
// Should return published modules
```

#### B. Frontend Filter Issue
**Check**: Search term or filter might be hiding courses

**Solution**: Clear search and set filter to "all"

## Issue 4: Module Not Marked as Published

### Check Module Status:
```bash
cd backend
node check-modules.js
```

Look for: `Status: published`

If status is "draft":
```bash
# Re-run seed to create published module
npm run seed
```

## 🧪 Quick Diagnostic Steps

### Step 1: Check Backend
```bash
cd backend
node check-modules.js
```
Expected: Shows 1 module "Introduction to Algebra" with status "published"

### Step 2: Check API Endpoint
Open in browser: `http://localhost:5000/api/modules`

Expected: JSON response with array of modules

### Step 3: Check Frontend Console
1. Open app in browser
2. Press F12
3. Go to Console tab
4. Refresh page
5. Look for errors

### Step 4: Check Network Requests
1. Press F12
2. Go to Network tab
3. Refresh page
4. Look for `/api/modules` request
5. Check status code (should be 200)
6. Check response data

## 🔄 Reset Everything

If nothing works, try a complete reset:

### 1. Reset Database
```bash
cd backend
npm run seed
```

### 2. Clear Browser Data
1. Press F12
2. Application tab
3. Clear Storage
4. Reload page

### 3. Restart Both Servers
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
npm run dev
```

### 4. Login Fresh
1. Go to login page
2. Login with: `student@example.com` / `password123`
3. Go to "My Courses" tab

## 📝 What Should Happen

When working correctly:
1. Student logs in
2. Goes to "My Courses" tab
3. Sees loading spinner briefly
4. Sees "Available Courses" section
5. Sees "Introduction to Algebra" course card
6. Can click "Preview" or "Enroll"

## 🆘 Still Not Working?

### Check These Files:

1. **`src/pages/student/Courses.jsx`**
   - Line 19: `const data = await getStudentModules();`
   - Should fetch modules from API

2. **`src/contexts/ContentContextAPI.jsx`**
   - `getStudentModules` function
   - Should call `moduleService.getAll()`

3. **`src/services/contentService.js`**
   - `moduleService.getAll()`
   - Should call `/api/modules`

4. **`backend/routes/moduleRoutes.js`**
   - GET `/` route
   - Should return published modules

### Enable Debug Mode:

Add console.log to see what's happening:

In `src/pages/student/Courses.jsx`, line 19:
```javascript
const data = await getStudentModules();
console.log('Modules loaded:', data); // Add this
setModules(data || []);
```

Refresh page and check console for output.

## 💡 Most Common Issue

**Backend not running or crashed**

Solution:
```bash
cd backend
npm run dev
```

Look for:
```
✅ Database connection established successfully.
🚀 Server running on port 5000
```

If you see errors, the backend needs to be fixed first.

---

## 🎯 Quick Fix Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173 or 5175
- [ ] Logged in as student
- [ ] On "My Courses" tab
- [ ] No errors in browser console
- [ ] Network tab shows successful API calls
- [ ] Database has published modules

If all checked and still not working, share the browser console errors for specific help!
