require('dotenv').config();
const { sequelize, testConnection } = require('./config/database');
const { User } = require('./models');

async function diagnose() {
  console.log('\n🔍 Running Database Diagnostics...\n');
  
  // 1. Check environment variables
  console.log('📋 Environment Variables:');
  console.log('  NODE_ENV:', process.env.NODE_ENV || 'not set');
  console.log('  PORT:', process.env.PORT || 'not set');
  console.log('  DB_HOST:', process.env.DB_HOST || 'not set');
  console.log('  DB_PORT:', process.env.DB_PORT || 'not set');
  console.log('  DB_NAME:', process.env.DB_NAME || 'not set');
  console.log('  DB_USER:', process.env.DB_USER || 'not set');
  console.log('  DB_PASSWORD:', process.env.DB_PASSWORD ? '***set***' : 'not set');
  console.log('  DATABASE_URL:', process.env.DATABASE_URL ? '***set***' : 'not set');
  console.log('  JWT_SECRET:', process.env.JWT_SECRET ? '***set***' : 'not set');
  console.log('');
  
  // 2. Test database connection
  console.log('🔌 Testing Database Connection...');
  try {
    await testConnection();
    console.log('  ✅ Connection successful!\n');
  } catch (error) {
    console.log('  ❌ Connection failed:', error.message);
    console.log('\n💡 Possible solutions:');
    console.log('  1. Check if PostgreSQL is running');
    console.log('  2. Verify database credentials in .env file');
    console.log('  3. Ensure database "edu_learn_db" exists');
    console.log('  4. Check if port 5432 is available\n');
    process.exit(1);
  }
  
  // 3. Check if tables exist
  console.log('📊 Checking Database Tables...');
  try {
    const [results] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    
    if (results.length === 0) {
      console.log('  ⚠️  No tables found. Database needs to be synced.');
      console.log('  Run: npm start (to sync models)\n');
    } else {
      console.log(`  ✅ Found ${results.length} tables:`);
      results.forEach(row => console.log(`     - ${row.table_name}`));
      console.log('');
    }
  } catch (error) {
    console.log('  ❌ Error checking tables:', error.message, '\n');
  }
  
  // 4. Check for admin user
  console.log('👤 Checking for Admin User...');
  try {
    const adminCount = await User.count({ where: { role: 'admin' } });
    
    if (adminCount === 0) {
      console.log('  ⚠️  No admin user found.');
      console.log('  Run: node seeders/createAdmin.js\n');
    } else {
      console.log(`  ✅ Found ${adminCount} admin user(s)`);
      
      const admins = await User.findAll({ 
        where: { role: 'admin' },
        attributes: ['id', 'email', 'firstName', 'lastName', 'createdAt']
      });
      
      admins.forEach(admin => {
        console.log(`     - ${admin.email} (${admin.firstName} ${admin.lastName})`);
      });
      console.log('');
    }
  } catch (error) {
    console.log('  ❌ Error checking admin user:', error.message);
    console.log('  This might mean the users table doesn\'t exist yet.\n');
  }
  
  // 5. Check all users
  console.log('👥 Checking All Users...');
  try {
    const userCount = await User.count();
    console.log(`  ✅ Total users in database: ${userCount}`);
    
    if (userCount > 0) {
      const roleCounts = await sequelize.query(`
        SELECT role, COUNT(*) as count 
        FROM users 
        GROUP BY role
        ORDER BY role;
      `, { type: sequelize.QueryTypes.SELECT });
      
      console.log('  User breakdown by role:');
      roleCounts.forEach(row => {
        console.log(`     - ${row.role}: ${row.count}`);
      });
    }
    console.log('');
  } catch (error) {
    console.log('  ❌ Error checking users:', error.message, '\n');
  }
  
  // 6. Summary
  console.log('📝 Summary:');
  console.log('  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  try {
    await sequelize.authenticate();
    const adminCount = await User.count({ where: { role: 'admin' } });
    
    if (adminCount > 0) {
      console.log('  ✅ Database is connected');
      console.log('  ✅ Admin user exists');
      console.log('  ✅ Ready to start server!');
      console.log('\n  Next steps:');
      console.log('    1. Run: npm start');
      console.log('    2. Open: http://localhost:5173/admin/login');
      console.log('    3. Login with: admin@edulearn.com / Admin@123');
    } else {
      console.log('  ✅ Database is connected');
      console.log('  ⚠️  Admin user missing');
      console.log('\n  Next steps:');
      console.log('    1. Run: node seeders/createAdmin.js');
      console.log('    2. Run: npm start');
      console.log('    3. Open: http://localhost:5173/admin/login');
    }
  } catch (error) {
    console.log('  ❌ Database connection failed');
    console.log('\n  Next steps:');
    console.log('    1. Check PostgreSQL is running');
    console.log('    2. Verify .env file configuration');
    console.log('    3. Create database: CREATE DATABASE edu_learn_db;');
    console.log('    4. Run this script again');
  }
  
  console.log('  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  process.exit(0);
}

diagnose().catch(error => {
  console.error('\n❌ Diagnostic failed:', error.message);
  process.exit(1);
});
