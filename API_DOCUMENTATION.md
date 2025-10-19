# 📡 API Documentation - Edu-Learn Platform

Complete REST API documentation for all endpoints.

---

## 📋 Table of Contents

- [Base URL](#base-url)
- [Authentication](#authentication)
- [Response Format](#response-format)
- [Error Codes](#error-codes)
- [Auth Endpoints](#auth-endpoints)
- [User Endpoints](#user-endpoints)
- [Module Endpoints](#module-endpoints)
- [Assignment Endpoints](#assignment-endpoints)
- [Quiz Endpoints](#quiz-endpoints)
- [Live Class Endpoints](#live-class-endpoints)
- [AI Endpoints](#ai-endpoints)
- [Notification Endpoints](#notification-endpoints)

---

## 🌐 Base URL

**Development:**
```
http://localhost:5000/api
```

**Production:**
```
https://your-domain.com/api
```

---

## 🔐 Authentication

### JWT Token

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Getting a Token

Obtain a token by logging in:

```bash
POST /api/auth/login
```

The token is returned in the response and should be stored securely (localStorage/sessionStorage).

### Token Expiration

- **Default Expiration**: 7 days
- **Refresh**: Re-login to get a new token
- **Invalid Token**: Returns 401 Unauthorized

---

## 📦 Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error (development only)"
}
```

### Paginated Response

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

---

## ⚠️ Error Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Authentication required or failed |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource already exists |
| 500 | Server Error | Internal server error |

---

## 🔑 Auth Endpoints

### Register User

**Endpoint:** `POST /api/auth/register`

**Access:** Public

**Request Body:**
```json
{
  "email": "student@example.com",
  "password": "password123",
  "role": "student",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "age": 15,
  "grade": "10",
  "school": "Example High School"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid",
      "email": "student@example.com",
      "role": "student",
      "firstName": "John",
      "lastName": "Doe"
    },
    "token": "jwt_token_here"
  }
}
```

### Login User

**Endpoint:** `POST /api/auth/login`

**Access:** Public

**Request Body:**
```json
{
  "email": "student@example.com",
  "password": "password123",
  "role": "student"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "email": "student@example.com",
      "role": "student",
      "firstName": "John",
      "lastName": "Doe",
      "studentProfile": {
        "age": 15,
        "grade": "10",
        "school": "Example High School"
      }
    },
    "token": "jwt_token_here"
  }
}
```

### Get Current User

**Endpoint:** `GET /api/auth/me`

**Access:** Private

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "student@example.com",
    "role": "student",
    "firstName": "John",
    "lastName": "Doe",
    "studentProfile": {
      "age": 15,
      "grade": "10",
      "school": "Example High School",
      "points": 0,
      "streak": 0
    }
  }
}
```

---

## 👤 User Endpoints

### Update Profile

**Endpoint:** `PUT /api/users/profile`

**Access:** Private

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "age": 16,
  "grade": "11",
  "school": "New School",
  "bio": "I love learning!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "uuid",
    "email": "student@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890",
    "studentProfile": {
      "age": 16,
      "grade": "11",
      "school": "New School"
    }
  }
}
```

### Change Password

**Endpoint:** `PUT /api/users/change-password`

**Access:** Private

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "currentPassword": "password123",
  "newPassword": "newpassword456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Current password is incorrect"
}
```

### Get Preferences

**Endpoint:** `GET /api/users/preferences`

**Access:** Private

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "emailNotifications": true,
    "pushNotifications": true,
    "assignmentReminders": true,
    "classReminders": true,
    "gradeUpdates": true,
    "weeklyReport": false,
    "theme": "light",
    "language": "en",
    "fontSize": "medium"
  }
}
```

### Update Notification Preferences

**Endpoint:** `PUT /api/users/preferences/notifications`

**Access:** Private

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "emailNotifications": true,
  "pushNotifications": false,
  "assignmentReminders": true,
  "classReminders": true,
  "gradeUpdates": true,
  "weeklyReport": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Notification preferences updated successfully",
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "emailNotifications": true,
    "pushNotifications": false,
    "assignmentReminders": true,
    "classReminders": true,
    "gradeUpdates": true,
    "weeklyReport": true
  }
}
```

### Update Appearance Preferences

**Endpoint:** `PUT /api/users/preferences/appearance`

**Access:** Private

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "theme": "dark",
  "language": "es",
  "fontSize": "large"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Appearance preferences updated successfully",
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "theme": "dark",
    "language": "es",
    "fontSize": "large"
  }
}
```

---

## 📚 Module Endpoints

### Get All Modules

**Endpoint:** `GET /api/modules`

**Access:** Public

**Query Parameters:**
- `subject` (optional) - Filter by subject
- `gradeLevel` (optional) - Filter by grade
- `status` (optional) - Filter by status

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Introduction to Algebra",
      "description": "Learn basic algebra concepts",
      "subject": "Mathematics",
      "gradeLevel": "9",
      "difficulty": "beginner",
      "status": "published",
      "teacher": {
        "id": "uuid",
        "firstName": "Jane",
        "lastName": "Smith"
      }
    }
  ]
}
```

### Get Module by ID

**Endpoint:** `GET /api/modules/:id`

**Access:** Public

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Introduction to Algebra",
    "description": "Learn basic algebra concepts",
    "content": {
      "lessons": [
        {
          "id": 1,
          "title": "Variables and Expressions",
          "content": "...",
          "duration": 30
        }
      ]
    },
    "subject": "Mathematics",
    "gradeLevel": "9",
    "difficulty": "beginner",
    "status": "published"
  }
}
```

### Create Module

**Endpoint:** `POST /api/modules`

**Access:** Private (Teacher only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Introduction to Algebra",
  "description": "Learn basic algebra concepts",
  "subject": "Mathematics",
  "gradeLevel": "9",
  "difficulty": "beginner",
  "content": {
    "lessons": [
      {
        "title": "Variables and Expressions",
        "content": "Lesson content here",
        "duration": 30
      }
    ]
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Module created successfully",
  "data": {
    "id": "uuid",
    "title": "Introduction to Algebra",
    "status": "draft"
  }
}
```

### Enroll in Module

**Endpoint:** `POST /api/modules/:id/enroll`

**Access:** Private (Student only)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Enrolled in module successfully",
  "data": {
    "enrollmentId": "uuid",
    "moduleId": "uuid",
    "studentId": "uuid",
    "progress": 0
  }
}
```

---

## 📝 Assignment Endpoints

### Get All Assignments

**Endpoint:** `GET /api/assignments`

**Access:** Private

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Math Homework",
      "description": "Complete exercises 1-10",
      "subject": "Mathematics",
      "dueDate": "2025-10-15",
      "totalPoints": 100,
      "status": "published",
      "teacher": {
        "firstName": "Jane",
        "lastName": "Smith"
      }
    }
  ]
}
```

### Submit Assignment

**Endpoint:** `POST /api/assignments/:id/submit`

**Access:** Private (Student only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "content": "My assignment submission text",
  "attachments": [
    {
      "name": "homework.pdf",
      "url": "https://..."
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Assignment submitted successfully",
  "data": {
    "id": "uuid",
    "assignmentId": "uuid",
    "studentId": "uuid",
    "status": "pending",
    "submittedAt": "2025-10-09T10:00:00.000Z"
  }
}
```

### Grade Submission

**Endpoint:** `PUT /api/assignments/submissions/:id/grade`

**Access:** Private (Teacher only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "grade": 85,
  "feedback": "Good work! Pay attention to question 5."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Submission graded successfully",
  "data": {
    "id": "uuid",
    "grade": 85,
    "feedback": "Good work! Pay attention to question 5.",
    "status": "graded"
  }
}
```

---

## 📝 Quiz Endpoints

### Get All Quizzes

**Endpoint:** `GET /api/quizzes`

**Access:** Private

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Algebra Quiz 1",
      "subject": "Mathematics",
      "totalPoints": 100,
      "timeLimit": 30,
      "status": "published"
    }
  ]
}
```

### Start Quiz Attempt

**Endpoint:** `POST /api/quizzes/:id/attempt`

**Access:** Private (Student only)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Quiz attempt started",
  "data": {
    "attemptId": "uuid",
    "quizId": "uuid",
    "questions": [
      {
        "id": 1,
        "question": "What is 2 + 2?",
        "options": ["2", "3", "4", "5"],
        "type": "multiple_choice"
      }
    ],
    "startedAt": "2025-10-09T10:00:00.000Z",
    "timeLimit": 30
  }
}
```

### Submit Quiz Attempt

**Endpoint:** `PUT /api/quizzes/attempts/:id/submit`

**Access:** Private (Student only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "answers": [
    {
      "questionId": 1,
      "answer": "4"
    },
    {
      "questionId": 2,
      "answer": "B"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Quiz submitted successfully",
  "data": {
    "attemptId": "uuid",
    "score": 85,
    "totalPoints": 100,
    "percentage": 85,
    "passed": true,
    "completedAt": "2025-10-09T10:30:00.000Z"
  }
}
```

---

## 🎥 Live Class Endpoints

### Get All Live Classes

**Endpoint:** `GET /api/live-classes`

**Access:** Private

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Math Class",
      "subject": "Mathematics",
      "scheduledDate": "2025-10-10",
      "scheduledTime": "14:00:00",
      "duration": 60,
      "meetingLink": "https://zoom.us/j/...",
      "status": "scheduled",
      "teacher": {
        "firstName": "Jane",
        "lastName": "Smith"
      }
    }
  ]
}
```

### Create Live Class

**Endpoint:** `POST /api/live-classes`

**Access:** Private (Teacher only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Math Class",
  "subject": "Mathematics",
  "scheduledDate": "2025-10-10",
  "scheduledTime": "14:00:00",
  "duration": 60,
  "settings": {
    "waitingRoom": true,
    "recording": true
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Live class created successfully",
  "data": {
    "id": "uuid",
    "title": "Math Class",
    "meetingLink": "https://zoom.us/j/123456789",
    "meetingId": "123456789",
    "password": "abc123",
    "status": "scheduled"
  }
}
```

### Enroll in Live Class

**Endpoint:** `POST /api/live-classes/:id/enroll`

**Access:** Private (Student only)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Enrolled in live class successfully",
  "data": {
    "enrollmentId": "uuid",
    "liveClassId": "uuid",
    "studentId": "uuid"
  }
}
```

---

## 🤖 AI Endpoints

### AI Study Assistant

**Endpoint:** `POST /api/ai/study-assistant`

**Access:** Private (Student only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "question": "Can you explain photosynthesis?",
  "moduleId": "uuid",
  "context": "Biology module"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "answer": "Photosynthesis is the process by which plants...",
    "relatedTopics": ["Chlorophyll", "Light reactions", "Carbon cycle"]
  }
}
```

### Generate Quiz

**Endpoint:** `POST /api/ai/generate-quiz`

**Access:** Private (Teacher only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "topic": "Photosynthesis",
  "subject": "Biology",
  "gradeLevel": "10",
  "numQuestions": 5,
  "difficulty": "medium"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "questions": [
      {
        "question": "What is the primary pigment in photosynthesis?",
        "options": ["Chlorophyll", "Carotene", "Xanthophyll", "Anthocyanin"],
        "correctAnswer": "Chlorophyll",
        "explanation": "Chlorophyll is the green pigment..."
      }
    ]
  }
}
```

### Get AI Recommendations

**Endpoint:** `GET /api/ai/recommendations`

**Access:** Private (Student only)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "recommendations": [
      {
        "moduleId": "uuid",
        "title": "Advanced Algebra",
        "reason": "Based on your strong performance in basic algebra",
        "priority": "high"
      }
    ]
  }
}
```

### Get Study Tips

**Endpoint:** `GET /api/ai/study-tips`

**Access:** Private (Student only)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "tips": [
      {
        "category": "Time Management",
        "tip": "Break study sessions into 25-minute focused blocks",
        "priority": "high"
      },
      {
        "category": "Mathematics",
        "tip": "Practice problems daily to reinforce concepts",
        "priority": "medium"
      }
    ]
  }
}
```

---

## 🔔 Notification Endpoints

### Get Notifications

**Endpoint:** `GET /api/notifications`

**Access:** Private

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `unread` (optional) - Filter unread only
- `type` (optional) - Filter by type

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "type": "assignment",
      "title": "New Assignment Posted",
      "message": "Math Homework has been posted",
      "link": "/student/assignments",
      "isRead": false,
      "createdAt": "2025-10-09T10:00:00.000Z"
    }
  ]
}
```

### Mark Notification as Read

**Endpoint:** `PUT /api/notifications/:id/read`

**Access:** Private

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

### Mark All as Read

**Endpoint:** `PUT /api/notifications/read-all`

**Access:** Private

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "All notifications marked as read"
}
```

---

## 🧪 Testing with Postman

### Setup

1. **Create Environment**
   - Variable: `base_url` = `http://localhost:5000/api`
   - Variable: `token` = (will be set after login)

2. **Login Request**
   ```
   POST {{base_url}}/auth/login
   Body: {
     "email": "student@example.com",
     "password": "password123",
     "role": "student"
   }
   ```

3. **Save Token**
   - In Tests tab:
   ```javascript
   pm.environment.set("token", pm.response.json().data.token);
   ```

4. **Use Token**
   - In Authorization tab: Bearer Token
   - Token: `{{token}}`

### Sample Collection

```json
{
  "info": {
    "name": "Edu-Learn API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/auth/login",
            "body": {
              "mode": "raw",
              "raw": "{\"email\":\"student@example.com\",\"password\":\"password123\",\"role\":\"student\"}"
            }
          }
        }
      ]
    }
  ]
}
```

---

## 📊 Rate Limiting

**Default Limits:**
- Authentication endpoints: 5 requests per 15 minutes
- General endpoints: 100 requests per 15 minutes
- AI endpoints: 20 requests per hour

**Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1633024800
```

---

## 🔒 Security Best Practices

### API Keys
- Never expose JWT_SECRET
- Rotate tokens regularly
- Use environment variables

### Request Validation
- Validate all input
- Sanitize data
- Check user permissions
- Verify ownership

### Error Handling
- Don't expose sensitive info
- Log errors securely
- Return generic messages
- Track failed attempts

---

## 📞 Support

For API issues:
1. Check endpoint URL
2. Verify authentication token
3. Check request body format
4. Review error response
5. Check backend logs
6. Test with curl/Postman

---

**Complete API documentation for 45+ endpoints! 🎉**

Everything you need to integrate with the Edu-Learn platform.
