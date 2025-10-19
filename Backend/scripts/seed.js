const { User, StudentProfile, TeacherProfile, Module, Assignment, Quiz, LiveClass } = require('../models');
const { sequelize } = require('../config/database');

const seedData = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Clear existing data (optional - be careful in production!)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ force: true });
      console.log('🗑️  Database cleared');
    }
    
    // Create admin user
    const admin = await User.create({
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      isActive: true,
      emailVerified: true
    });
    console.log('✅ Admin user created');
    
    // Create teacher user
    const teacher = await User.create({
      email: 'teacher@example.com',
      password: 'password123',
      role: 'teacher',
      firstName: 'Michael',
      lastName: 'Davis',
      isActive: true,
      emailVerified: true
    });
    
    await TeacherProfile.create({
      userId: teacher.id,
      subject: 'Mathematics',
      institution: 'Lincoln Middle School',
      bio: 'Experienced math teacher with 10+ years of teaching',
      rating: 4.8
    });
    console.log('✅ Teacher user created');
    
    // Create student user
    const student = await User.create({
      email: 'student@example.com',
      password: 'password123',
      role: 'student',
      firstName: 'Emma',
      lastName: 'Johnson',
      isActive: true,
      emailVerified: true
    });
    
    await StudentProfile.create({
      userId: student.id,
      age: 12,
      grade: 7,
      school: 'Lincoln Middle School',
      points: 1250,
      streak: 5
    });
    console.log('✅ Student user created');
    
    // Create parent user
    const parent = await User.create({
      email: 'parent@example.com',
      password: 'password123',
      role: 'parent',
      firstName: 'Sarah',
      lastName: 'Johnson',
      phone: '+1234567890',
      isActive: true,
      emailVerified: true
    });
    
    await StudentProfile.create({
      userId: parent.id,
      school: 'Lincoln Middle School'
    });
    console.log('✅ Parent user created');
    
    // Create sample module
    const module = await Module.create({
      teacherId: teacher.id,
      title: 'Introduction to Algebra',
      description: 'Learn the basics of algebraic expressions and equations',
      subject: 'Mathematics',
      gradeLevel: '7-8',
      difficulty: 'beginner',
      content: {
        lessons: [
          {
            id: 1,
            title: 'Variables and Expressions',
            content: 'Understanding variables and how to write algebraic expressions',
            duration: 30
          },
          {
            id: 2,
            title: 'Solving Linear Equations',
            content: 'Step-by-step guide to solving linear equations',
            duration: 45
          }
        ]
      },
      duration: 120,
      status: 'published',
      publishedAt: new Date()
    });
    console.log('✅ Sample module created');
    
    // Create sample assignment
    const assignment = await Assignment.create({
      teacherId: teacher.id,
      title: 'Algebra Practice Problems',
      description: 'Complete the following algebra problems',
      subject: 'Mathematics',
      gradeLevel: '7-8',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      totalPoints: 100,
      instructions: 'Show all your work and explain your reasoning',
      status: 'published',
      publishedAt: new Date()
    });
    console.log('✅ Sample assignment created');
    
    // Create sample quiz
    const quiz = await Quiz.create({
      teacherId: teacher.id,
      title: 'Algebra Basics Quiz',
      description: 'Test your understanding of basic algebra concepts',
      subject: 'Mathematics',
      gradeLevel: '7-8',
      questions: [
        {
          id: 1,
          question: 'What is 2x + 3 = 11?',
          type: 'multiple-choice',
          options: ['x = 4', 'x = 5', 'x = 6', 'x = 7'],
          correctAnswer: 0
        },
        {
          id: 2,
          question: 'Simplify: 3x + 2x',
          type: 'multiple-choice',
          options: ['5x', '6x', '5x²', '6'],
          correctAnswer: 0
        }
      ],
      timeLimit: 30,
      passingScore: 60,
      totalPoints: 100,
      allowRetake: true,
      showCorrectAnswers: true,
      status: 'published',
      publishedAt: new Date(),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
    });
    console.log('✅ Sample quiz created');
    
    // Create sample live class
    const liveClass = await LiveClass.create({
      teacherId: teacher.id,
      title: 'Live Algebra Session',
      description: 'Interactive session on solving algebraic equations',
      subject: 'Mathematics',
      gradeLevel: '7-8',
      scheduledDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days from now
      scheduledTime: '14:00:00',
      duration: 60,
      maxAttendees: 30,
      settings: {
        allowChat: true,
        allowScreenShare: true,
        allowWhiteboard: true,
        recordSession: true
      },
      status: 'scheduled'
    });
    console.log('✅ Sample live class created');
    
    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('Admin: admin@example.com / password123');
    console.log('Teacher: teacher@example.com / password123');
    console.log('Student: student@example.com / password123');
    console.log('Parent: parent@example.com / password123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
