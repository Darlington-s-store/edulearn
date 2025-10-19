# 🗄️ Database Setup Guide

## 📋 Current Issue

The backend is running but getting **401 errors** when trying to login. This indicates the database is not properly connected or the admin user doesn't exist.

---

## ✅ Quick Fix Steps

### Step 1: Check if PostgreSQL is Running

**Windows:**
```bash
# Check if PostgreSQL service is running
Get-Service -Name postgresql*

# Start PostgreSQL if not running
Start-Service postgresql-x64-14  # Adjust version number
```

**Alternative - Check with psql:**
```bash
psql --version
psql -U postgres -d postgres -c "SELECT version();"
```

### Step 2: Verify Database Exists

```bash
# Connect to PostgreSQL
psql -U postgres

# List databases
\l

# If edu_learn_db doesn't exist, create it:
CREATE DATABASE edu_learn_db;

# Exit
\q
```

### Step 3: Configure Environment Variables

Create or update `Backend/.env` file:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173

# Database Configuration (Local PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=edu_learn_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password

# OR use connection string (for cloud databases like Neon)
# DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# AI Services (Optional)
DEEPSEEK_API_KEY=your_deepseek_api_key
OPENAI_API_KEY=your_openai_api_key

# Zoom Integration (Optional)
ZOOM_API_KEY=your_zoom_api_key
ZOOM_API_SECRET=your_zoom_api_secret
```

### Step 4: Test Database Connection

```bash
cd Backend
node -e "const {testConnection} = require('./config/database'); testConnection();"
```

**Expected Output:**
```
✅ Database connection established successfully.
```

### Step 5: Sync Database Models

```bash
cd Backend
npm start
```

**Expected Output:**
```
✅ Database connection established successfully.
✅ Database models synchronized
🚀 Server running on port 5000 in development mode
📡 API available at http://localhost:5000/api
```

### Step 6: Create Admin User

```bash
cd Backend
node seeders/createAdmin.js
```

**Expected Output:**
```
✅ Admin user created successfully!

📧 Admin Credentials:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email:    admin@edulearn.com
Password: Admin@123
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Step 7: Test Admin Login

1. Open browser: `http://localhost:5173/admin/login`
2. Enter credentials:
   - Email: `admin@edulearn.com`
   - Password: `Admin@123`
3. Should redirect to `/admin/dashboard`

---

## 🔍 Troubleshooting

### Issue 1: "Unable to connect to the database"

**Possible Causes:**
- PostgreSQL is not running
- Wrong database credentials
- Database doesn't exist
- Port 5432 is blocked

**Solutions:**

1. **Check PostgreSQL Status:**
   ```bash
   # Windows
   Get-Service postgresql*
   
   # If not running, start it
   Start-Service postgresql-x64-14
   ```

2. **Verify Credentials:**
   ```bash
   psql -U postgres -d edu_learn_db
   # If this works, your credentials are correct
   ```

3. **Create Database:**
   ```bash
   psql -U postgres
   CREATE DATABASE edu_learn_db;
   \q
   ```

4. **Check Port:**
   ```bash
   netstat -an | findstr :5432
   # Should show PostgreSQL listening on port 5432
   ```

### Issue 2: "POST /api/auth/login 401"

**Possible Causes:**
- Admin user doesn't exist in database
- Wrong password
- Database not synced

**Solutions:**

1. **Check if Admin Exists:**
   ```bash
   psql -U postgres -d edu_learn_db
   SELECT * FROM users WHERE role = 'admin';
   \q
   ```

2. **Create Admin User:**
   ```bash
   cd Backend
   node seeders/createAdmin.js
   ```

3. **Verify Password:**
   - Default password is `Admin@123` (case-sensitive)
   - Email must be `admin@edulearn.com`

### Issue 3: "Database models not synchronized"

**Solution:**
```bash
cd Backend
# Stop the server (Ctrl+C)
# Restart with model sync
npm start
```

The server will automatically sync models on startup.

### Issue 4: "Module not found" errors

**Solution:**
```bash
cd Backend
npm install
```

---

## 🗄️ Database Options

### Option 1: Local PostgreSQL (Recommended for Development)

**Pros:**
- Fast and reliable
- No internet required
- Full control

**Setup:**
1. Install PostgreSQL from https://www.postgresql.org/download/
2. Create database: `CREATE DATABASE edu_learn_db;`
3. Update `.env` with local credentials

**Example .env:**
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=edu_learn_db
DB_USER=postgres
DB_PASSWORD=your_password
```

### Option 2: Neon (Cloud PostgreSQL)

**Pros:**
- No local installation
- Automatic backups
- Free tier available

**Setup:**
1. Sign up at https://neon.tech
2. Create a new project
3. Copy connection string
4. Update `.env`

**Example .env:**
```env
DATABASE_URL=postgresql://username:password@ep-xxx.neon.tech/neondb?sslmode=require
```

### Option 3: Supabase

**Pros:**
- PostgreSQL + additional features
- Free tier
- Good for production

**Setup:**
1. Sign up at https://supabase.com
2. Create project
3. Get connection string from Settings > Database
4. Update `.env`

---

## 🔧 Database Commands

### Connect to Database
```bash
psql -U postgres -d edu_learn_db
```

### List All Tables
```sql
\dt
```

### View Users Table
```sql
SELECT * FROM users;
```

### View Admin Users
```sql
SELECT * FROM users WHERE role = 'admin';
```

### Delete All Users (Reset)
```sql
TRUNCATE TABLE users CASCADE;
```

### Check Table Structure
```sql
\d users
```

### Exit psql
```sql
\q
```

---

## 📊 Verify Everything is Working

### 1. Check Backend Health
```bash
curl http://localhost:5000/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-10-10T11:24:19.000Z"
}
```

### 2. Check Database Connection
```bash
cd Backend
node check-env.js
```

### 3. List All Users
```bash
cd Backend
node list-users.js
```

### 4. Test Login API
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@edulearn.com","password":"Admin@123","role":"admin"}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {...},
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## ✅ Complete Setup Checklist

- [ ] PostgreSQL installed and running
- [ ] Database `edu_learn_db` created
- [ ] `.env` file configured with correct credentials
- [ ] Backend dependencies installed (`npm install`)
- [ ] Database connection successful
- [ ] Database models synchronized
- [ ] Admin user created
- [ ] Backend server running on port 5000
- [ ] Frontend running on port 5173
- [ ] Can login as admin successfully

---

## 🚀 Quick Start Script

Create this file as `Backend/setup.sh` (or `setup.bat` for Windows):

```bash
#!/bin/bash

echo "🔧 Setting up Edu-Learn Backend..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Test database connection
echo "🗄️ Testing database connection..."
node -e "const {testConnection} = require('./config/database'); testConnection();"

# Create admin user
echo "👤 Creating admin user..."
node seeders/createAdmin.js

# Start server
echo "🚀 Starting server..."
npm start
```

**Run it:**
```bash
cd Backend
chmod +x setup.sh
./setup.sh
```

---

## 📝 Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NODE_ENV` | No | development | Environment mode |
| `PORT` | No | 5000 | Server port |
| `DB_HOST` | Yes* | localhost | Database host |
| `DB_PORT` | No | 5432 | Database port |
| `DB_NAME` | Yes* | edu_learn_db | Database name |
| `DB_USER` | Yes* | postgres | Database user |
| `DB_PASSWORD` | Yes* | - | Database password |
| `DATABASE_URL` | Yes* | - | Full connection string |
| `JWT_SECRET` | Yes | - | JWT signing key |
| `FRONTEND_URL` | No | http://localhost:5173 | Frontend URL |

*Either use individual DB variables OR DATABASE_URL

---

## 🎉 Success Indicators

When everything is working, you should see:

### Backend Console:
```
✅ Database connection established successfully.
✅ Database models synchronized
🚀 Server running on port 5000 in development mode
📡 API available at http://localhost:5000/api
```

### Admin Login:
- No 401 errors
- Successful redirect to `/admin/dashboard`
- Dashboard loads with statistics

### Browser Console:
```
AdminAuth: Attempting admin login...
AdminAuth: Login response: {success: true, ...}
AdminAuth: Admin login successful
AdminAuth: Navigating to admin dashboard
```

---

**Your database should now be connected and working! 🎊**

*Last Updated: October 2025*
