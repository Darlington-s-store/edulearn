const bcrypt = require('bcryptjs');
const { User } = require('../models');

async function createAdminUser() {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({
      where: { email: 'admin@edulearn.com' }
    });

    if (existingAdmin) {
      console.log('✅ Admin user already exists!');
      console.log('\n📧 Admin Credentials:');
      console.log('Email: admin@edulearn.com');
      console.log('Password: Admin@123');
      console.log('\n🔗 Login URL: http://localhost:5173/admin/login\n');
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('Admin@123', 10);

    // Create admin user
    const admin = await User.create({
      email: 'admin@edulearn.com',
      password: hashedPassword,
      role: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      phone: '+233 123 456 789',
      status: 'active'
    });

    console.log('✅ Admin user created successfully!');
    console.log('\n📧 Admin Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Email:    admin@edulearn.com');
    console.log('Password: Admin@123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n🔗 Login URL: http://localhost:5173/admin/login');
    console.log('\n⚠️  IMPORTANT: Change this password after first login!\n');

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  }
}

// Run if called directly
if (require.main === module) {
  createAdminUser().then(() => {
    process.exit(0);
  }).catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = createAdminUser;
