require('dotenv').config();
const { User, StudentProfile } = require('./models');

const checkUsers = async () => {
  try {
    console.log('\n🔍 Checking Users in Database...\n');
    console.log('='.repeat(60));
    
    // Get all users
    const users = await User.findAll({
      include: [
        { model: StudentProfile, as: 'studentProfile' }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    console.log(`\n📊 Total Users: ${users.length}\n`);
    
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.firstName} ${user.lastName}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Created: ${new Date(user.createdAt).toLocaleString()}`);
      console.log(`   Active: ${user.isActive ? '✅' : '❌'}`);
      console.log(`   Email Verified: ${user.emailVerified ? '✅' : '❌'}`);
      
      if (user.studentProfile) {
        console.log(`   Student Info:`);
        console.log(`     - Grade: ${user.studentProfile.grade || 'Not set'}`);
        console.log(`     - School: ${user.studentProfile.school || 'Not set'}`);
        console.log(`     - Points: ${user.studentProfile.points || 0}`);
      }
      
      console.log('');
    });
    
    console.log('='.repeat(60));
    
    // Show recently created users (last 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentUsers = users.filter(u => new Date(u.createdAt) > oneDayAgo);
    
    if (recentUsers.length > 0) {
      console.log(`\n🆕 Recently Created (Last 24 hours): ${recentUsers.length}`);
      recentUsers.forEach(user => {
        console.log(`   - ${user.email} (${user.role}) - ${new Date(user.createdAt).toLocaleString()}`);
      });
    }
    
    console.log('\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

checkUsers();
