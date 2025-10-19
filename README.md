# 🎓 Edu-Learn Platform - Complete Documentation

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)

A comprehensive full-stack educational platform with role-based access control, AI-powered features, and Zoom integration for live classes.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [AI Features](#ai-features)
- [Zoom Integration](#zoom-integration)
- [User Roles](#user-roles)
- [Security](#security)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

Edu-Learn is a modern, full-stack educational platform designed to facilitate online learning with comprehensive features for students, teachers, parents, and administrators. The platform provides a seamless learning experience with real-time notifications, AI-powered assistance, and integrated video conferencing.

### Key Highlights

- **Role-Based Access Control**: Four distinct user roles (Student, Teacher, Parent, Admin)
- **AI-Powered Learning**: DeepSeek AI integration for personalized learning assistance
- **Live Classes**: Zoom SDK integration for seamless video conferencing
- **Content Management**: Comprehensive system for modules, assignments, quizzes, and live classes
- **Real-Time Features**: Instant notifications and updates
- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **Modern UI/UX**: Responsive design with Tailwind CSS
- **Scalable Architecture**: PostgreSQL database with Sequelize ORM

---

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based authentication with secure token management
- Role-based access control (RBAC)
- Secure password hashing with bcrypt (10 rounds)
- Protected routes and API endpoints
- Session persistence with token refresh
- Email verification ready

### 👥 User Management
- Multi-role support (Student, Parent, Teacher, Admin)
- User registration with role-specific profiles
- Profile management and updates
- Password change functionality
- User activity tracking

### 📚 Content Management

#### Modules
- Create, edit, and delete learning modules
- Publish/unpublish functionality
- Rich content support (text, images, videos)
- Progress tracking for students
- Enrollment management
- Module categorization by subject and grade level

#### Assignments
- Create assignments with due dates
- File attachment support
- Submission tracking
- Grading system with feedback
- Late submission handling
- Grade analytics

#### Quizzes
- Multiple question types (multiple choice, true/false)
- Auto-grading functionality
- Time limits and attempt tracking
- Score calculation and analytics
- Retake options
- Instant feedback

#### Live Classes
- Schedule and manage live classes
- Zoom integration for video conferencing
- Enrollment management
- Attendance tracking
- Recording support
- Class status tracking (scheduled, live, completed)

### 🤖 AI Features (Powered by DeepSeek)
- **AI Study Assistant**: 24/7 intelligent tutoring
- **Quiz Generator**: Automatic question generation from topics
- **Assignment Feedback**: AI-powered grading suggestions
- **Content Recommendations**: Personalized learning paths
- **Study Tips**: Performance-based study advice
- **Content Summarization**: Quick review generation

### 🎥 Zoom Integration
- One-click meeting creation
- Automatic meeting link generation
- Waiting room and password support
- Cloud recording
- Participant management
- Meeting analytics

### 🔔 Notifications
- Real-time notification system
- Multiple notification types (assignment, quiz, grade, class)
- Mark as read/unread
- Unread count tracking
- Push notification ready

### 📊 Dashboard Features

#### Student Dashboard
- Overview with statistics
- Progress tracking and analytics
- Points and badges system
- Streak counter for engagement
- Quick access to enrolled content
- Leaderboard
- AI recommendations

#### Teacher Dashboard
- Student management
- Content creation tools
- Grading interface
- Analytics and reports
- Class scheduling
- Performance insights

#### Admin Dashboard
- User management
- Content moderation
- System analytics
- Activity logs
- Platform configuration

---

## 🛠️ Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI Framework |
| React Router DOM | 6.8.1 | Routing |
| Tailwind CSS | 3.3.2 | Styling |
| Lucide React | 0.263.1 | Icons |
| Axios | 1.6.2 | HTTP Client |
| Vite | 4.3.9 | Build Tool |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | ≥14.0.0 | Runtime |
| Express.js | 4.18.2 | Web Framework |
| PostgreSQL | ≥12.0.0 | Database |
| Sequelize | 6.35.2 | ORM |
| JWT | 9.0.2 | Authentication |
| Bcrypt | 2.4.3 | Password Hashing |
| Helmet | 7.1.0 | Security |
| CORS | 2.8.5 | Cross-Origin |
| Morgan | 1.10.0 | Logging |

### External Services
- **DeepSeek AI**: AI-powered features
- **Zoom SDK**: Video conferencing
- **Neon**: PostgreSQL hosting

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (React + Vite)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Student    │  │   Teacher    │  │    Admin     │      │
│  │  Dashboard   │  │  Dashboard   │  │  Dashboard   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │    React Context API (Auth + Content Management)     │  │
│  │    Axios HTTP Client + API Service Layer             │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTP/REST API
┌─────────────────────────────────────────────────────────────┐
│                  BACKEND (Express.js + Node.js)              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Routes → Controllers → Services → Models             │  │
│  │  JWT Auth Middleware + Role-Based Access Control     │  │
│  │  Error Handling + Validation + Security               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  External Integrations: DeepSeek AI + Zoom SDK       │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕ SQL Queries
┌─────────────────────────────────────────────────────────────┐
│              DATABASE (PostgreSQL - Neon Cloud)              │
│  Users | Profiles | Modules | Assignments | Quizzes         │
│  Submissions | Live Classes | Enrollments | Notifications   │
└─────────────────────────────────────────────────────────────┘
```

### Project Structure

```
Edu-Learn/
├── backend/                          # Backend API
│   ├── config/
│   │   └── database.js              # Database configuration
│   ├── controllers/                 # Request handlers
│   │   ├── authController.js
│   │   ├── moduleController.js
│   │   ├── assignmentController.js
│   │   ├── quizController.js
│   │   ├── liveClassController.js
│   │   ├── notificationController.js
│   │   └── aiController.js
│   ├── middleware/                  # Custom middleware
│   │   ├── auth.js                  # JWT authentication
│   │   └── errorHandler.js          # Error handling
│   ├── models/                      # Database models
│   │   ├── User.js
│   │   ├── StudentProfile.js
│   │   ├── TeacherProfile.js
│   │   ├── Module.js
│   │   ├── Assignment.js
│   │   ├── Submission.js
│   │   ├── Quiz.js
│   │   ├── QuizAttempt.js
│   │   ├── LiveClass.js
│   │   ├── Enrollment.js
│   │   ├── Notification.js
│   │   └── index.js                 # Model associations
│   ├── routes/                      # API routes
│   │   ├── authRoutes.js
│   │   ├── moduleRoutes.js
│   │   ├── assignmentRoutes.js
│   │   ├── quizRoutes.js
│   │   ├── liveClassRoutes.js
│   │   ├── notificationRoutes.js
│   │   └── aiRoutes.js
│   ├── utils/                       # Utility functions
│   │   ├── generateToken.js
│   │   ├── aiService.js             # AI integration
│   │   └── zoomService.js           # Zoom integration
│   ├── .env                         # Environment variables
│   ├── .env.example                 # Environment template
│   ├── server.js                    # Entry point
│   ├── package.json                 # Dependencies
│   └── README.md                    # Backend docs
│
├── src/                             # Frontend source
│   ├── components/                  # React components
│   │   ├── Layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── DashboardSidebar.jsx
│   │   │   └── DashboardTopbar.jsx
│   │   ├── AIStudyAssistant.jsx
│   │   ├── AIQuizGenerator.jsx
│   │   ├── AIAssignmentFeedback.jsx
│   │   ├── AIRecommendations.jsx
│   │   ├── AIStudyTips.jsx
│   │   ├── ZoomMeeting.jsx
│   │   ├── ZoomMeetingButton.jsx
│   │   ├── LiveClassSetupModal.jsx
│   │   └── ProtectedRoute.jsx
│   ├── contexts/                    # React contexts
│   │   ├── AuthContext.jsx          # Authentication
│   │   ├── ContentContext.jsx       # Mock data (dev)
│   │   └── ContentContextAPI.jsx    # API integration
│   ├── pages/                       # Page components
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── dashboards/
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── TeacherDashboard.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── student/                 # Student pages
│   │   │   ├── Modules.jsx
│   │   │   ├── Assignments.jsx
│   │   │   ├── Courses.jsx
│   │   │   ├── CourseDetail.jsx
│   │   │   ├── LessonViewer.jsx
│   │   │   ├── LiveClass.jsx
│   │   │   ├── Leaderboard.jsx
│   │   │   ├── Points.jsx
│   │   │   ├── Rewards.jsx
│   │   │   └── AITutor.jsx
│   │   ├── teacher/                 # Teacher pages
│   │   │   ├── PostModule.jsx
│   │   │   ├── PublishContent.jsx
│   │   │   ├── Assignments.jsx
│   │   │   ├── Quizzes.jsx
│   │   │   ├── LiveClasses.jsx
│   │   │   └── Reports.jsx
│   │   ├── admin/                   # Admin pages
│   │   │   ├── Students.jsx
│   │   │   ├── Teachers.jsx
│   │   │   ├── Payments.jsx
│   │   │   └── ActivityLogs.jsx
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Pricing.jsx
│   │   └── Subscribe.jsx
│   ├── services/
│   │   └── contentService.js        # API service layer
│   ├── utils/
│   │   └── api.js                   # Axios configuration
│   ├── app.jsx                      # Main app component
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Global styles
│
├── public/                          # Static assets
├── .env                             # Frontend environment
├── package.json                     # Frontend dependencies
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind configuration
├── postcss.config.js                # PostCSS configuration
├── index.html                       # HTML template
│
├── Documentation/                   # Project documentation
│   ├── AI_FEATURES.md
│   ├── ZOOM_INTEGRATION.md
│   ├── PROJECT_SUMMARY.md
│   ├── START_PROJECT.md
│   ├── FINAL_SETUP_CHECKLIST.md
│   └── [other docs...]
│
└── README.md                        # This file
```

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/)

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd Learniers-project
```

### Step 2: Install Dependencies

#### Frontend Dependencies
```bash
npm install
```

#### Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### Step 3: Database Setup

You have two options:

#### Option A: Use Neon (Cloud PostgreSQL) - Recommended
1. Sign up at [Neon.tech](https://neon.tech/)
2. Create a new project
3. Copy the connection string
4. Use in your `.env` file (see Configuration section)

#### Option B: Local PostgreSQL
```bash
# Create database
createdb edu_learn_db

# Or using psql
psql -U postgres
CREATE DATABASE edu_learn_db;
\q
```

### Step 4: Configure Environment Variables

#### Backend Configuration
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your configuration (see Configuration section below).

#### Frontend Configuration
Create `.env` in the project root:
```env
VITE_API_URL=http://localhost:5000/api
```

### Step 5: Initialize Database

```bash
cd backend
npm run migrate  # Run migrations (if available)
npm run seed     # Seed initial data
```

### Step 6: Start the Application

#### Terminal 1 - Backend Server
```bash
cd backend
npm run dev
```

Wait for:
```
✅ Database connection established successfully.
✅ Database models synchronized
🚀 Server running on port 5000 in development mode
📡 API available at http://localhost:5000/api
```

#### Terminal 2 - Frontend Server
```bash
# In project root
npm run dev
```

Wait for:
```
VITE v4.x.x ready in xxx ms
➜ Local: http://localhost:5173/
```

### Step 7: Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

---

## ⚙️ Configuration

### Backend Environment Variables

Create `backend/.env` file with the following configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration (Neon Cloud)
DB_HOST=your-neon-host.neon.tech
DB_PORT=5432
DB_NAME=neondb
DB_USER=neondb_owner
DB_PASSWORD=your_database_password

# OR Local PostgreSQL
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=edu_learn_db
# DB_USER=postgres
# DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# AI Configuration (DeepSeek)
DEEPSEEK_API_KEY=your_deepseek_api_key_here

# Zoom Configuration (Optional)
ZOOM_API_KEY=your_zoom_client_id
ZOOM_API_SECRET=your_zoom_client_secret
ZOOM_ACCOUNT_ID=your_zoom_account_id

# Email Configuration (Optional - for future use)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_email_password
```

### Frontend Environment Variables

Create `.env` in project root:

```env
VITE_API_URL=http://localhost:5000/api
```

### Getting API Keys

#### DeepSeek AI API Key
1. Visit [DeepSeek Platform](https://platform.deepseek.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy and add to `backend/.env`

#### Zoom API Credentials
1. Go to [Zoom Marketplace](https://marketplace.zoom.us/)
2. Sign in with your Zoom account
3. Click "Develop" → "Build App"
4. Choose "Server-to-Server OAuth"
5. Fill in app details and create
6. Copy Account ID, Client ID, and Client Secret
7. Add required scopes (see ZOOM_INTEGRATION.md)
8. Activate the app
9. Add credentials to `backend/.env`

---

## 📖 Usage

### Test Accounts

After seeding the database, you can use these test accounts:

| Role | Email | Password |
|------|-------|----------|
| **Student** | student@example.com | password123 |
| **Teacher** | teacher@example.com | password123 |
| **Admin** | admin@example.com | password123 |
| **Parent** | parent@example.com | password123 |

### User Workflows

#### As a Student
1. **Login** with student credentials
2. **Browse Modules** - View available learning modules
3. **Enroll** - Enroll in modules of interest
4. **Complete Lessons** - Work through module content
5. **Submit Assignments** - Upload assignment submissions
6. **Take Quizzes** - Complete quizzes with auto-grading
7. **Join Live Classes** - Attend scheduled live sessions
8. **Track Progress** - Monitor your learning progress
9. **Use AI Tutor** - Get help from AI study assistant
10. **View Leaderboard** - See your ranking and points

#### As a Teacher
1. **Login** with teacher credentials
2. **Create Modules** - Design learning modules
3. **Create Assignments** - Set up assignments with due dates
4. **Create Quizzes** - Build quizzes with AI assistance
5. **Schedule Live Classes** - Set up Zoom meetings
6. **Grade Submissions** - Review and grade student work
7. **Provide Feedback** - Use AI for feedback suggestions
8. **View Reports** - Analyze student performance
9. **Manage Students** - Track student progress

#### As an Admin
1. **Login** with admin credentials
2. **Manage Users** - Add, edit, or remove users
3. **Moderate Content** - Review and approve content
4. **View Analytics** - Access platform-wide statistics
5. **Monitor Activity** - Check activity logs
6. **Configure Settings** - Adjust platform settings

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Response Format

#### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

#### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": []
}
```

### Endpoints Overview

#### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login user | No |
| GET | `/auth/me` | Get current user | Yes |
| PUT | `/auth/profile` | Update profile | Yes |
| PUT | `/auth/password` | Change password | Yes |

#### Module Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/modules` | Get all modules | No | All |
| GET | `/modules/:id` | Get module by ID | No | All |
| POST | `/modules` | Create module | Yes | Teacher |
| PUT | `/modules/:id` | Update module | Yes | Teacher |
| DELETE | `/modules/:id` | Delete module | Yes | Teacher |
| POST | `/modules/:id/enroll` | Enroll in module | Yes | Student |
| GET | `/modules/:id/progress` | Get progress | Yes | Student |

#### Assignment Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/assignments` | Get all assignments | Yes | All |
| GET | `/assignments/:id` | Get assignment | Yes | All |
| POST | `/assignments` | Create assignment | Yes | Teacher |
| PUT | `/assignments/:id` | Update assignment | Yes | Teacher |
| DELETE | `/assignments/:id` | Delete assignment | Yes | Teacher |
| POST | `/assignments/:id/submit` | Submit assignment | Yes | Student |
| GET | `/assignments/:id/submissions` | Get submissions | Yes | Teacher |
| PUT | `/assignments/submissions/:id/grade` | Grade submission | Yes | Teacher |

#### Quiz Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/quizzes` | Get all quizzes | Yes | All |
| GET | `/quizzes/:id` | Get quiz | Yes | All |
| POST | `/quizzes` | Create quiz | Yes | Teacher |
| PUT | `/quizzes/:id` | Update quiz | Yes | Teacher |
| DELETE | `/quizzes/:id` | Delete quiz | Yes | Teacher |
| POST | `/quizzes/:id/attempt` | Start attempt | Yes | Student |
| PUT | `/quizzes/attempts/:id/submit` | Submit attempt | Yes | Student |
| GET | `/quizzes/:id/results` | Get results | Yes | Student |

#### Live Class Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/live-classes` | Get all classes | Yes | All |
| GET | `/live-classes/:id` | Get class | Yes | All |
| POST | `/live-classes` | Create class | Yes | Teacher |
| PUT | `/live-classes/:id` | Update class | Yes | Teacher |
| DELETE | `/live-classes/:id` | Delete class | Yes | Teacher |
| POST | `/live-classes/:id/enroll` | Enroll in class | Yes | Student |
| POST | `/live-classes/:id/zoom-token` | Get Zoom token | Yes | All |
| GET | `/live-classes/:id/participants` | Get participants | Yes | Teacher |
| GET | `/live-classes/:id/recordings` | Get recordings | Yes | All |

#### AI Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| POST | `/ai/generate-quiz` | Generate quiz questions | Yes | Teacher |
| POST | `/ai/assignment-feedback/:id` | Get AI feedback | Yes | Teacher |
| POST | `/ai/study-assistant` | Ask AI tutor | Yes | Student |
| GET | `/ai/recommendations` | Get recommendations | Yes | Student |
| GET | `/ai/study-tips` | Get study tips | Yes | Student |
| POST | `/ai/summarize/:moduleId` | Summarize content | Yes | Student |

#### Notification Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/notifications` | Get notifications | Yes |
| PUT | `/notifications/:id/read` | Mark as read | Yes |
| PUT | `/notifications/read-all` | Mark all as read | Yes |
| DELETE | `/notifications/:id` | Delete notification | Yes |

### Detailed API Examples

See `backend/README.md` for detailed request/response examples for each endpoint.

---

## 🗄️ Database Schema

### Entity Relationship Diagram

```
Users (1) ──────< (M) StudentProfiles
Users (1) ──────< (M) TeacherProfiles
Users (1) ──────< (M) Notifications

TeacherProfiles (1) ──────< (M) Modules
TeacherProfiles (1) ──────< (M) Assignments
TeacherProfiles (1) ──────< (M) Quizzes
TeacherProfiles (1) ──────< (M) LiveClasses

Modules (1) ──────< (M) Enrollments >────── (M) StudentProfiles
LiveClasses (1) ──────< (M) Enrollments >────── (M) StudentProfiles

Assignments (1) ──────< (M) Submissions >────── (M) StudentProfiles
Quizzes (1) ──────< (M) QuizAttempts >────── (M) StudentProfiles
```

### Tables

#### Users
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| email | VARCHAR(255) | Unique email |
| password | VARCHAR(255) | Hashed password |
| role | ENUM | student, parent, teacher, admin |
| firstName | VARCHAR(100) | First name |
| lastName | VARCHAR(100) | Last name |
| phone | VARCHAR(20) | Phone number |
| avatar | TEXT | Avatar URL |
| isActive | BOOLEAN | Account status |
| emailVerified | BOOLEAN | Email verification |
| createdAt | TIMESTAMP | Creation time |
| updatedAt | TIMESTAMP | Last update |

#### StudentProfiles
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| userId | UUID | Foreign key to Users |
| age | INTEGER | Student age |
| grade | VARCHAR(20) | Grade level |
| school | VARCHAR(255) | School name |
| points | INTEGER | Gamification points |
| streak | INTEGER | Learning streak |
| badges | JSONB | Earned badges |

#### TeacherProfiles
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| userId | UUID | Foreign key to Users |
| subject | VARCHAR(100) | Teaching subject |
| institution | VARCHAR(255) | Institution name |
| bio | TEXT | Biography |
| qualifications | TEXT | Qualifications |
| rating | DECIMAL | Teacher rating |

#### Modules
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| teacherId | UUID | Foreign key to TeacherProfiles |
| title | VARCHAR(255) | Module title |
| description | TEXT | Description |
| subject | VARCHAR(100) | Subject area |
| gradeLevel | VARCHAR(20) | Target grade |
| difficulty | ENUM | beginner, intermediate, advanced |
| content | JSONB | Module content |
| status | ENUM | draft, published, archived |
| createdAt | TIMESTAMP | Creation time |
| updatedAt | TIMESTAMP | Last update |

#### Assignments
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| teacherId | UUID | Foreign key to TeacherProfiles |
| title | VARCHAR(255) | Assignment title |
| description | TEXT | Description |
| subject | VARCHAR(100) | Subject area |
| dueDate | DATE | Due date |
| totalPoints | INTEGER | Maximum points |
| instructions | TEXT | Instructions |
| status | ENUM | draft, published, closed |
| createdAt | TIMESTAMP | Creation time |
| updatedAt | TIMESTAMP | Last update |

#### Submissions
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| assignmentId | UUID | Foreign key to Assignments |
| studentId | UUID | Foreign key to StudentProfiles |
| content | TEXT | Submission content |
| attachments | JSONB | File attachments |
| grade | INTEGER | Assigned grade |
| feedback | TEXT | Teacher feedback |
| status | ENUM | pending, graded, late |
| submittedAt | TIMESTAMP | Submission time |

#### Quizzes
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| teacherId | UUID | Foreign key to TeacherProfiles |
| title | VARCHAR(255) | Quiz title |
| subject | VARCHAR(100) | Subject area |
| questions | JSONB | Quiz questions |
| timeLimit | INTEGER | Time limit (minutes) |
| totalPoints | INTEGER | Maximum points |
| passingScore | INTEGER | Passing score |
| allowRetake | BOOLEAN | Allow retakes |
| showCorrectAnswers | BOOLEAN | Show answers after |
| status | ENUM | draft, published, archived |

#### QuizAttempts
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| quizId | UUID | Foreign key to Quizzes |
| studentId | UUID | Foreign key to StudentProfiles |
| answers | JSONB | Student answers |
| score | INTEGER | Achieved score |
| status | ENUM | in_progress, completed |
| startedAt | TIMESTAMP | Start time |
| completedAt | TIMESTAMP | Completion time |

#### LiveClasses
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| teacherId | UUID | Foreign key to TeacherProfiles |
| title | VARCHAR(255) | Class title |
| subject | VARCHAR(100) | Subject area |
| scheduledDate | DATE | Scheduled date |
| scheduledTime | TIME | Scheduled time |
| duration | INTEGER | Duration (minutes) |
| meetingLink | TEXT | Zoom meeting link |
| meetingId | VARCHAR(255) | Zoom meeting ID |
| password | VARCHAR(50) | Meeting password |
| status | ENUM | scheduled, live, completed, cancelled |
| settings | JSONB | Additional settings |

#### Enrollments
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| studentId | UUID | Foreign key to StudentProfiles |
| moduleId | UUID | Foreign key to Modules (nullable) |
| liveClassId | UUID | Foreign key to LiveClasses (nullable) |
| progress | INTEGER | Progress percentage |
| enrolledAt | TIMESTAMP | Enrollment time |

#### Notifications
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| userId | UUID | Foreign key to Users |
| type | ENUM | assignment, quiz, grade, class, system |
| title | VARCHAR(255) | Notification title |
| message | TEXT | Notification message |
| link | TEXT | Related link |
| isRead | BOOLEAN | Read status |
| createdAt | TIMESTAMP | Creation time |

---

## 🤖 AI Features

The platform integrates DeepSeek AI to provide intelligent learning assistance.

### Available AI Features

#### 1. AI Study Assistant
- **Purpose**: 24/7 intelligent tutoring for students
- **Location**: Floating button on all student pages
- **Features**:
  - Natural language Q&A
  - Context-aware responses
  - Subject-specific help
  - Explanation of concepts

#### 2. AI Quiz Generator
- **Purpose**: Automatic quiz question generation
- **Location**: Teacher quiz creation page
- **Features**:
  - Generate 3-20 questions
  - Customizable difficulty
  - Grade-level appropriate
  - Multiple choice format
  - Includes explanations

#### 3. AI Assignment Feedback
- **Purpose**: Intelligent grading assistance
- **Location**: Teacher grading interface
- **Features**:
  - Suggested grades
  - Constructive feedback
  - Strength identification
  - Improvement suggestions

#### 4. AI Content Recommendations
- **Purpose**: Personalized learning paths
- **Location**: Student dashboard
- **Features**:
  - Performance-based suggestions
  - Priority-ranked modules
  - Reasoning for recommendations

#### 5. AI Study Tips
- **Purpose**: Performance-based study advice
- **Location**: Student dashboard
- **Features**:
  - Personalized tips
  - Time management advice
  - Subject-specific strategies
  - Motivation boosters

#### 6. AI Content Summarizer
- **Purpose**: Quick content review
- **Location**: Module viewer
- **Features**:
  - Summarize long content
  - Key points extraction
  - Quick review before quizzes

### AI Configuration

See `AI_FEATURES.md` for detailed setup and usage instructions.

### Cost Considerations

DeepSeek AI pricing (approximate):
- Study assistant query: ~$0.003-0.008
- Quiz generation (5 questions): ~$0.01-0.02
- Assignment feedback: ~$0.005-0.01
- Recommendations: ~$0.01-0.02

---

## 🎥 Zoom Integration

Seamless video conferencing for live classes.

### Features

#### For Teachers
- Auto-create Zoom meetings when scheduling classes
- Meeting management (update, delete)
- View participants in real-time
- Access recordings after class
- Waiting room and password options
- Auto-recording to cloud

#### For Students
- One-click join meetings
- Copy meeting link and password
- View meeting details
- Access recordings after class

### Setup

1. **Create Zoom App**
   - Go to [Zoom Marketplace](https://marketplace.zoom.us/)
   - Create "Server-to-Server OAuth" app
   - Get Account ID, Client ID, Client Secret

2. **Add Scopes**
   - `meeting:write:admin`
   - `meeting:read:admin`
   - `meeting:update:admin`
   - `recording:read:admin`

3. **Configure Backend**
   ```env
   ZOOM_API_KEY=your_client_id
   ZOOM_API_SECRET=your_client_secret
   ZOOM_ACCOUNT_ID=your_account_id
   ```

4. **Restart Backend**
   ```bash
   cd backend
   npm start
   ```

See `ZOOM_INTEGRATION.md` for detailed setup and usage instructions.

---

## 👥 User Roles

### Student/Parent
**Permissions:**
- View published content
- Enroll in modules and live classes
- Submit assignments and quizzes
- View grades and feedback
- Access AI study assistant
- Join live classes
- View notifications
- Track progress

### Teacher
**Permissions:**
- Create, update, delete own content
- Publish modules, assignments, quizzes
- Schedule live classes with Zoom
- Grade student submissions
- Use AI tools for content creation
- View student progress
- Manage enrollments
- Send notifications

### Admin
**Permissions:**
- Full access to all resources
- User management (CRUD)
- Content moderation
- System configuration
- View analytics and logs
- Platform-wide settings

---

## 🔒 Security

### Implemented Security Measures

#### Authentication & Authorization
- JWT-based authentication with 7-day expiration
- Secure password hashing with bcrypt (10 rounds)
- Role-based access control (RBAC)
- Protected API endpoints
- Token validation on each request

#### Data Protection
- SQL injection prevention (Sequelize ORM)
- XSS protection
- CSRF protection ready
- Input validation and sanitization
- Secure password storage (never plain text)

#### Network Security
- CORS configuration
- Helmet.js security headers
- HTTPS ready
- Rate limiting ready
- Request size limits

#### Database Security
- Parameterized queries
- Connection pooling
- Encrypted connections
- Regular backups recommended

### Security Best Practices

1. **Environment Variables**: Never commit `.env` files
2. **API Keys**: Rotate regularly
3. **Passwords**: Enforce strong password policies
4. **Updates**: Keep dependencies updated
5. **Monitoring**: Implement logging and monitoring
6. **Backups**: Regular database backups
7. **HTTPS**: Use HTTPS in production
8. **Rate Limiting**: Implement rate limiting for API endpoints

---

## 🧪 Testing

### Test Accounts

| Role | Email | Password | Purpose |
|------|-------|----------|---------|
| Student | student@example.com | password123 | Test student features |
| Teacher | teacher@example.com | password123 | Test teacher features |
| Admin | admin@example.com | password123 | Test admin features |
| Parent | parent@example.com | password123 | Test parent features |

### Sample Data

After seeding, the database includes:
- 4 test users (one per role)
- 1 sample module (Algebra)
- 1 sample assignment
- 1 sample quiz with 2 questions
- 1 sample live class

### Manual Testing Checklist

#### Authentication
- [ ] User registration works
- [ ] User login works
- [ ] Token persists across sessions
- [ ] Logout clears session
- [ ] Protected routes redirect to login

#### Student Features
- [ ] Can view modules
- [ ] Can enroll in modules
- [ ] Can submit assignments
- [ ] Can take quizzes
- [ ] Can join live classes
- [ ] AI assistant responds
- [ ] Notifications appear

#### Teacher Features
- [ ] Can create modules
- [ ] Can create assignments
- [ ] Can create quizzes
- [ ] Can schedule live classes
- [ ] Can grade submissions
- [ ] AI tools work
- [ ] Can view reports

#### Admin Features
- [ ] Can view all users
- [ ] Can manage content
- [ ] Can view analytics
- [ ] Can access logs

### API Testing

Use tools like Postman or curl:

```bash
# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@example.com","password":"password123","role":"student"}'

# Test protected endpoint
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🚢 Deployment

### Prerequisites

- Node.js hosting (Heroku, Railway, Render, etc.)
- PostgreSQL database (Neon, Supabase, etc.)
- Domain name (optional)

### Environment Setup

#### Production Environment Variables

**Backend:**
```env
NODE_ENV=production
PORT=5000
DB_HOST=your-production-db-host
DB_PORT=5432
DB_NAME=your-production-db
DB_USER=your-production-user
DB_PASSWORD=your-production-password
JWT_SECRET=your-super-secure-jwt-secret
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend-domain.com
DEEPSEEK_API_KEY=your-api-key
ZOOM_API_KEY=your-zoom-key
ZOOM_API_SECRET=your-zoom-secret
ZOOM_ACCOUNT_ID=your-zoom-account
```

**Frontend:**
```env
VITE_API_URL=https://your-backend-domain.com/api
```

### Deployment Steps

#### Option 1: Vercel (Frontend) + Railway (Backend)

**Frontend (Vercel):**
1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

**Backend (Railway):**
1. Create new project in Railway
2. Add PostgreSQL database
3. Deploy from GitHub
4. Set environment variables
5. Run migrations

#### Option 2: Heroku (Full Stack)

```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set JWT_SECRET=your-secret
heroku config:set DEEPSEEK_API_KEY=your-key

# Deploy
git push heroku main

# Run migrations
heroku run npm run migrate
```

#### Option 3: Docker

```dockerfile
# Dockerfile for backend
FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - DB_HOST=db
      - DB_PORT=5432
    depends_on:
      - db
  
  frontend:
    build: .
    ports:
      - "5173:5173"
    depends_on:
      - backend
  
  db:
    image: postgres:14
    environment:
      POSTGRES_DB: edu_learn_db
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Post-Deployment Checklist

- [ ] Database migrations run successfully
- [ ] Environment variables set correctly
- [ ] CORS configured for production domain
- [ ] HTTPS enabled
- [ ] Database backups configured
- [ ] Monitoring set up
- [ ] Error logging configured
- [ ] API keys secured
- [ ] Test all critical features
- [ ] Performance testing completed

---

## 🐛 Troubleshooting

### Common Issues

#### Backend Won't Start

**Problem**: Server fails to start
**Solutions**:
```bash
# Check if port is in use
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # Mac/Linux

# Reinstall dependencies
cd backend
rm -rf node_modules
npm install

# Check environment variables
node check-env.js

# Check database connection
node check-db.js
```

#### Frontend Won't Start

**Problem**: Vite dev server fails
**Solutions**:
```bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm install

# Check port availability
netstat -ano | findstr :5173  # Windows
lsof -i :5173                 # Mac/Linux

# Try different port
npm run dev -- --port 5174
```

#### Database Connection Failed

**Problem**: Cannot connect to PostgreSQL
**Solutions**:
1. Check database is running
2. Verify credentials in `.env`
3. Check firewall settings
4. Test connection string
5. For Neon: Check IP whitelist

#### Login Fails

**Problem**: Cannot login with test accounts
**Solutions**:
1. Check backend is running
2. Verify database is seeded
3. Check browser console for errors
4. Clear localStorage
5. Check CORS configuration
6. Verify JWT_SECRET is set

#### AI Features Not Working

**Problem**: AI assistant not responding
**Solutions**:
1. Check `DEEPSEEK_API_KEY` in `.env`
2. Verify API key is valid
3. Check API quota/limits
4. Review backend logs
5. Test API endpoint directly
6. See `AI_TROUBLESHOOTING.md`

#### Zoom Integration Not Working

**Problem**: Cannot create/join Zoom meetings
**Solutions**:
1. Verify Zoom credentials in `.env`
2. Check app is activated in Zoom Marketplace
3. Verify all required scopes are added
4. Check Zoom account status
5. Review backend logs
6. See `ZOOM_INTEGRATION.md`

#### CORS Errors

**Problem**: CORS policy blocking requests
**Solutions**:
1. Check `FRONTEND_URL` in backend `.env`
2. Verify CORS configuration in `server.js`
3. Check browser console for exact error
4. Ensure credentials are included in requests

#### 401 Unauthorized Errors

**Problem**: API returns 401 errors
**Solutions**:
1. Check token is stored in localStorage
2. Verify token format in Authorization header
3. Check token expiration
4. Re-login to get new token
5. Verify JWT_SECRET matches

### Debug Mode

Enable detailed logging:

**Backend:**
```javascript
// In server.js
app.use(morgan('dev')); // Already enabled

// Add debug logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});
```

**Frontend:**
```javascript
// In utils/api.js
api.interceptors.request.use(request => {
  console.log('Request:', request);
  return request;
});

api.interceptors.response.use(
  response => {
    console.log('Response:', response);
    return response;
  },
  error => {
    console.error('Error:', error.response);
    return Promise.reject(error);
  }
);
```

### Getting Help

1. Check existing documentation files
2. Review error logs
3. Search GitHub issues
4. Check browser console
5. Review backend logs
6. Test with Postman/curl

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with clear messages**
   ```bash
   git commit -m "Add: feature description"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

### Code Style

- Use consistent indentation (2 spaces)
- Follow existing naming conventions
- Add comments for complex logic
- Write descriptive variable names
- Keep functions small and focused

### Commit Message Format

```
Type: Short description

Detailed description (optional)

Types: Add, Update, Fix, Remove, Refactor, Docs
```

Examples:
- `Add: AI quiz generator component`
- `Fix: Login authentication bug`
- `Update: Database schema for notifications`
- `Docs: API endpoint documentation`

### Testing Requirements

- Test all new features
- Ensure existing tests pass
- Add tests for bug fixes
- Test across different roles

---

## 📄 License

This project is licensed under the ISC License.

---

## 📞 Support & Contact

### Documentation Files

- **AI_FEATURES.md** - AI integration guide
- **ZOOM_INTEGRATION.md** - Zoom setup guide
- **PROJECT_SUMMARY.md** - Project overview
- **START_PROJECT.md** - Quick start guide
- **FINAL_SETUP_CHECKLIST.md** - Setup checklist
- **backend/README.md** - Backend API docs

### Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Sequelize ORM](https://sequelize.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DeepSeek AI](https://platform.deepseek.com/)
- [Zoom API](https://marketplace.zoom.us/docs/api-reference/introduction)

---

## 🎉 Acknowledgments

Built with modern web technologies and best practices for educational excellence.

### Technologies Used

- React.js - UI Framework
- Express.js - Backend Framework
- PostgreSQL - Database
- Sequelize - ORM
- Tailwind CSS - Styling
- DeepSeek AI - AI Features
- Zoom SDK - Video Conferencing
- JWT - Authentication
- Bcrypt - Password Security

---

## 📊 Project Statistics

- **Lines of Code**: ~15,000+
- **Components**: 50+
- **API Endpoints**: 40+
- **Database Tables**: 11
- **User Roles**: 4
- **Features**: 30+

---

## 🗺️ Roadmap

### Planned Features

- [ ] Mobile app (React Native)
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Payment integration
- [ ] Certificate generation
- [ ] Advanced analytics
- [ ] Discussion forums
- [ ] File storage (AWS S3)
- [ ] Video hosting
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Accessibility improvements
- [ ] Performance optimization
- [ ] Progressive Web App (PWA)
- [ ] Offline mode

---

## 📝 Changelog

### Version 1.0.0 (Current)

**Features:**
- Complete authentication system
- Role-based access control
- Module management
- Assignment system
- Quiz system with auto-grading
- Live class scheduling
- AI-powered features
- Zoom integration
- Notification system
- Student dashboard
- Teacher dashboard
- Admin dashboard
- Responsive design

**Technical:**
- PostgreSQL database
- RESTful API
- JWT authentication
- Sequelize ORM
- React 18
- Tailwind CSS
- Vite build tool

---

## 🌟 Features at a Glance

| Feature | Status | Description |
|---------|--------|-------------|
| Authentication | ✅ | JWT-based auth with role support |
| User Profiles | ✅ | Role-specific profiles |
| Modules | ✅ | Create and manage learning modules |
| Assignments | ✅ | Assignment creation and submission |
| Quizzes | ✅ | Auto-graded quizzes |
| Live Classes | ✅ | Zoom-integrated live sessions |
| AI Tutor | ✅ | 24/7 AI study assistant |
| AI Quiz Gen | ✅ | Automatic quiz generation |
| AI Feedback | ✅ | Intelligent grading assistance |
| Notifications | ✅ | Real-time notifications |
| Progress Tracking | ✅ | Student progress analytics |
| Leaderboard | ✅ | Gamification with points |
| Reports | ✅ | Teacher analytics |
| Admin Panel | ✅ | Platform management |

---

**Made with ❤️ for Education**

Transform learning with technology. Empower students. Support teachers. Build the future of education.

---

*Last Updated: October 2025*
