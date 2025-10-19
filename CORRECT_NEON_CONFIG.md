# ✅ Correct Neon Database Configuration

## Your Correct Connection String

```
postgresql://neondb_owner:npg_X3A2OrsIgnlu@ep-odd-dust-adov9zot-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

## Update Your Backend/.env File

**Copy and paste this into your `Backend/.env` file:**

```env
NODE_ENV=development
PORT=5000

# Neon Database - Use Connection String
DATABASE_URL=postgresql://neondb_owner:npg_X3A2OrsIgnlu@ep-odd-dust-adov9zot-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require

# OR use individual parameters (choose one method):
# DB_HOST=ep-odd-dust-adov9zot-pooler.c-2.us-east-1.aws.neon.tech
# DB_PORT=5432
# DB_NAME=neondb
# DB_USER=neondb_owner
# DB_PASSWORD=npg_X3A2OrsIgnlu

# JWT Configuration
JWT_SECRET=ssk_rxnhb4jkwhvheeyqzc1dc5k4qf7mks7fckz33mpqhx200
JWT_EXPIRE=7d

# Frontend URL
FRONTEND_URL=http://localhost:5173

# AI Configuration
DEEPSEEK_API_KEY=sk-19526f7b812c4cf58e30b9f4246d3162

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=asomanirawlingsjunior5333@gmail.com
EMAIL_PASSWORD=Aso1234@1

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

## Key Difference

**Old (Wrong):**
```
DB_HOST=ep-odd-dust-adov9zot.us-east-1.aws.neon.tech
```

**New (Correct):**
```
DB_HOST=ep-odd-dust-adov9zot-pooler.c-2.us-east-1.aws.neon.tech
```

Notice the `-pooler.c-2` part was missing!

## After Updating .env

1. **Save the file**
2. **Restart backend:**
   ```bash
   cd Backend
   npm start
   ```

3. **Expected output:**
   ```
   ✅ Database connection established successfully.
   ✅ Database models synchronized
   🚀 Server running on port 5000
   ```

4. **Create admin user:**
   ```bash
   node seeders/createAdmin.js
   ```

5. **Test login:**
   - Go to: http://localhost:5173/admin/login
   - Email: admin@edulearn.com
   - Password: Admin@123

---

**The database will be created automatically when you start the backend!** 🚀
