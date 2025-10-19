require('dotenv').config();

console.log('\n🔍 Checking Environment Variables\n');
console.log('='.repeat(60));

console.log('\n📋 Database Configuration:');
console.log('─'.repeat(60));

if (process.env.DATABASE_URL) {
  console.log('✅ DATABASE_URL is set');
  console.log('Length:', process.env.DATABASE_URL.length);
  console.log('Value:', process.env.DATABASE_URL);
} else {
  console.log('❌ DATABASE_URL is NOT set');
  console.log('\nUsing individual parameters:');
  console.log('DB_HOST:', process.env.DB_HOST || '❌ NOT SET');
  console.log('DB_PORT:', process.env.DB_PORT || '❌ NOT SET');
  console.log('DB_NAME:', process.env.DB_NAME || '❌ NOT SET');
  console.log('DB_USER:', process.env.DB_USER || '❌ NOT SET');
  console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '✅ SET (hidden)' : '❌ NOT SET');
}

console.log('\n' + '='.repeat(60));
console.log('\n💡 Recommendation:\n');

if (!process.env.DATABASE_URL && !process.env.DB_HOST) {
  console.log('❌ No database configuration found!');
  console.log('\nYou need to set either:');
  console.log('1. DATABASE_URL (connection string), OR');
  console.log('2. DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD');
} else {
  console.log('✅ Database configuration found');
  console.log('\nTry running: npm run migrate');
}

console.log('\n');
