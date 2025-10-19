# 👨‍💻 Developer Guide - Edu-Learn Platform

Complete guide for developers working on the Edu-Learn platform.

---

## 📑 Table of Contents

- [Getting Started](#getting-started)
- [Project Architecture](#project-architecture)
- [Development Workflow](#development-workflow)
- [Code Organization](#code-organization)
- [API Development](#api-development)
- [Frontend Development](#frontend-development)
- [Database Management](#database-management)
- [Testing](#testing)
- [Debugging](#debugging)
- [Best Practices](#best-practices)
- [Common Patterns](#common-patterns)
- [Performance Optimization](#performance-optimization)

---

## 🚀 Getting Started

### Development Environment Setup

#### Required Tools
```bash
# Node.js (v14+)
node --version

# npm or yarn
npm --version

# PostgreSQL (v12+)
psql --version

# Git
git --version
```

#### IDE Setup (VS Code Recommended)

**Recommended Extensions:**
- ESLint
- Prettier
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- PostgreSQL
- GitLens
- Thunder Client (API testing)

**VS Code Settings:**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "javascript.updateImportsOnFileMove.enabled": "always",
  "typescript.updateImportsOnFileMove.enabled": "always"
}
```

#### Initial Setup
```bash
# Clone repository
git clone <repository-url>
cd Learniers-project

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Setup environment files
cp backend/.env.example backend/.env
# Edit backend/.env with your configuration

# Initialize database
cd backend
npm run migrate
npm run seed
cd ..
```

---

## 🏗️ Project Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                      │
│                  React SPA (Port 5173)                   │
└─────────────────────────────────────────────────────────┘
                            ↕ HTTP/REST
┌─────────────────────────────────────────────────────────┐
│                  API SERVER (Port 5000)                  │
│                    Express.js + Node.js                  │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Middleware Layer                                   │ │
│  │  - Authentication (JWT)                             │ │
│  │  - Authorization (RBAC)                             │ │
│  │  - Validation                                       │ │
│  │  - Error Handling                                   │ │
│  └────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Route Layer                                        │ │
│  │  - Auth Routes                                      │ │
│  │  - Module Routes                                    │ │
│  │  - Assignment Routes                                │ │
│  │  - Quiz Routes                                      │ │
│  │  - Live Class Routes                                │ │
│  │  - AI Routes                                        │ │
│  └────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Controller Layer                                   │ │
│  │  - Business Logic                                   │ │
│  │  - Request/Response Handling                        │ │
│  └────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Service Layer                                      │ │
│  │  - AI Service (DeepSeek)                            │ │
│  │  - Zoom Service                                     │ │
│  │  - Notification Service                             │ │
│  └────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Model Layer (Sequelize ORM)                        │ │
│  │  - User, StudentProfile, TeacherProfile             │ │
│  │  - Module, Assignment, Quiz, LiveClass              │ │
│  │  - Submission, QuizAttempt, Enrollment              │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                            ↕ SQL
┌─────────────────────────────────────────────────────────┐
│              PostgreSQL Database (Neon)                  │
└─────────────────────────────────────────────────────────┘
```

### Request Flow

```
1. Client Request
   ↓
2. Express Middleware
   - CORS Check
   - Body Parsing
   - Logging
   ↓
3. Route Handler
   - Match URL pattern
   - Extract parameters
   ↓
4. Authentication Middleware
   - Verify JWT token
   - Attach user to request
   ↓
5. Authorization Middleware
   - Check user role
   - Verify permissions
   ↓
6. Validation Middleware
   - Validate request body
   - Sanitize input
   ↓
7. Controller
   - Business logic
   - Call services
   ↓
8. Service Layer (if needed)
   - External API calls
   - Complex operations
   ↓
9. Model Layer
   - Database queries
   - Data manipulation
   ↓
10. Response
    - Format data
    - Send to client
    ↓
11. Error Handler (if error)
    - Catch errors
    - Format error response
```

---

## 💻 Development Workflow

### Daily Development

```bash
# Start backend (Terminal 1)
cd backend
npm run dev

# Start frontend (Terminal 2)
npm run dev

# Watch logs
# Backend logs appear in Terminal 1
# Frontend logs appear in Terminal 2
```

### Feature Development Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/feature-name
   ```

2. **Develop Feature**
   - Write code
   - Test locally
   - Follow code style

3. **Test Thoroughly**
   - Manual testing
   - API testing
   - Cross-browser testing

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "Add: feature description"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/feature-name
   ```

### Git Workflow

```
main (production)
  ↓
develop (staging)
  ↓
feature/feature-name (development)
```

**Branch Naming:**
- `feature/` - New features
- `fix/` - Bug fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation updates

---

## 📁 Code Organization

### Backend Structure

```
backend/
├── config/
│   └── database.js              # Sequelize configuration
├── controllers/
│   ├── authController.js        # Auth logic
│   ├── moduleController.js      # Module CRUD
│   ├── assignmentController.js  # Assignment logic
│   ├── quizController.js        # Quiz logic
│   ├── liveClassController.js   # Live class logic
│   ├── notificationController.js # Notification logic
│   └── aiController.js          # AI feature logic
├── middleware/
│   ├── auth.js                  # JWT verification
│   ├── errorHandler.js          # Global error handler
│   └── validate.js              # Input validation
├── models/
│   ├── User.js                  # User model
│   ├── StudentProfile.js        # Student profile
│   ├── TeacherProfile.js        # Teacher profile
│   ├── Module.js                # Module model
│   ├── Assignment.js            # Assignment model
│   ├── Submission.js            # Submission model
│   ├── Quiz.js                  # Quiz model
│   ├── QuizAttempt.js           # Quiz attempt
│   ├── LiveClass.js             # Live class model
│   ├── Enrollment.js            # Enrollment model
│   ├── Notification.js          # Notification model
│   └── index.js                 # Model associations
├── routes/
│   ├── authRoutes.js            # Auth endpoints
│   ├── moduleRoutes.js          # Module endpoints
│   ├── assignmentRoutes.js      # Assignment endpoints
│   ├── quizRoutes.js            # Quiz endpoints
│   ├── liveClassRoutes.js       # Live class endpoints
│   ├── notificationRoutes.js    # Notification endpoints
│   └── aiRoutes.js              # AI endpoints
├── utils/
│   ├── generateToken.js         # JWT token generation
│   ├── aiService.js             # DeepSeek AI service
│   └── zoomService.js           # Zoom API service
├── .env                         # Environment variables
├── .env.example                 # Environment template
├── server.js                    # Entry point
└── package.json                 # Dependencies
```

### Frontend Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── Navbar.jsx           # Public navbar
│   │   ├── Footer.jsx           # Footer
│   │   ├── DashboardSidebar.jsx # Dashboard sidebar
│   │   └── DashboardTopbar.jsx  # Dashboard topbar
│   ├── AIStudyAssistant.jsx     # AI chat component
│   ├── AIQuizGenerator.jsx      # Quiz generation
│   ├── AIAssignmentFeedback.jsx # Feedback generation
│   ├── AIRecommendations.jsx    # Recommendations
│   ├── AIStudyTips.jsx          # Study tips
│   ├── ZoomMeeting.jsx          # Zoom embed
│   ├── ZoomMeetingButton.jsx    # Zoom join button
│   ├── LiveClassSetupModal.jsx  # Live class modal
│   └── ProtectedRoute.jsx       # Route protection
├── contexts/
│   ├── AuthContext.jsx          # Auth state
│   ├── ContentContext.jsx       # Mock data
│   └── ContentContextAPI.jsx    # API integration
├── pages/
│   ├── auth/
│   │   ├── Login.jsx            # Login page
│   │   └── Signup.jsx           # Signup page
│   ├── dashboards/
│   │   ├── StudentDashboard.jsx # Student dashboard
│   │   ├── TeacherDashboard.jsx # Teacher dashboard
│   │   └── AdminDashboard.jsx   # Admin dashboard
│   ├── student/                 # Student pages
│   ├── teacher/                 # Teacher pages
│   ├── admin/                   # Admin pages
│   ├── Home.jsx                 # Landing page
│   ├── About.jsx                # About page
│   ├── Contact.jsx              # Contact page
│   ├── Pricing.jsx              # Pricing page
│   └── Subscribe.jsx            # Subscription page
├── services/
│   └── contentService.js        # API calls
├── utils/
│   └── api.js                   # Axios config
├── app.jsx                      # Main app
├── main.jsx                     # Entry point
└── index.css                    # Global styles
```

---

## 🔌 API Development

### Creating a New Endpoint

#### 1. Define Model (if needed)

```javascript
// backend/models/NewModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const NewModel = sequelize.define('NewModel', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // ... other fields
}, {
  tableName: 'new_models',
  timestamps: true
});

module.exports = NewModel;
```

#### 2. Create Controller

```javascript
// backend/controllers/newController.js
const NewModel = require('../models/NewModel');

// Get all items
exports.getAll = async (req, res, next) => {
  try {
    const items = await NewModel.findAll();
    
    res.status(200).json({
      success: true,
      data: items
    });
  } catch (error) {
    next(error);
  }
};

// Get single item
exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await NewModel.findByPk(id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    next(error);
  }
};

// Create item
exports.create = async (req, res, next) => {
  try {
    const item = await NewModel.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: item
    });
  } catch (error) {
    next(error);
  }
};

// Update item
exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await NewModel.findByPk(id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }
    
    await item.update(req.body);
    
    res.status(200).json({
      success: true,
      message: 'Item updated successfully',
      data: item
    });
  } catch (error) {
    next(error);
  }
};

// Delete item
exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await NewModel.findByPk(id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }
    
    await item.destroy();
    
    res.status(200).json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
```

#### 3. Create Routes

```javascript
// backend/routes/newRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getAll,
  getById,
  create,
  update,
  delete: deleteItem
} = require('../controllers/newController');

// Public routes
router.get('/', getAll);
router.get('/:id', getById);

// Protected routes
router.post('/', protect, authorize('teacher', 'admin'), create);
router.put('/:id', protect, authorize('teacher', 'admin'), update);
router.delete('/:id', protect, authorize('teacher', 'admin'), deleteItem);

module.exports = router;
```

#### 4. Register Routes

```javascript
// backend/server.js
const newRoutes = require('./routes/newRoutes');

// ... other code

app.use('/api/new-resource', newRoutes);
```

### API Response Standards

**Success Response:**
```javascript
{
  success: true,
  message: "Operation successful",
  data: { ... }
}
```

**Error Response:**
```javascript
{
  success: false,
  message: "Error message",
  errors: [...]
}
```

**Pagination Response:**
```javascript
{
  success: true,
  data: [...],
  pagination: {
    page: 1,
    limit: 10,
    total: 100,
    pages: 10
  }
}
```

---

## ⚛️ Frontend Development

### Creating a New Component

```javascript
// src/components/NewComponent.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';

function NewComponent({ prop1, prop2 }) {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/endpoint');
      setData(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600 py-8">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Component Title</h1>
      {/* Component content */}
    </div>
  );
}

export default NewComponent;
```

### Creating a New Page

```javascript
// src/pages/NewPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NewComponent from '../components/NewComponent';

function NewPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NewComponent />
      </div>
    </div>
  );
}

export default NewPage;
```

### Adding a New Route

```javascript
// src/app.jsx
import NewPage from './pages/NewPage';

// Inside Routes component
<Route path="/new-page" element={
  <ProtectedRoute allowedRoles={['student', 'teacher']}>
    <NewPage />
  </ProtectedRoute>
} />
```

### Making API Calls

```javascript
// Using the api utility
import api from '../utils/api';

// GET request
const response = await api.get('/endpoint');
const data = response.data.data;

// POST request
const response = await api.post('/endpoint', {
  field1: 'value1',
  field2: 'value2'
});

// PUT request
const response = await api.put('/endpoint/:id', {
  field1: 'updated value'
});

// DELETE request
const response = await api.delete('/endpoint/:id');

// With error handling
try {
  const response = await api.get('/endpoint');
  setData(response.data.data);
} catch (error) {
  console.error('Error:', error.response?.data?.message);
  setError(error.response?.data?.message || 'An error occurred');
}
```

---

## 🗄️ Database Management

### Creating a New Model

```javascript
// backend/models/NewModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const NewModel = sequelize.define('NewModel', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 255]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'archived'),
    defaultValue: 'active'
  },
  metadata: {
    type: DataTypes.JSONB,
    defaultValue: {}
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'new_models',
  timestamps: true,
  indexes: [
    {
      fields: ['userId']
    },
    {
      fields: ['status']
    }
  ]
});

module.exports = NewModel;
```

### Defining Model Associations

```javascript
// backend/models/index.js
const User = require('./User');
const NewModel = require('./NewModel');

// One-to-Many
User.hasMany(NewModel, {
  foreignKey: 'userId',
  as: 'newModels'
});

NewModel.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

// Many-to-Many (with junction table)
const UserNewModel = sequelize.define('UserNewModel', {
  userId: {
    type: DataTypes.UUID,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  newModelId: {
    type: DataTypes.UUID,
    references: {
      model: 'new_models',
      key: 'id'
    }
  }
}, {
  tableName: 'user_new_models',
  timestamps: true
});

User.belongsToMany(NewModel, {
  through: UserNewModel,
  foreignKey: 'userId',
  as: 'relatedModels'
});

NewModel.belongsToMany(User, {
  through: UserNewModel,
  foreignKey: 'newModelId',
  as: 'relatedUsers'
});
```

### Common Queries

```javascript
// Find all
const items = await NewModel.findAll();

// Find with conditions
const items = await NewModel.findAll({
  where: {
    status: 'active',
    userId: user.id
  }
});

// Find with associations
const items = await NewModel.findAll({
  include: [{
    model: User,
    as: 'user',
    attributes: ['id', 'firstName', 'lastName']
  }]
});

// Find one
const item = await NewModel.findOne({
  where: { id: itemId }
});

// Find by primary key
const item = await NewModel.findByPk(itemId);

// Create
const item = await NewModel.create({
  name: 'Item name',
  userId: user.id
});

// Update
await item.update({
  name: 'Updated name'
});

// Delete
await item.destroy();

// Count
const count = await NewModel.count({
  where: { status: 'active' }
});

// Pagination
const { count, rows } = await NewModel.findAndCountAll({
  limit: 10,
  offset: 0,
  order: [['createdAt', 'DESC']]
});
```

---

## 🧪 Testing

### Manual Testing

#### API Testing with Thunder Client (VS Code)

1. Install Thunder Client extension
2. Create new request
3. Set method and URL
4. Add headers (Authorization)
5. Add body (for POST/PUT)
6. Send request

#### API Testing with curl

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@example.com","password":"password123","role":"student"}'

# Get protected resource
curl -X GET http://localhost:5000/api/modules \
  -H "Authorization: Bearer YOUR_TOKEN"

# Create resource
curl -X POST http://localhost:5000/api/modules \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"New Module","subject":"Math"}'
```

### Testing Checklist

**Authentication:**
- [ ] Registration works
- [ ] Login works
- [ ] Token persists
- [ ] Logout clears session
- [ ] Protected routes redirect

**CRUD Operations:**
- [ ] Create works
- [ ] Read works
- [ ] Update works
- [ ] Delete works
- [ ] Validation works

**Authorization:**
- [ ] Role-based access works
- [ ] Unauthorized access blocked
- [ ] Owner-only access works

**Error Handling:**
- [ ] 404 for not found
- [ ] 401 for unauthorized
- [ ] 403 for forbidden
- [ ] 400 for bad request
- [ ] 500 for server error

---

## 🐛 Debugging

### Backend Debugging

#### Console Logging
```javascript
// Add debug logs
console.log('Request body:', req.body);
console.log('User:', req.user);
console.log('Query result:', result);
```

#### Error Logging
```javascript
try {
  // code
} catch (error) {
  console.error('Error details:', {
    message: error.message,
    stack: error.stack,
    data: error.response?.data
  });
}
```

#### Database Query Logging
```javascript
// In config/database.js
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  logging: console.log, // Enable query logging
});
```

### Frontend Debugging

#### React DevTools
- Install React Developer Tools extension
- Inspect component tree
- View props and state
- Track re-renders

#### Console Logging
```javascript
console.log('State:', state);
console.log('Props:', props);
console.log('API Response:', response);
```

#### Network Tab
- Open browser DevTools (F12)
- Go to Network tab
- Filter by XHR/Fetch
- Inspect request/response

---

## ✅ Best Practices

### Code Style

**JavaScript:**
- Use `const` and `let`, avoid `var`
- Use arrow functions
- Use async/await over promises
- Use destructuring
- Use template literals
- Add comments for complex logic

**React:**
- Use functional components
- Use hooks (useState, useEffect, etc.)
- Keep components small and focused
- Extract reusable logic to custom hooks
- Use prop types or TypeScript

**CSS/Tailwind:**
- Use Tailwind utility classes
- Keep custom CSS minimal
- Use responsive classes
- Follow mobile-first approach

### Security

- Never commit `.env` files
- Validate all user input
- Sanitize data before database queries
- Use parameterized queries
- Hash passwords with bcrypt
- Use HTTPS in production
- Implement rate limiting
- Keep dependencies updated

### Performance

- Minimize database queries
- Use pagination for large datasets
- Implement caching where appropriate
- Optimize images
- Lazy load components
- Use React.memo for expensive components
- Debounce search inputs

### Error Handling

- Always use try-catch blocks
- Provide meaningful error messages
- Log errors for debugging
- Don't expose sensitive information
- Handle edge cases

---

## 🎯 Common Patterns

### Authentication Pattern

```javascript
// Protect route
router.get('/protected', protect, async (req, res) => {
  // req.user is available
  res.json({ user: req.user });
});

// Protect with role
router.post('/admin-only', protect, authorize('admin'), async (req, res) => {
  // Only admins can access
});
```

### Error Handling Pattern

```javascript
// Controller with error handling
exports.controllerFunction = async (req, res, next) => {
  try {
    // Logic here
    res.json({ success: true, data });
  } catch (error) {
    next(error); // Pass to error handler
  }
};
```

### Pagination Pattern

```javascript
exports.getAll = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Model.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: rows,
      pagination: {
        page,
        limit,
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};
```

### React Hook Pattern

```javascript
// Custom hook
function useData(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(endpoint);
        setData(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
}

// Usage
function Component() {
  const { data, loading, error } = useData('/api/modules');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{/* Render data */}</div>;
}
```

---

## ⚡ Performance Optimization

### Backend Optimization

**Database:**
- Add indexes on frequently queried fields
- Use `attributes` to select only needed fields
- Use `include` carefully to avoid N+1 queries
- Implement connection pooling

**API:**
- Implement caching (Redis)
- Use compression middleware
- Optimize query complexity
- Implement rate limiting

### Frontend Optimization

**React:**
- Use React.memo for expensive components
- Implement code splitting
- Lazy load routes
- Optimize re-renders
- Use useMemo and useCallback

**Assets:**
- Optimize images
- Use lazy loading for images
- Minimize bundle size
- Use CDN for static assets

---

## 📚 Additional Resources

- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [React Best Practices](https://react.dev/learn)
- [Sequelize Documentation](https://sequelize.org/docs/v6/)
- [PostgreSQL Performance Tips](https://wiki.postgresql.org/wiki/Performance_Optimization)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

**Happy Coding! 🚀**
