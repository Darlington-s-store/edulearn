# 🔧 Fix Database Connection Error

## ❌ Current Error
```
Unable to connect to the database: getaddrinfo ENOTFOUND aws-1-us-west-1.pooler.supabase.com
```

This means your `.env` file is trying to connect to Supabase cloud database but can't reach it.

---

## ✅ Solution: Use Local PostgreSQL

### Step 1: Update Your `.env` File

Edit `Backend/.env` and replace the database configuration with:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173

# Local PostgreSQL Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=edu_learn_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password_here

# IMPORTANT: Comment out or remove DATABASE_URL if it exists
# DATABASE_URL=postgresql://...

# JWT Configuration
JWT_SECRET=your_secret_key_here_change_in_production
JWT_EXPIRE=7d

# AI Configuration (Optional)
DEEPSEEK_API_KEY=sk-19526f7b812c4cf58e30b9f4246d3162

# Zoom Configuration (Optional)
ZOOM_API_KEY=your_zoom_api_key_here
ZOOM_API_SECRET=your_zoom_api_secret_here
```

**CRITICAL:** Make sure to:
- ✅ Set `DB_PASSWORD` to your actual PostgreSQL password
- ✅ Comment out or remove any `DATABASE_URL` line
- ✅ Set `JWT_SECRET` to any random string

### Step 2: Ensure PostgreSQL is Running

**Check if PostgreSQL is installed and running:**

```powershell
# Check PostgreSQL service
Get-Service postgresql*

# If not running, start it
Start-Service postgresql-x64-14  # Adjust version number
```

**If PostgreSQL is not installed:**
1. Download from: https://www.postgresql.org/download/windows/
2. Install with default settings
3. Remember the password you set during installation

### Step 3: Create the Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Enter your PostgreSQL password when prompted

# Create database
CREATE DATABASE edu_learn_db;

# Verify it was created
\l

# Exit
\q
```

### Step 4: Restart Backend

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

### Step 5: Create Admin User

```bash
cd Backend
node seeders/createAdmin.js
```

---

## 🔄 Alternative: Fix Supabase Connection

If you want to keep using Supabase instead:

### Step 1: Get Correct Connection String

1. Go to your Supabase project dashboard
2. Click "Project Settings" → "Database"
3. Copy the connection string under "Connection string"
4. It should look like:
   ```
   postgresql://postgres.[project-ref]:[password]@aws-0-us-west-1.pooler.supabase.com:5432/postgres
   ```

### Step 2: Update `.env`

```env
# Use Supabase connection string
DATABASE_URL=your_actual_supabase_connection_string_here

# Comment out individual DB variables
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=edu_learn_db
# DB_USER=postgres
# DB_PASSWORD=password
```

### Step 3: Restart Backend

```bash
cd Backend
npm start
```

---

## 🎯 Quick Fix (Recommended)

**Just run these commands:**

```bash
# 1. Make sure PostgreSQL is running
Get-Service postgresql*

# 2. Create database (if not exists)
psql -U postgres -c "CREATE DATABASE edu_learn_db;"

# 3. Update Backend/.env file (see Step 1 above)

# 4. Start backend
cd Backend
npm start

# 5. Create admin (in new terminal)
cd Backend
node seeders/createAdmin.js
```

---

## 📝 Example Working `.env` File

```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173

# Local PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=edu_learn_db
DB_USER=postgres
DB_PASSWORD=postgres

# JWT
JWT_SECRET=my_super_secret_jwt_key_12345

# Optional APIs
DEEPSEEK_API_KEY=sk-19526f7b812c4cf58e30b9f4246d3162
```

---

## ✅ Verify It's Working

After fixing, you should see:

```
✅ Database connection established successfully.
✅ Database models synchronized
🚀 Server running on port 5000 in development mode
```

Then test admin login at: `http://localhost:5173/admin/login`

---

**Choose local PostgreSQL for easier development!** 🚀
