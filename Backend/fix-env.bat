@echo off
echo Updating .env file with correct Neon configuration...

(
echo NODE_ENV=development
echo PORT=5000
echo.
echo # Neon Database Connection String
echo DATABASE_URL=postgresql://neondb_owner:npg_X3A2OrsIgnlu@ep-odd-dust-adov9zot-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
echo.
echo # JWT Configuration
echo JWT_SECRET=ssk_rxnhb4jkwhvheeyqzc1dc5k4qf7mks7fckz33mpqhx200
echo JWT_EXPIRE=7d
echo.
echo # Email Configuration
echo EMAIL_HOST=smtp.gmail.com
echo EMAIL_PORT=587
echo EMAIL_USER=asomanirawlingsjunior5333@gmail.com
echo EMAIL_PASSWORD=Aso1234@1
echo.
echo # Frontend URL
echo FRONTEND_URL=http://localhost:5173
echo.
echo # File Upload
echo MAX_FILE_SIZE=5242880
echo UPLOAD_PATH=./uploads
echo.
echo # AI Configuration
echo DEEPSEEK_API_KEY=sk-19526f7b812c4cf58e30b9f4246d3162
) > .env

echo.
echo ✅ .env file updated with Neon database configuration!
echo.
echo Next steps:
echo 1. Run: npm start
echo 2. Run: node seeders/createAdmin.js
echo.
pause
