# Edu-Learn Backend API

A comprehensive RESTful API for the Edu-Learn educational platform built with Node.js, Express, and PostgreSQL.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Support for Students, Parents, Teachers, and Admins
- **Content Management**: Modules, Assignments, Quizzes, and Live Classes
- **Real-time Notifications**: Push notifications for important events
- **Secure**: Helmet.js for security headers, bcrypt for password hashing
- **Database**: PostgreSQL with Sequelize ORM

## 📋 Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository and navigate to backend folder**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL database**
   ```bash
   # Create a new database
   createdb edu_learn_db
   
   # Or using psql
   psql -U postgres
   CREATE DATABASE edu_learn_db;
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=edu_learn_db
   DB_USER=postgres
   DB_PASSWORD=your_password
   
   JWT_SECRET=your_secret_key_here
   JWT_EXPIRE=7d
   
   FRONTEND_URL=http://localhost:5173
   ```

5. **Run database migrations**
   ```bash
   npm run migrate
   ```

6. **Seed the database (optional)**
   ```bash
   npm run seed
   ```

## 🏃 Running the Server

### Development mode (with auto-reload)
```bash
npm run dev
```

### Production mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "role": "student",
  "firstName": "John",
  "lastName": "Doe",
  "age": 15,
  "grade": 9,
  "school": "Example School"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "role": "student"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

### Module Endpoints

#### Get All Modules
```http
GET /api/modules
```

#### Create Module (Teacher only)
```http
POST /api/modules
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Introduction to Algebra",
  "description": "Learn basic algebra",
  "subject": "Mathematics",
  "gradeLevel": "7-8",
  "difficulty": "beginner",
  "content": {
    "lessons": []
  }
}
```

#### Enroll in Module (Student only)
```http
POST /api/modules/:id/enroll
Authorization: Bearer <token>
```

### Assignment Endpoints

#### Get All Assignments
```http
GET /api/assignments
Authorization: Bearer <token>
```

#### Create Assignment (Teacher only)
```http
POST /api/assignments
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Math Homework",
  "description": "Complete problems 1-10",
  "subject": "Mathematics",
  "dueDate": "2025-10-15",
  "totalPoints": 100
}
```

#### Submit Assignment (Student only)
```http
POST /api/assignments/:id/submit
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "My submission text",
  "attachments": []
}
```

#### Grade Submission (Teacher only)
```http
PUT /api/assignments/submissions/:id/grade
Authorization: Bearer <token>
Content-Type: application/json

{
  "grade": 95,
  "feedback": "Excellent work!"
}
```

### Quiz Endpoints

#### Get All Quizzes
```http
GET /api/quizzes
Authorization: Bearer <token>
```

#### Create Quiz (Teacher only)
```http
POST /api/quizzes
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Algebra Quiz",
  "subject": "Mathematics",
  "questions": [
    {
      "question": "What is 2+2?",
      "type": "multiple-choice",
      "options": ["3", "4", "5", "6"],
      "correctAnswer": 1
    }
  ],
  "timeLimit": 30,
  "totalPoints": 100
}
```

#### Start Quiz Attempt (Student only)
```http
POST /api/quizzes/:id/attempt
Authorization: Bearer <token>
```

#### Submit Quiz Attempt (Student only)
```http
PUT /api/quizzes/attempts/:id/submit
Authorization: Bearer <token>
Content-Type: application/json

{
  "answers": {
    "0": 1,
    "1": 2
  }
}
```

### Live Class Endpoints

#### Get All Live Classes
```http
GET /api/live-classes
Authorization: Bearer <token>
```

#### Create Live Class (Teacher only)
```http
POST /api/live-classes
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Live Math Session",
  "subject": "Mathematics",
  "scheduledDate": "2025-10-10",
  "scheduledTime": "14:00:00",
  "duration": 60
}
```

#### Enroll in Live Class (Student only)
```http
POST /api/live-classes/:id/enroll
Authorization: Bearer <token>
```

### Notification Endpoints

#### Get Notifications
```http
GET /api/notifications
Authorization: Bearer <token>
```

#### Mark as Read
```http
PUT /api/notifications/:id/read
Authorization: Bearer <token>
```

#### Mark All as Read
```http
PUT /api/notifications/read-all
Authorization: Bearer <token>
```

## 🗄️ Database Schema

### Users Table
- id (UUID, Primary Key)
- email (String, Unique)
- password (String, Hashed)
- role (Enum: student, parent, teacher, admin)
- firstName, lastName
- phone, avatar
- isActive, emailVerified
- timestamps

### Student Profiles
- userId (Foreign Key)
- age, grade, school
- points, streak
- badges (JSONB)

### Teacher Profiles
- userId (Foreign Key)
- subject, institution
- bio, qualifications
- rating

### Modules
- teacherId (Foreign Key)
- title, description
- subject, gradeLevel, difficulty
- content (JSONB)
- status (draft, published, archived)

### Assignments
- teacherId (Foreign Key)
- title, description
- subject, dueDate
- totalPoints, instructions
- status

### Quizzes
- teacherId (Foreign Key)
- title, questions (JSONB)
- timeLimit, passingScore
- allowRetake, showCorrectAnswers

### Live Classes
- teacherId (Foreign Key)
- title, scheduledDate, scheduledTime
- duration, meetingLink
- status (scheduled, live, completed)

## 🔐 User Roles & Permissions

### Student/Parent
- View published content
- Enroll in modules and live classes
- Submit assignments and quizzes
- View notifications

### Teacher
- Create, update, delete own content
- Publish modules, assignments, quizzes
- Grade student submissions
- Manage live classes

### Admin
- Full access to all resources
- User management
- System configuration

## 🧪 Testing

Test credentials after running seed script:
- **Admin**: admin@example.com / password123
- **Teacher**: teacher@example.com / password123
- **Student**: student@example.com / password123
- **Parent**: parent@example.com / password123

## 📦 Project Structure

```
backend/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── moduleController.js  # Module CRUD
│   ├── assignmentController.js
│   ├── quizController.js
│   ├── liveClassController.js
│   └── notificationController.js
├── middleware/
│   ├── auth.js              # JWT authentication
│   ├── errorHandler.js      # Global error handler
│   └── validate.js          # Request validation
├── models/
│   ├── User.js
│   ├── StudentProfile.js
│   ├── TeacherProfile.js
│   ├── Module.js
│   ├── Assignment.js
│   ├── Quiz.js
│   ├── LiveClass.js
│   ├── Enrollment.js
│   ├── Notification.js
│   └── index.js             # Model associations
├── routes/
│   ├── authRoutes.js
│   ├── moduleRoutes.js
│   ├── assignmentRoutes.js
│   ├── quizRoutes.js
│   ├── liveClassRoutes.js
│   └── notificationRoutes.js
├── scripts/
│   ├── migrate.js           # Database migration
│   └── seed.js              # Seed data
├── utils/
│   └── generateToken.js     # JWT token generation
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js                # Entry point
```

## 🚨 Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error message here",
  "errors": []
}
```

Common HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |
| DB_HOST | Database host | localhost |
| DB_PORT | Database port | 5432 |
| DB_NAME | Database name | edu_learn_db |
| DB_USER | Database user | postgres |
| DB_PASSWORD | Database password | - |
| JWT_SECRET | JWT secret key | - |
| JWT_EXPIRE | Token expiration | 7d |
| FRONTEND_URL | Frontend URL | http://localhost:5173 |

## 📝 License

ISC

## 👥 Support

For issues and questions, please contact the development team.
