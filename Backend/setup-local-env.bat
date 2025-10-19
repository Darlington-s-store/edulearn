@echo off
echo Creating local .env file...

(
echo NODE_ENV=development
echo PORT=5000
echo.
echo # Local PostgreSQL Database
echo DB_HOST=localhost
echo DB_PORT=5432
echo DB_NAME=edu_learn_db
echo DB_USER=postgres
echo DB_PASSWORD=postgres
echo.
echo # JWT Configuration
echo JWT_SECRET=ssk_rxnhb4jkwhvheeyqzc1dc5k4qf7mks7fckz33mpqhx200
echo JWT_EXPIRE=7d
echo.
echo # Frontend URL
echo FRONTEND_URL=http://localhost:5173
echo.
echo # AI Configuration
echo DEEPSEEK_API_KEY=sk-19526f7b812c4cf58e30b9f4246d3162
echo.
echo # Email Configuration
echo EMAIL_HOST=smtp.gmail.com
echo EMAIL_PORT=587
echo EMAIL_USER=asomanirawlingsjunior5333@gmail.com
echo EMAIL_PASSWORD=Aso1234@1
echo.
echo # File Upload
echo MAX_FILE_SIZE=5242880
echo UPLOAD_PATH=./uploads
) > .env

echo.
echo ✅ .env file created with local PostgreSQL configuration
echo.
echo ⚠️  IMPORTANT: Update DB_PASSWORD in .env file with your PostgreSQL password!
echo.
echo Next steps:
echo 1. Edit .env and set correct DB_PASSWORD
echo 2. Run: psql -U postgres -c "CREATE DATABASE edu_learn_db;"
echo 3. Run: npm start
echo 4. Run: node seeders/createAdmin.js
echo.
pause
