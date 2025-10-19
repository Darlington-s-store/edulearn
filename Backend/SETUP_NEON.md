# Setting Up Neon Database for Edu-Learn Backend

## What is Neon?
Neon is a serverless PostgreSQL database platform that's perfect for development and production. It's free to start and doesn't require installing PostgreSQL locally.

## Steps to Set Up Neon Database

### 1. Get Your Neon Connection String

1. Go to your Neon dashboard: https://console.neon.tech/
2. Select your project or create a new one
3. Click on your database
4. Look for the **Connection String** section
5. Copy the connection string - it should look like:
   ```
   postgresql://neondb_owner:npg_yQvmEBp6G8in@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

### 2. Create .env File

1. In the `backend` folder, create a new file called `.env` (no .example)
2. Copy the contents from `.env.example`
3. Add your Neon connection string:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration - NEON (Cloud PostgreSQL)
DATABASE_URL=postgresql://neondb_owner:npg_yQvmEBp6G8in@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
JWT_EXPIRE=7d

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=asomanirawlingsjunior5333@gmail.com
EMAIL_PASSWORD=Aso1234@1

# Frontend URL
FRONTEND_URL=http://localhost:5173

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

**Important Notes:**
- Replace the `DATABASE_URL` with YOUR actual Neon connection string from step 1
- Change the `JWT_SECRET` to a random secure string
- The `.env` file is gitignored for security

### 3. Install Dependencies (if not done)

```bash
cd backend
npm install
```

### 4. Run Database Migration

```bash
npm run migrate
```

This will create all the necessary tables in your Neon database.

### 5. Seed Sample Data (Optional)

```bash
npm run seed
```

This creates test users and sample content:
- Admin: admin@example.com / password123
- Teacher: teacher@example.com / password123
- Student: student@example.com / password123
- Parent: parent@example.com / password123

### 6. Start the Server

```bash
npm run dev
```

You should see:
```
✅ Database connection established successfully.
✅ Database models synchronized
🚀 Server running on port 5000 in development mode
📡 API available at http://localhost:5000/api
```

## Troubleshooting

### Error: "Unable to connect to the database"

**Check:**
1. Your Neon connection string is correct
2. Your Neon database is active (not paused)
3. You have internet connection
4. The connection string includes `?sslmode=require` at the end

### Error: "Invalid connection string"

Make sure your DATABASE_URL is in this format:
```
postgresql://username:password@host/database?sslmode=require
```

### Neon Database Paused

Neon free tier databases auto-pause after inactivity. They wake up automatically when you connect (may take a few seconds).

## Alternative: Local PostgreSQL

If you prefer to use local PostgreSQL instead:

1. Install PostgreSQL: https://www.postgresql.org/download/
2. Create a database:
   ```bash
   createdb edu_learn_db
   ```
3. In `.env`, comment out `DATABASE_URL` and use:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=edu_learn_db
   DB_USER=postgres
   DB_PASSWORD=your_postgres_password
   ```

## Verifying Setup

Test the API:
```bash
# Health check
curl http://localhost:5000/health

# Register a user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "role": "student",
    "firstName": "Test",
    "lastName": "User"
  }'
```

## Next Steps

Once your backend is running:
1. Update frontend to use the API endpoints
2. Replace mock data in `AuthContext.jsx` with API calls
3. Replace mock data in `ContentContext.jsx` with API calls
4. Add axios or fetch for HTTP requests
5. Store JWT tokens for authentication

## Security Notes

⚠️ **Important for Production:**
- Never commit `.env` file to git
- Use strong JWT_SECRET
- Enable CORS only for your frontend domain
- Use environment variables in production
- Rotate database credentials regularly
