require('dotenv').config();
const { Module, User } = require('./models');

const checkModules = async () => {
  try {
    const modules = await Module.findAll({
      include: [
        { 
          model: User, 
          as: 'teacher',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    console.log('\nTotal Modules:', modules.length, '\n');
    
    if (modules.length === 0) {
      console.log('❌ No modules found in database!');
      console.log('\nRun: npm run seed');
      console.log('to create sample data.\n');
    } else {
      modules.forEach((module, i) => {
        console.log(`${i + 1}. ${module.title}`);
        console.log(`   Subject: ${module.subject}`);
        console.log(`   Status: ${module.status}`);
        console.log(`   Grade Level: ${module.gradeLevel}`);
        console.log(`   Teacher: ${module.teacher ? `${module.teacher.firstName} ${module.teacher.lastName}` : 'None'}`);
        console.log(`   Created: ${module.createdAt.toISOString().split('T')[0]}`);
        console.log('');
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

checkModules();
