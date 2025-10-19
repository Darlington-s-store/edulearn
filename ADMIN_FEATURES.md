# 🛡️ Admin Features - Complete Documentation

Complete guide for admin authentication, user management, and platform administration.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Admin Authentication](#admin-authentication)
- [Admin Dashboard](#admin-dashboard)
- [User Management](#user-management)
- [Settings Management](#settings-management)
- [API Endpoints](#api-endpoints)
- [Security Features](#security-features)

---

## 🎯 Overview

The admin panel provides comprehensive tools for platform management, including:
- Secure two-factor authentication
- User management (students, teachers, parents)
- Platform statistics and analytics
- System settings configuration
- Activity monitoring

---

## 🔐 Admin Authentication

### Admin Login Page

**Route:** `/admin/login`

**Features:**
- Two-step authentication process
- Email domain validation
- 6-digit verification code
- Enhanced security UI with dark theme
- Session management

**Step 1: Credentials**
```javascript
// Required fields
{
  email: "admin@edulearn.com",  // Must contain @admin. or @edulearn.
  password: "your_password"
}
```

**Step 2: Verification**
- 6-digit code sent to admin email
- Code input with auto-focus
- Resend code option
- 5-minute expiration

**Access:**
```
http://localhost:5173/admin/login
```

**Security Features:**
- Email domain validation
- Two-factor authentication
- Rate limiting (5 attempts per 15 minutes)
- Session timeout (7 days)
- Audit logging

---

## 📊 Admin Dashboard

### Dashboard Home

**Route:** `/admin/dashboard`

**Statistics Cards:**
1. **Total Students** - Count of all student accounts
2. **Active Teachers** - Count of active teacher accounts
3. **Monthly Revenue** - Platform revenue statistics
4. **Platform Uptime** - System health metrics

**Recent Activities:**
- User registrations
- Content uploads
- Assignment submissions
- Live class enrollments

**Payment Statistics:**
- Monthly revenue breakdown
- Subscriber counts
- Growth percentages

**System Health:**
- Active users count
- Server response time
- Error rate percentage

**Quick Actions:**
- Add Teacher
- Manage Students
- View Payments
- Activity Logs

---

## 👥 User Management

### Students Management

**Route:** `/admin/students`

**Features:**
- View all student accounts
- Search by name, email, or school
- Filter by status (active, inactive, suspended)
- View detailed student information
- Delete student accounts

**Student Details Modal:**
Shows complete account credentials:
- Full name
- Email address (font-mono for easy copying)
- Phone number
- Age and grade level
- School name
- Account creation date
- Last login timestamp
- Performance metrics (points, assignments, attendance)

**API Integration:**
```javascript
// Fetch students
GET /api/admin/users?role=student

// View student details
Click "View" button → Shows modal with all credentials

// Delete student
DELETE /api/admin/users/:id
```

**Displayed Information:**
```javascript
{
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@email.com",
  phone: "+1234567890",
  studentProfile: {
    age: 15,
    grade: "10",
    school: "Example High School"
  },
  createdAt: "2025-10-09T10:00:00.000Z",
  lastLogin: "2025-10-09T15:30:00.000Z",
  status: "active"
}
```

### Teachers Management

**Route:** `/admin/teachers`

**Features:**
- View all teacher accounts
- Search by name, email, or subject
- Filter by status (active, inactive, pending)
- View detailed teacher information
- Delete teacher accounts

**Teacher Details Modal:**
Shows complete account credentials:
- Full name
- Email address (font-mono for easy copying)
- Phone number
- Subject specialization
- Institution/School
- Account creation date
- Last login timestamp
- Bio (if provided)

**API Integration:**
```javascript
// Fetch teachers
GET /api/admin/users?role=teacher

// View teacher details
Click "View" button → Shows modal with all credentials

// Delete teacher
DELETE /api/admin/users/:id
```

**Displayed Information:**
```javascript
{
  firstName: "Jane",
  lastName: "Smith",
  email: "jane.smith@email.com",
  phone: "+1234567890",
  teacherProfile: {
    subject: "Mathematics",
    institution: "Example University",
    experience: "5 years",
    bio: "Passionate about teaching..."
  },
  createdAt: "2025-10-09T10:00:00.000Z",
  lastLogin: "2025-10-09T15:30:00.000Z",
  status: "active"
}
```

### Parents Management

**Route:** `/admin/parents` (Coming soon)

Similar features to students and teachers management.

---

## ⚙️ Settings Management

### Admin Settings

**Route:** `/admin/settings`

### Profile Tab

**Features:**
- Update admin profile information
- Change profile picture
- Update contact details
- Set department

**Fields:**
- First Name
- Last Name
- Email (read-only for security)
- Phone Number
- Department (Operations, Academic, Technical, Finance, HR)
- Bio

### Security Tab

**Password Change:**
- Current password verification
- New password (min 8 characters)
- Password confirmation
- Show/hide password toggles

**Security Options:**
- Two-Factor Authentication (toggle)
- Audit Logging (toggle)
- Maximum Login Attempts (3-10)
- Session Duration (1-30 days)
- IP Whitelist

### System Tab

**Platform Settings:**
- **Maintenance Mode** - Temporarily disable platform access
- **Allow New Registrations** - Enable/disable user sign-ups
- **Require Email Verification** - Force email verification
- **Enable AI Features** - Toggle AI tutor, quiz generator, etc.
- **Enable Zoom Integration** - Toggle live class features
- **Maximum Upload Size** - Set file upload limit (1-100 MB)
- **Database Backup Frequency** - Hourly, Daily, Weekly

### Advanced Tab

**System Maintenance:**
- Clear Application Cache
- Create Database Backup
- Manage API Keys (DeepSeek AI, Zoom SDK)
- System Reset (Danger Zone)

---

## 🔌 API Endpoints

### Authentication

```bash
# Admin login (Step 1)
POST /api/auth/login
Body: {
  "email": "admin@edulearn.com",
  "password": "password123",
  "role": "admin"
}

# Get current admin
GET /api/auth/me
Headers: Authorization: Bearer <token>
```

### Platform Statistics

```bash
# Get platform stats
GET /api/admin/stats
Headers: Authorization: Bearer <token>

Response: {
  "success": true,
  "data": {
    "users": {
      "totalStudents": 1247,
      "totalTeachers": 43,
      "totalParents": 856,
      "totalAdmins": 5,
      "newStudents": 45,
      "newTeachers": 3,
      "total": 2151
    },
    "content": {
      "totalModules": 0,
      "totalAssignments": 0,
      "totalQuizzes": 0,
      "totalLiveClasses": 0
    },
    "activity": {
      "totalEnrollments": 0,
      "totalSubmissions": 0,
      "pendingSubmissions": 0
    }
  }
}
```

### User Management

```bash
# Get all users (with filters)
GET /api/admin/users?role=student&search=john&page=1&limit=20
Headers: Authorization: Bearer <token>

Response: {
  "success": true,
  "data": [
    {
      "id": "uuid",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@email.com",
      "phone": "+1234567890",
      "role": "student",
      "status": "active",
      "createdAt": "2025-10-09T10:00:00.000Z",
      "studentProfile": {
        "age": 15,
        "grade": "10",
        "school": "Example School",
        "points": 1850
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1247,
    "pages": 63
  }
}

# Delete user
DELETE /api/admin/users/:id
Headers: Authorization: Bearer <token>

Response: {
  "success": true,
  "message": "User deleted successfully"
}

# Update user status
PUT /api/admin/users/:id/status
Headers: Authorization: Bearer <token>
Body: {
  "status": "suspended"
}

Response: {
  "success": true,
  "message": "User status updated successfully",
  "data": { ... }
}
```

### Activity Logs

```bash
# Get recent activities
GET /api/admin/activities?limit=20
Headers: Authorization: Bearer <token>

Response: {
  "success": true,
  "data": [
    {
      "type": "registration",
      "user": "John Doe",
      "action": "created account",
      "subject": "student",
      "title": "john.doe@email.com",
      "time": "2025-10-09T10:00:00.000Z"
    }
  ]
}
```

### Profile & Settings

```bash
# Update admin profile
PUT /api/users/profile
Headers: Authorization: Bearer <token>
Body: {
  "firstName": "Admin",
  "lastName": "User",
  "phone": "+1234567890",
  "department": "operations"
}

# Change password
PUT /api/users/change-password
Headers: Authorization: Bearer <token>
Body: {
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}

# Get preferences
GET /api/users/preferences
Headers: Authorization: Bearer <token>

# Update preferences
PUT /api/users/preferences/notifications
PUT /api/users/preferences/appearance
```

---

## 🔒 Security Features

### Authentication Security

1. **Two-Factor Authentication**
   - Email-based verification code
   - 6-digit numeric code
   - 5-minute expiration
   - Rate limiting on code requests

2. **Password Security**
   - Bcrypt hashing (10 rounds)
   - Minimum 8 characters
   - Current password verification required
   - Password history (prevent reuse)

3. **Session Management**
   - JWT tokens with 7-day expiration
   - Secure token storage
   - Auto-logout on token expiration
   - Session activity tracking

### Access Control

1. **Role-Based Access**
   - Admin-only routes protected
   - Middleware validation
   - Permission checks on all endpoints

2. **Admin Verification**
   ```javascript
   // Backend middleware
   const adminOnly = (req, res, next) => {
     if (req.user && req.user.role === 'admin') {
       next();
     } else {
       res.status(403).json({
         success: false,
         message: 'Access denied. Admin privileges required.'
       });
     }
   };
   ```

3. **Email Domain Validation**
   - Only @admin.* or @edulearn.* emails
   - Frontend and backend validation
   - Prevents unauthorized access

### Data Protection

1. **User Data Security**
   - Cannot delete other admins
   - Audit logging of all actions
   - IP tracking
   - Activity monitoring

2. **Sensitive Information**
   - Passwords never exposed
   - Email displayed in monospace font for copying
   - Phone numbers formatted
   - Timestamps in local timezone

### Audit Logging

All admin actions are logged:
- User deletions
- Status changes
- Settings modifications
- Login attempts
- Failed authentication

---

## 📱 User Interface

### Design Features

1. **Modern UI**
   - Gradient backgrounds
   - Smooth animations
   - Responsive design
   - Dark mode for admin login

2. **User-Friendly**
   - Clear navigation
   - Intuitive controls
   - Loading states
   - Error messages
   - Success notifications

3. **Data Display**
   - Searchable tables
   - Filterable lists
   - Sortable columns
   - Pagination
   - Modal details view

### Components

**Student/Teacher Cards:**
- Avatar with initials
- Name and email
- Status badge
- Quick actions (View, Edit, Delete)

**Details Modal:**
- Full-screen overlay
- Scrollable content
- Organized sections
- Copy-friendly formatting
- Close and Edit buttons

**Statistics Cards:**
- Large numbers
- Descriptive labels
- Trend indicators
- Color-coded icons

---

## 🧪 Testing

### Manual Testing

**Admin Login:**
```bash
1. Navigate to http://localhost:5173/admin/login
2. Enter admin email (must contain @admin. or @edulearn.)
3. Enter password
4. Click "Continue"
5. Enter 6-digit verification code
6. Click "Verify & Login"
7. Should redirect to /admin/dashboard
```

**View Student Credentials:**
```bash
1. Login as admin
2. Navigate to /admin/students
3. Click "View" button on any student
4. Modal opens showing:
   - Full name
   - Email (in monospace font)
   - Phone number
   - Age and grade
   - School name
   - Account created date
   - Last login time
   - Performance metrics
5. Click "Close" to dismiss
```

**Delete User:**
```bash
1. Login as admin
2. Navigate to /admin/students or /admin/teachers
3. Click trash icon on any user
4. Confirm deletion in popup
5. User is deleted and list refreshes
```

### API Testing

```bash
# Test admin authentication
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@edulearn.com",
    "password": "password123",
    "role": "admin"
  }'

# Test get students (requires admin token)
curl -X GET http://localhost:5000/api/admin/users?role=student \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"

# Test delete user (requires admin token)
curl -X DELETE http://localhost:5000/api/admin/users/USER_ID \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

---

## 🚀 Quick Start

### 1. Create Admin Account

```bash
# In backend, run seed script or manually create in database
INSERT INTO users (id, email, password, role, first_name, last_name)
VALUES (
  gen_random_uuid(),
  'admin@edulearn.com',
  '$2b$10$hashedpassword',  -- Use bcrypt to hash
  'admin',
  'Admin',
  'User'
);
```

### 2. Access Admin Portal

```
1. Navigate to: http://localhost:5173/admin/login
2. Login with admin credentials
3. Complete 2FA verification
4. Access admin dashboard
```

### 3. Manage Users

```
1. Click "Students" or "Teachers" in sidebar
2. View list of all users
3. Search/filter as needed
4. Click "View" to see full credentials
5. Click "Edit" to modify user
6. Click "Delete" to remove user
```

---

## 📊 Features Summary

### ✅ Implemented

- [x] Admin login page with 2FA
- [x] Admin dashboard with statistics
- [x] Students management page
- [x] Teachers management page
- [x] View complete user credentials
- [x] Delete users
- [x] Search and filter users
- [x] Admin settings page
- [x] Profile management
- [x] Password change
- [x] System settings
- [x] Security settings
- [x] Backend API endpoints
- [x] Admin middleware
- [x] Activity logging

### 🔄 Coming Soon

- [ ] Parents management page
- [ ] Edit user functionality
- [ ] Bulk user operations
- [ ] Export user data
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Role permissions management
- [ ] API key management UI
- [ ] System backup/restore UI

---

## 🎯 Key Achievements

### Security
✅ Two-factor authentication
✅ Role-based access control
✅ Email domain validation
✅ Audit logging
✅ Session management

### User Management
✅ View all user credentials
✅ Search and filter users
✅ Delete users
✅ Real-time data from database
✅ Detailed user information modal

### Admin Experience
✅ Modern, intuitive UI
✅ Fast and responsive
✅ Clear navigation
✅ Comprehensive settings
✅ System monitoring

---

## 📞 Support

### Common Issues

**Issue: Cannot login as admin**
- Verify email contains @admin. or @edulearn.
- Check password is correct
- Ensure admin account exists in database

**Issue: 500 error on dashboard**
- Check backend is running
- Verify database connection
- Check backend logs for errors

**Issue: Cannot see user credentials**
- Ensure you're logged in as admin
- Check API endpoint is working
- Verify user has required profile data

---

## 🎉 Conclusion

The admin panel is fully functional with:
- ✅ Secure authentication
- ✅ Complete user management
- ✅ Full credential visibility
- ✅ System settings control
- ✅ Activity monitoring

**Admin can now view all user credentials when students, teachers, and parents create accounts!**

---

*Last Updated: October 2025*
