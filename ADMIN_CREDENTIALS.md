# 🔐 Admin Login Credentials

## Default Admin Account

**Login URL:** `http://localhost:5173/admin/login`

### Credentials

```
Email:    admin@edulearn.com
Password: Admin@123
```

---

## 🚀 Quick Start

### Step 1: Create Admin Account

Run the seed script to create the admin user:

```bash
# From the backend directory
cd backend
node seeders/createAdmin.js
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

⚠️  IMPORTANT: Change this password after first login!
```

### Step 2: Login to Admin Portal

1. Navigate to: `http://localhost:5173/admin/login`
2. Enter credentials:
   - Email: `admin@edulearn.com`
   - Password: `Admin@123`
3. Click "Continue"
4. Enter verification code: `123456` (for development)
5. Click "Verify & Login"
6. You'll be redirected to `/admin/dashboard`

---

## 🔄 Alternative: Manual Database Insert

If you prefer to create the admin manually in the database:

```sql
-- Hash the password first using bcrypt with 10 rounds
-- Password: Admin@123
-- Hashed: $2b$10$YourHashedPasswordHere

INSERT INTO users (
  id,
  email,
  password,
  role,
  first_name,
  last_name,
  phone,
  status,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'admin@edulearn.com',
  '$2b$10$YourHashedPasswordHere',  -- Replace with actual hash
  'admin',
  'Admin',
  'User',
  '+233 123 456 789',
  'active',
  NOW(),
  NOW()
);
```

---

## 📝 Additional Admin Accounts

You can create multiple admin accounts with different emails:

### Super Admin
```
Email:    superadmin@edulearn.com
Password: Super@123
```

### Operations Admin
```
Email:    operations@admin.edulearn.com
Password: Ops@123
```

### Technical Admin
```
Email:    tech@admin.edulearn.com
Password: Tech@123
```

**To create these, modify the seed script or use the same pattern.**

---

## 🔒 Security Best Practices

### After First Login

1. **Change Default Password**
   - Go to `/admin/settings`
   - Click "Security" tab
   - Change password to something secure

2. **Enable Two-Factor Authentication**
   - Go to `/admin/settings`
   - Click "Security" tab
   - Toggle "Two-Factor Authentication"

3. **Set IP Whitelist** (Optional)
   - Add trusted IP addresses
   - Restrict admin access to specific IPs

4. **Review Audit Logs**
   - Check for any suspicious activity
   - Monitor login attempts

### Password Requirements

For production, ensure passwords have:
- ✅ Minimum 12 characters
- ✅ Uppercase and lowercase letters
- ✅ Numbers
- ✅ Special characters
- ✅ No common words or patterns

---

## 🎯 What You Can Do as Admin

### User Management
- ✅ View all students, teachers, and parents
- ✅ See complete user credentials
- ✅ Search and filter users
- ✅ Delete user accounts
- ✅ Update user status
- ✅ Export user data

### Platform Management
- ✅ View platform statistics
- ✅ Monitor recent activities
- ✅ Configure system settings
- ✅ Enable/disable features
- ✅ Manage API keys
- ✅ Create database backups

### Settings
- ✅ Update admin profile
- ✅ Change password
- ✅ Configure notifications
- ✅ Set appearance preferences
- ✅ Manage security settings

---

## 🔍 Viewing User Credentials

### Students

1. Navigate to `/admin/students`
2. Click "View" button on any student
3. Modal shows:
   - Full name
   - Email address
   - Phone number
   - Age and grade
   - School name
   - Account created date
   - Last login time
   - Performance metrics

### Teachers

1. Navigate to `/admin/teachers`
2. Click "View" button on any teacher
3. Modal shows:
   - Full name
   - Email address
   - Phone number
   - Subject specialization
   - Institution
   - Account created date
   - Last login time
   - Bio

### Parents

1. Navigate to `/admin/parents` (coming soon)
2. Similar functionality to students and teachers

---

## 🛠️ Troubleshooting

### Cannot Login

**Issue:** "Please use an authorized admin email address"
- **Solution:** Ensure email contains `@admin.` or `@edulearn.`
- Example valid emails:
  - `admin@edulearn.com` ✅
  - `john@admin.company.com` ✅
  - `user@gmail.com` ❌

**Issue:** "Current password is incorrect"
- **Solution:** Use the default password `Admin@123`
- If changed, use your new password
- Reset via database if forgotten

**Issue:** Verification code not working
- **Solution:** For development, use `123456`
- In production, check email for actual code

### Backend Errors

**Issue:** 500 Internal Server Error
- **Solution:** Check backend logs
- Ensure database is running
- Verify all models are synced

**Issue:** Cannot see user data
- **Solution:** Ensure users exist in database
- Check API endpoint is working
- Verify JWT token is valid

---

## 📊 Test Data

For testing, you can create sample users:

```bash
# Run from backend directory
node seeders/createTestUsers.js
```

This will create:
- 10 students
- 5 teachers
- 5 parents

All with visible credentials in the admin panel.

---

## 🎉 Summary

**Default Admin Credentials:**
```
URL:      http://localhost:5173/admin/login
Email:    admin@edulearn.com
Password: Admin@123
```

**Setup Steps:**
1. Run `node backend/seeders/createAdmin.js`
2. Navigate to admin login page
3. Login with credentials above
4. Change password in settings
5. Start managing your platform!

**Admin Features:**
- ✅ Secure authentication with 2FA
- ✅ Complete user management
- ✅ View all user credentials
- ✅ Platform statistics
- ✅ System settings
- ✅ Activity monitoring

---

## ⚠️ Important Notes

1. **Change Default Password:** Always change the default password after first login
2. **Secure Your Admin Email:** Use a dedicated admin email domain
3. **Enable 2FA:** Always enable two-factor authentication in production
4. **Monitor Activity:** Regularly check audit logs for suspicious activity
5. **Backup Data:** Create regular database backups
6. **Update Regularly:** Keep the platform and dependencies updated

---

**Your admin panel is ready to use! 🚀**

For detailed documentation, see `ADMIN_FEATURES.md`

---

*Last Updated: October 2025*
