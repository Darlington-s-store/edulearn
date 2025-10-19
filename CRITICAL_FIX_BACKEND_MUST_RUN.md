# 🚨 CRITICAL: Backend Must Stay Running!

## ❌ **The Main Problem**

Your errors show: `ERR_CONNECTION_REFUSED`

**This means: THE BACKEND SERVER IS NOT RUNNING!**

## ✅ **THE FIX (REQUIRED)**

### You MUST have TWO terminals running at the same time:

**Terminal 1 - Backend (MUST STAY OPEN):**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend (MUST STAY OPEN):**
```bash
npm run dev
```

## 🎯 **Critical Instructions**

### 1. Start Backend First:
```bash
cd backend
npm run dev
```

**WAIT until you see:**
```
✅ Database connection established successfully.
🚀 Server running on port 5000 in development mode
```

### 2. Keep Backend Terminal Open!
- **DO NOT close this terminal**
- **DO NOT press Ctrl+C**
- **LEAVE IT RUNNING**

### 3. Open NEW Terminal for Frontend:
```bash
npm run dev
```

### 4. Keep Frontend Terminal Open Too!
- **DO NOT close this terminal either**
- **Both must run simultaneously**

## 📊 What You Should See

### Backend Terminal:
```
✅ Database connection established successfully.
✅ Database models synchronized
🚀 Server running on port 5000 in development mode
📡 API available at http://localhost:5000/api

[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
```

### Frontend Terminal:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

## 🔍 Your Current Errors Explained

### Error 1: `ERR_CONNECTION_REFUSED`
```
:5000/api/notifications:1  Failed to load resource: net::ERR_CONNECTION_REFUSED
:5000/api/assignments:1  Failed to load resource: net::ERR_CONNECTION_REFUSED
:5000/api/modules:1  Failed to load resource: net::ERR_CONNECTION_REFUSED
```

**Cause**: Backend server is NOT running
**Fix**: Start backend and KEEP IT RUNNING

### Error 2: `400 Bad Request` on enrollment
```
:5000/api/modules/.../enroll:1  Failed to load resource: the server responded with a status of 400
```

**Cause**: This error only appears when backend IS running but request is malformed
**Fix**: This will be fixed once backend runs properly with authentication

## ✅ Step-by-Step Fix

### Step 1: Close Everything
- Close all terminals
- Close browser

### Step 2: Start Backend
```bash
cd backend
npm run dev
```

**WAIT** for success messages!

### Step 3: Open NEW Terminal
Don't close the backend terminal!
Open a completely new terminal window/tab.

### Step 4: Start Frontend
In the NEW terminal:
```bash
cd "c:\Users\hp\Desktop\lovable\Learniers project"
npm run dev
```

### Step 5: Open Browser
Go to: `http://localhost:5173` (or 5175)

### Step 6: Login
Use: `student@example.com` / `password123`

## 🎯 How to Know It's Working

### Backend Terminal Shows:
```
✅ Database connection established
🚀 Server running on port 5000
GET /api/modules 200 45.123 ms - 1234
```

### Browser Console Shows:
- ✅ No `ERR_CONNECTION_REFUSED` errors
- ✅ API calls succeed (200 status)
- ✅ Data loads

## 🚨 Common Mistakes

### Mistake 1: Closing Backend Terminal
❌ **Wrong**: Start backend → Close it → Start frontend
✅ **Right**: Start backend → KEEP IT OPEN → Start frontend in NEW terminal

### Mistake 2: Only One Terminal
❌ **Wrong**: Run backend OR frontend
✅ **Right**: Run backend AND frontend (both at same time)

### Mistake 3: Stopping Backend
❌ **Wrong**: Press Ctrl+C in backend terminal
✅ **Right**: Leave backend running the entire time

## 📝 Checklist

Before using the app, verify:

- [ ] Backend terminal is open and running
- [ ] Backend shows "Server running on port 5000"
- [ ] Frontend terminal is open and running  
- [ ] Frontend shows "Local: http://localhost:5173"
- [ ] Both terminals are still open
- [ ] Browser is at http://localhost:5173

## 🆘 If Backend Won't Start

### Check Port 5000:
```bash
# Windows
netstat -ano | findstr :5000

# If something is using it, kill it:
taskkill /PID <PID> /F
```

### Check Database Connection:
Make sure `.env` file exists in backend folder with:
```
DATABASE_URL=your_supabase_connection_string
```

### Reset Database:
```bash
cd backend
npm run seed
```

## 🎉 Success Looks Like

### Terminal 1 (Backend):
```
✅ Database connection established
🚀 Server running on port 5000
GET /api/modules 200 45.123 ms
GET /api/assignments 200 23.456 ms
```

### Terminal 2 (Frontend):
```
VITE ready in 234 ms
➜  Local:   http://localhost:5173/
```

### Browser:
- ✅ No errors in console
- ✅ App loads
- ✅ Can login
- ✅ Data shows up

---

## 🚀 **THE GOLDEN RULE**

**BOTH BACKEND AND FRONTEND MUST RUN AT THE SAME TIME!**

**NEVER CLOSE THE BACKEND TERMINAL WHILE USING THE APP!**

If you see `ERR_CONNECTION_REFUSED`, it means you closed the backend or it crashed. Start it again!
