# 🚀 Quick Start - Admin Access

Get admin access to your Edu-Learn platform in 3 simple steps!

---

## ⚡ Quick Setup (3 Steps)

### Step 1: Create Admin Account

Open terminal in the backend directory and run:

```bash
cd backend
npm run seed:admin
```

**Output:**
```
✅ Admin user created successfully!

📧 Admin Credentials:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email:    admin@edulearn.com
Password: Admin@123
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔗 Login URL: http://localhost:5173/admin/login
```

### Step 2: Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Step 3: Login to Admin Panel

1. Open browser: `http://localhost:5173/admin/login`
2. Enter credentials:
   ```
   Email: admin@edulearn.com
   Password: Admin@123
   ```
3. Click "Continue"
4. Enter verification code: `123456` (development mode)
5. Click "Verify & Login"
6. ✅ You're in the admin dashboard!

---

## 🎯 What You Can Do Now

### View User Credentials

**Students:**
1. Click "Students" in sidebar
2. Click "View" button on any student
3. See complete credentials:
   - Email, Phone, Age, Grade, School
   - Account created date
   - Last login time

**Teachers:**
1. Click "Teachers" in sidebar
2. Click "View" button on any teacher
3. See complete credentials:
   - Email, Phone, Subject, Institution
   - Account created date
   - Last login time

### Manage Platform

- **Dashboard** - View statistics and recent activities
- **Students** - Manage student accounts
- **Teachers** - Manage teacher accounts
- **Payments** - View payment history
- **Activity Logs** - Monitor platform activity
- **Settings** - Configure platform settings

---

## 📊 Admin Credentials Summary

```
┌─────────────────────────────────────────┐
│  ADMIN LOGIN CREDENTIALS                │
├─────────────────────────────────────────┤
│  URL:      http://localhost:5173/admin/login
│  Email:    admin@edulearn.com          │
│  Password: Admin@123                    │
│  2FA Code: 123456 (dev mode)          │
└─────────────────────────────────────────┘
```

---

## 🔒 Security Reminder

⚠️ **IMPORTANT:** Change the default password after first login!

1. Go to `/admin/settings`
2. Click "Security" tab
3. Change password to something secure
4. Enable Two-Factor Authentication

---

## 🆘 Troubleshooting

### Admin account already exists?

If you see "Admin user already exists", you can:
- Use the existing credentials above
- Or delete the admin and recreate:

```bash
# In PostgreSQL
DELETE FROM users WHERE email = 'admin@edulearn.com';

# Then run seed again
npm run seed:admin
```

### Cannot login?

- ✅ Check backend is running on port 5000
- ✅ Check frontend is running on port 5173
- ✅ Verify email is `admin@edulearn.com`
- ✅ Verify password is `Admin@123`
- ✅ Use verification code `123456` in dev mode

### 500 Error?

- ✅ Check backend logs for errors
- ✅ Ensure database is running
- ✅ Run database migrations if needed

---

## 📖 Full Documentation

For complete admin features documentation, see:
- `ADMIN_CREDENTIALS.md` - Detailed credentials guide
- `ADMIN_FEATURES.md` - Complete feature documentation
- `API_DOCUMENTATION.md` - API endpoints reference

---

**You're all set! Start managing your platform! 🎉**
