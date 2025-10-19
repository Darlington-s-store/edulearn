# 🔧 Setup Local PostgreSQL Database

## ❌ Current Error
```
password authentication failed for user 'neondb_owner'
```

Your Neon database password is incorrect or expired. Let's switch to local PostgreSQL for easier development.

---

## ✅ Solution: Use Local PostgreSQL

### Step 1: Install PostgreSQL (if not installed)

**Download and Install:**
1. Go to: https://www.postgresql.org/download/windows/
2. Download PostgreSQL installer
3. Run installer with these settings:
   - Port: `5432` (default)
   - Password: Choose a password (remember it!)
   - Keep other defaults

**Verify Installation:**
```bash
psql --version
# Should show: psql (PostgreSQL) 14.x or higher
```

### Step 2: Create Database

```bash
# Open Command Prompt or Git Bash
psql -U postgres

# Enter the password you set during installation

# Create database
CREATE DATABASE edu_learn_db;

# Verify
\l

# Exit
\q
```

### Step 3: Update Backend/.env File

**Manually edit** `Backend/.env` file with these contents:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Local PostgreSQL Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=edu_learn_db
DB_USER=postgres
DB_PASSWORD=YOUR_POSTGRES_PASSWORD_HERE

# IMPORTANT: Remove or comment out these lines if they exist:
# DATABASE_URL=
# DB_HOST=ep-odd-dust-adov9zot.us-east-1.aws.neon.tech

# JWT Configuration
JWT_SECRET=ssk_rxnhb4jkwhvheeyqzc1dc5k4qf7mks7fckz33mpqhx200
JWT_EXPIRE=7d

# Frontend URL
FRONTEND_URL=http://localhost:5173

# AI Configuration
DEEPSEEK_API_KEY=sk-19526f7b812c4cf58e30b9f4246d3162

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=asomanirawlingsjunior5333@gmail.com
EMAIL_PASSWORD=Aso1234@1

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

**Replace `YOUR_POSTGRES_PASSWORD_HERE` with your actual PostgreSQL password!**

### Step 4: Test Connection

```bash
cd Backend
node diagnose.js
```

This will tell you if the connection works.

### Step 5: Start Backend

```bash
cd Backend
npm start
```

**Expected Output:**
```
✅ Database connection established successfully.
✅ Database models synchronized
🚀 Server running on port 5000 in development mode
```

### Step 6: Create Admin User

```bash
cd Backend
node seeders/createAdmin.js
```

---

## 🔄 Alternative: Fix Neon Database Connection

If you want to keep using Neon:

### Get New Neon Credentials

1. Go to: https://console.neon.tech/
2. Login to your account
3. Select your project
4. Go to "Dashboard" → "Connection Details"
5. Click "Show password" or "Reset password"
6. Copy the connection string

### Update .env with New Credentials

```env
# Use Neon connection string
DATABASE_URL=postgresql://neondb_owner:NEW_PASSWORD@ep-odd-dust-adov9zot.us-east-1.aws.neon.tech/neondb?sslmode=require

# Comment out individual DB variables
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=edu_learn_db
# DB_USER=postgres
# DB_PASSWORD=password
```

---

## 🎯 Quick Commands Reference

### Check if PostgreSQL is Running
```powershell
Get-Service postgresql*
```

### Start PostgreSQL Service
```powershell
Start-Service postgresql-x64-14
```

### Connect to PostgreSQL
```bash
psql -U postgres -d edu_learn_db
```

### List Databases
```sql
\l
```

### List Tables
```sql
\dt
```

### View Users Table
```sql
SELECT * FROM users;
```

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] PostgreSQL service is running
- [ ] Database `edu_learn_db` exists
- [ ] `.env` file has correct credentials
- [ ] `node diagnose.js` shows connection success
- [ ] Backend starts without errors
- [ ] Admin user created
- [ ] Can login at `http://localhost:5173/admin/login`

---

## 💡 Recommended .env Configuration

**For local development, use this:**

```env
NODE_ENV=development
PORT=5000

# Local PostgreSQL (easiest for development)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=edu_learn_db
DB_USER=postgres
DB_PASSWORD=postgres

JWT_SECRET=ssk_rxnhb4jkwhvheeyqzc1dc5k4qf7mks7fckz33mpqhx200
FRONTEND_URL=http://localhost:5173
DEEPSEEK_API_KEY=sk-19526f7b812c4cf58e30b9f4246d3162
```

---

## 🆘 Troubleshooting

### "psql: command not found"
PostgreSQL is not installed or not in PATH. Install from postgresql.org

### "FATAL: password authentication failed"
Wrong password in `.env` file. Check your PostgreSQL password.

### "database 'edu_learn_db' does not exist"
Run: `psql -U postgres -c "CREATE DATABASE edu_learn_db;"`

### "Port 5432 is already in use"
Another PostgreSQL instance is running. Stop it or use different port.

---

**Use local PostgreSQL for the easiest development experience!** 🚀
