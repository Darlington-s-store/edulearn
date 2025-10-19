# Authentication & Subscription Flow Documentation

## Overview
Complete authentication and subscription system with automatic redirection based on user roles after signup and subscription.

## User Flows

### 1. **Student Signup Flow**
```
Student visits site
    ↓
Clicks "Sign Up" → Selects "Student"
    ↓
Fills registration form:
    - First Name, Last Name
    - Email, Password
    - Age, Grade, School
    - Agrees to Terms
    ↓
Submits form
    ↓
Account created & stored in localStorage
    ↓
**Automatically redirected to: /student/dashboard**
    ↓
Student can access:
    - Learning Modules
    - Assignments
    - Live Classes
    - Leaderboard
    - AI Tutor
    - Rewards
```

### 2. **Parent Signup & Subscription Flow**
```
Parent visits site
    ↓
Clicks "Pricing" or "Subscribe"
    ↓
Selects a plan (Basic/Family/Pro)
    ↓
If not logged in:
    - Plan details saved to localStorage
    - Redirected to /signup/parent
    ↓
Fills registration form:
    - First Name, Last Name
    - Email, Password, Phone
    - Agrees to Terms
    ↓
Submits form
    ↓
Account created
    ↓
**Automatically redirected to: /subscribe** (with saved plan)
    ↓
Completes subscription
    ↓
**Automatically redirected to: /student/dashboard**
    ↓
Parent can:
    - Manage children's profiles
    - View progress
    - Access all student features
```

### 3. **Teacher Signup Flow**
```
Teacher visits site
    ↓
Clicks "Sign Up" → Selects "Teacher"
    ↓
Fills registration form:
    - First Name, Last Name
    - Email, Password
    - Subject, Institution
    - Agrees to Terms
    ↓
Submits form
    ↓
Account created
    ↓
**Automatically redirected to: /teacher/dashboard**
    ↓
Teacher can access:
    - Post Modules
    - Create Assignments
    - Create Quizzes
    - View Student Reports
    - Live Classes
```

### 4. **Admin Signup Flow**
```
Admin credentials provided
    ↓
Logs in with admin@example.com
    ↓
**Automatically redirected to: /admin/dashboard**
    ↓
Admin can access:
    - User Management
    - Content Moderation
    - Analytics
    - System Settings
```

## Technical Implementation

### AuthContext (`src/contexts/AuthContext.jsx`)

#### Signup Function
```javascript
const signup = async (formData, userType) => {
  // Create new user
  const newUser = {
    id: Date.now(),
    email: formData.email,
    role: userType,
    firstName: formData.firstName,
    lastName: formData.lastName,
    // ... other fields
  };
  
  // Store user
  setUser(newUser);
  localStorage.setItem('user', JSON.stringify(newUser));
  
  // Auto-redirect based on role
  switch (userType) {
    case 'student':
      navigate('/student/dashboard');
      break;
    case 'parent':
      navigate('/subscribe');
      break;
    case 'teacher':
      navigate('/teacher/dashboard');
      break;
    case 'admin':
      navigate('/admin/dashboard');
      break;
  }
  
  return { success: true };
};
```

#### Login Function
```javascript
const login = async (email, password, userType) => {
  // Validate credentials
  const user = mockUsers[email];
  
  if (user && user.password === password && user.role === userType) {
    // Store user
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    
    // Auto-redirect based on role
    switch (userType) {
      case 'student':
        navigate('/student/dashboard');
        break;
      case 'parent':
        // Check for pending subscription
        const pending = localStorage.getItem('pendingPlan');
        if (pending) {
          navigate(`/subscribe?plan=${plan}&billing=${billing}`);
        } else {
          navigate('/subscribe');
        }
        break;
      case 'teacher':
        navigate('/teacher/dashboard');
        break;
      case 'admin':
        navigate('/admin/dashboard');
        break;
    }
    
    return { success: true };
  }
};
```

### Subscribe Page (`src/pages/Subscribe.jsx`)

#### Subscription Handler
```javascript
const handleSubscribe = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  // Save subscription
  const subscription = {
    planId: selectedPlan,
    billingCycle: billing,
    startedAt: new Date().toISOString()
  };
  const updatedUser = { ...user, subscription };
  localStorage.setItem('user', JSON.stringify(updatedUser));
  
  // Redirect based on user role
  switch (user.role) {
    case 'student':
      navigate('/student/dashboard');
      break;
    case 'parent':
      navigate('/student/dashboard');
      break;
    case 'teacher':
      navigate('/teacher/dashboard');
      break;
    case 'admin':
      navigate('/admin/dashboard');
      break;
  }
};
```

## Redirection Logic Summary

| User Role | After Signup | After Login | After Subscription |
|-----------|-------------|-------------|-------------------|
| **Student** | `/student/dashboard` | `/student/dashboard` | `/student/dashboard` |
| **Parent** | `/subscribe` | `/subscribe` (or with plan) | `/student/dashboard` |
| **Teacher** | `/teacher/dashboard` | `/teacher/dashboard` | `/teacher/dashboard` |
| **Admin** | `/admin/dashboard` | `/admin/dashboard` | `/admin/dashboard` |

## Protected Routes

All dashboard routes are protected by `ProtectedRoute` component:

```javascript
// Student routes
<Route path="/student/*" element={
  <ProtectedRoute allowedRoles={['student', 'parent']}>
    <StudentDashboard />
  </ProtectedRoute>
} />

// Teacher routes
<Route path="/teacher/*" element={
  <ProtectedRoute allowedRoles={['teacher']}>
    <TeacherDashboard />
  </ProtectedRoute>
} />

// Admin routes
<Route path="/admin/*" element={
  <ProtectedRoute allowedRoles={['admin']}>
    <AdminDashboard />
  </ProtectedRoute>
} />
```

## LocalStorage Data Structure

### User Object
```javascript
{
  id: 1,
  email: "student@example.com",
  role: "student",
  firstName: "Emma",
  lastName: "Johnson",
  age: 12,
  grade: 7,
  school: "Lincoln Middle School",
  points: 1250,
  avatar: "https://...",
  subscription: {
    planId: "family",
    billingCycle: "monthly",
    startedAt: "2025-10-03T17:00:00.000Z"
  }
}
```

### Pending Plan (for interrupted subscription flow)
```javascript
{
  plan: "family",
  billing: "monthly"
}
```

## User Experience Features

### 1. **Seamless Onboarding**
- No manual navigation required
- Automatic redirection to appropriate dashboard
- Preserved subscription intent across signup

### 2. **Role-Based Access**
- Each role sees only relevant features
- Protected routes prevent unauthorized access
- Consistent experience across all user types

### 3. **Subscription Continuity**
- Plan selection saved if user needs to signup
- Automatically resumed after account creation
- No need to re-select plan

### 4. **Success Feedback**
- Alert messages for successful actions
- Welcome banners with user name
- Clear confirmation of subscription

## Testing Scenarios

### Test 1: New Student Signup
1. Visit `/signup`
2. Select "Student"
3. Fill form and submit
4. **Expected:** Redirected to `/student/dashboard`
5. **Verify:** Can access Learning Modules

### Test 2: Parent Subscription Flow
1. Visit `/pricing`
2. Click "Choose Family Plan"
3. Not logged in → Redirected to `/signup/parent`
4. Complete signup
5. **Expected:** Redirected to `/subscribe` with Family plan pre-selected
6. Complete subscription
7. **Expected:** Redirected to `/student/dashboard`

### Test 3: Existing User Login
1. Visit `/login`
2. Enter credentials
3. Select role
4. **Expected:** Redirected to appropriate dashboard
5. **Verify:** User data loaded correctly

## Error Handling

### Invalid Credentials
- Shows error message
- Stays on login page
- Allows retry

### Missing Required Fields
- Form validation prevents submission
- Highlights missing fields
- Shows helpful error messages

### Network Errors
- Graceful error messages
- Allows retry
- Preserves form data

## Future Enhancements

1. **Email Verification**
   - Send verification email after signup
   - Verify before full access

2. **Password Reset**
   - Forgot password flow
   - Email-based reset

3. **Social Login**
   - Google, Facebook integration
   - One-click signup

4. **Multi-Factor Authentication**
   - SMS or email codes
   - Enhanced security

5. **Session Management**
   - Token-based auth
   - Auto-refresh tokens
   - Secure session handling

## Conclusion

The authentication and subscription system provides a seamless, role-based experience with automatic redirection to appropriate dashboards. Students can immediately start learning after signup, parents are guided through subscription, and all users have protected access to their respective features.
