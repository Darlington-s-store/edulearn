require('dotenv').config();
const { User, StudentProfile, TeacherProfile } = require('./models');

const listUsers = async () => {
  try {
    const users = await User.findAll({
      include: [
        { model: StudentProfile, as: 'studentProfile' },
        { model: TeacherProfile, as: 'teacherProfile' }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    console.log('\nTotal Users:', users.length, '\n');
    
    users.forEach((user, i) => {
      const profile = user.studentProfile || user.teacherProfile;
      console.log(`${i + 1}. ${user.firstName} ${user.lastName} (${user.role})`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Created: ${user.createdAt.toISOString().split('T')[0]}`);
      if (user.studentProfile) {
        console.log(`   Grade: ${user.studentProfile.grade || 'N/A'}, Points: ${user.studentProfile.points}`);
      }
      console.log('');
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

listUsers();
