const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n🔧 Edu-Learn Backend Environment Setup\n');
console.log('This script will help you create your .env file.\n');

const questions = [
  {
    key: 'DATABASE_URL',
    question: 'Enter your Neon database connection string (from Neon dashboard):\n',
    default: ''
  },
  {
    key: 'JWT_SECRET',
    question: 'Enter a secret key for JWT (or press Enter for random):\n',
    default: () => require('crypto').randomBytes(32).toString('hex')
  },
  {
    key: 'PORT',
    question: 'Enter server port (default: 5000):\n',
    default: '5000'
  }
];

const answers = {};
let currentQuestion = 0;

function askQuestion() {
  if (currentQuestion >= questions.length) {
    createEnvFile();
    return;
  }

  const q = questions[currentQuestion];
  rl.question(q.question, (answer) => {
    answers[q.key] = answer.trim() || (typeof q.default === 'function' ? q.default() : q.default);
    currentQuestion++;
    askQuestion();
  });
}

function createEnvFile() {
  const envContent = `# Server Configuration
PORT=${answers.PORT}
NODE_ENV=development

# Database Configuration - NEON (Cloud PostgreSQL)
DATABASE_URL=${answers.DATABASE_URL}

# JWT Configuration
JWT_SECRET=${answers.JWT_SECRET}
JWT_EXPIRE=7d

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_password

# Frontend URL
FRONTEND_URL=http://localhost:5173

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
`;

  const envPath = path.join(__dirname, '.env');
  
  if (fs.existsSync(envPath)) {
    rl.question('\n⚠️  .env file already exists. Overwrite? (y/N): ', (answer) => {
      if (answer.toLowerCase() === 'y') {
        fs.writeFileSync(envPath, envContent);
        console.log('\n✅ .env file created successfully!');
        console.log('\n📝 Next steps:');
        console.log('1. Run: npm install');
        console.log('2. Run: npm run migrate');
        console.log('3. Run: npm run seed (optional)');
        console.log('4. Run: npm run dev\n');
      } else {
        console.log('\n❌ Setup cancelled. .env file not modified.\n');
      }
      rl.close();
    });
  } else {
    fs.writeFileSync(envPath, envContent);
    console.log('\n✅ .env file created successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Run: npm install');
    console.log('2. Run: npm run migrate');
    console.log('3. Run: npm run seed (optional)');
    console.log('4. Run: npm run dev\n');
    rl.close();
  }
}

askQuestion();
