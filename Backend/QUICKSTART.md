# 🚀 Quick Start Guide

## Prerequisites
- Node.js installed
- A Neon database account (free at https://neon.tech)

## Setup in 5 Steps

### Step 1: Get Your Neon Connection String

1. Go to https://console.neon.tech/
2. Login or create a free account
3. Create a new project (or use existing)
4. Click on your database
5. Copy the **Connection String** - looks like:
   ```
   postgresql://user:password@host/database?sslmode=require
   ```

### Step 2: Run Setup Script

```bash
cd backend
npm run setup
```

This interactive script will:
- Ask for your Neon connection string
- Generate a secure JWT secret
- Create your `.env` file

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Create Database Tables

```bash
npm run migrate
```

### Step 5: Start the Server

```bash
npm run dev
```

You should see:
```
✅ Database connection established successfully.
✅ Database models synchronized
🚀 Server running on port 5000
```

## Optional: Add Sample Data

```bash
npm run seed
```

This creates test accounts:
- **Admin**: admin@example.com / password123
- **Teacher**: teacher@example.com / password123
- **Student**: student@example.com / password123
- **Parent**: parent@example.com / password123

## Test the API

Open your browser or use curl:

```bash
# Health check
curl http://localhost:5000/health

# Or visit in browser:
http://localhost:5000/health
```

## What's Next?

1. ✅ Backend is running
2. 📱 Connect your frontend to the API
3. 🔐 Use the test accounts to login
4. 🎨 Build amazing features!

## Troubleshooting

### "Connection refused" error
- Check your Neon connection string is correct
- Verify your Neon database is active (not paused)
- Ensure you have internet connection

### "Cannot find module" error
```bash
npm install
```

### Need to reset database
```bash
npm run seed
```

## Manual .env Setup

If you prefer to create `.env` manually, copy `.env.example` and update:

```env
DATABASE_URL=your_neon_connection_string_here
JWT_SECRET=your_random_secret_key_here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Support

Check `SETUP_NEON.md` for detailed setup instructions.
Check `README.md` for complete API documentation.
