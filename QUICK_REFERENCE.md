# 🚀 Quick Reference - Authentication System

## 📋 All Login URLs

| Role | Login URL | Signup URL | Theme |
|------|-----------|------------|-------|
| **Student** | `/login/student` | `/signup/student` | 🔵 Blue/Cyan |
| **Parent** | `/login/parent` | `/signup/parent` | 🟢 Green/Emerald |
| **Teacher** | `/login/teacher` | `/signup/teacher` | 🟣 Purple/Pink |
| **Admin** | `/admin/login` | N/A | ⚫ Dark Slate |
| **Role Selection** | `/get-started` | `/get-started` | 🌈 Multi-color |

---

## 🔐 Admin Credentials

```
URL:      http://localhost:5173/admin/login
Email:    admin@edulearn.com
Password: Admin@123
```

**To create admin in database:**
```bash
cd Backend
node seeders/createAdmin.js
```

---

## 🎯 Dashboard Routes

| Role | Dashboard URL |
|------|---------------|
| Student | `/student/dashboard` |
| Parent | `/student/dashboard` |
| Teacher | `/teacher/dashboard` |
| Admin | `/admin/dashboard` |

---

## 🔧 Start Commands

### Backend
```bash
cd Backend
npm start
# Runs on: http://localhost:5000
```

### Frontend
```bash
npm run dev
# Runs on: http://localhost:5173
```

---

## 🎨 Color Themes

### Student Pages
- Background: `from-blue-50 via-cyan-50 to-blue-100`
- Primary: `from-blue-500 to-cyan-500`
- Accent: Blue/Cyan

### Parent Pages
- Background: `from-green-50 via-emerald-50 to-green-100`
- Primary: `from-green-500 to-emerald-500`
- Accent: Green/Emerald

### Teacher Pages
- Background: `from-purple-50 via-pink-50 to-purple-100`
- Primary: `from-purple-500 to-pink-500`
- Accent: Purple/Pink

### Admin Pages
- Background: `from-slate-900 via-indigo-900 to-slate-900`
- Primary: `from-blue-500 via-purple-500 to-pink-500`
- Accent: Dark with neon highlights

---

## 🐛 Debug Commands

### Check Admin Token (Browser Console)
```javascript
localStorage.getItem('adminToken')
localStorage.getItem('adminUser')
```

### Check User Token (Browser Console)
```javascript
localStorage.getItem('token')
localStorage.getItem('user')
```

### Clear All Sessions
```javascript
localStorage.clear()
```

---

## ✅ Testing Checklist

### Admin Login
- [ ] Backend running on port 5000
- [ ] Admin created in database
- [ ] Navigate to `/admin/login`
- [ ] Enter `admin@edulearn.com` / `Admin@123`
- [ ] Click "Continue"
- [ ] Redirects to `/admin/dashboard`
- [ ] Can see dashboard content

### Student Login
- [ ] Navigate to `/login/student`
- [ ] Blue/Cyan theme visible
- [ ] Enter student credentials
- [ ] Redirects to `/student/dashboard`

### Teacher Login
- [ ] Navigate to `/login/teacher`
- [ ] Purple/Pink theme visible
- [ ] Enter teacher credentials
- [ ] Redirects to `/teacher/dashboard`

### Parent Login
- [ ] Navigate to `/login/parent`
- [ ] Green/Emerald theme visible
- [ ] Enter parent credentials
- [ ] Redirects to `/student/dashboard`

---

## 🔄 Authentication Flow Summary

### Admin
```
AdminLogin → AdminAuthContext → adminToken → /admin/dashboard
```

### Students/Teachers/Parents
```
RoleLogin → AuthContext → token → /role/dashboard
```

**Key:** Completely separate authentication systems with no interference!

---

## 📁 Key Files Modified

### Frontend
- ✅ `src/pages/auth/StudentLogin.jsx` - Student login page
- ✅ `src/pages/auth/ParentLogin.jsx` - Parent login page
- ✅ `src/pages/auth/TeacherLogin.jsx` - Teacher login page
- ✅ `src/pages/auth/AdminLogin.jsx` - Admin login (simplified)
- ✅ `src/pages/auth/StudentSignup.jsx` - Student signup
- ✅ `src/pages/auth/ParentSignup.jsx` - Parent signup
- ✅ `src/pages/auth/TeacherSignup.jsx` - Teacher signup
- ✅ `src/pages/auth/RoleSelection.jsx` - Role chooser
- ✅ `src/contexts/AuthContext.jsx` - Fixed to ignore admin
- ✅ `src/contexts/AdminAuthContext.jsx` - Admin auth (separate)
- ✅ `src/app.jsx` - All routes configured
- ✅ `src/components/Layout/Navbar.jsx` - Updated links

### Backend
- ✅ `Backend/seeders/createAdmin.js` - Creates admin user
- ✅ `Backend/controllers/authController.js` - Handles login
- ✅ `Backend/models/User.js` - User model with roles

---

## 🎉 What's Working

✅ **Separate Authentication Interfaces**
- Each role has dedicated login/signup pages
- Unique color themes for visual distinction
- No role selection tabs (direct role-specific pages)

✅ **Admin Access Fixed**
- Admin uses separate `AdminAuthContext`
- Separate storage keys (`adminToken` vs `token`)
- No interference with regular user authentication
- Direct redirect to `/admin/dashboard`

✅ **Routing**
- All role-specific routes configured
- Protected routes for each role
- Role selection page at `/get-started`

✅ **UI/UX**
- Beautiful, modern interfaces
- Smooth animations
- Responsive design
- Clear visual hierarchy

---

## 💡 Pro Tips

1. **Quick Admin Access:** Bookmark `http://localhost:5173/admin/login`
2. **Testing:** Use different browser profiles for different roles
3. **Debugging:** Check browser console for authentication logs
4. **Database:** Use `node Backend/list-users.js` to see all users
5. **Reset:** Clear localStorage if authentication seems stuck

---

**Everything is ready to use! 🎊**
