import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import UserProgress from '../models/UserProgress.js';

// Load environment variables
dotenv.config();

const sampleUsers = [
  {
    email: 'student1@nyu.edu',
    password: 'Password123',
    firstName: 'John',
    lastName: 'Doe'
  },
  {
    email: 'student2@nyu.edu',
    password: 'Password123',
    firstName: 'Jane',
    lastName: 'Smith'
  },
  {
    email: 'student3@nyu.edu',
    password: 'Password123',
    firstName: 'Ahmed',
    lastName: 'Al-Rashid'
  }
];

const sampleProgress = [
  {
    email: 'student1@nyu.edu',
    majors: ['Computer Science'],
    minors: ['Interactive Media'],
    mandatory: {
      'Core Curriculum': true,
      'Writing': true,
      'Math': true
    },
    majorReqs: {
      'computer-science--introduction-to-computer-science': true,
      'computer-science--calculus-w/-applications-to-science-&-engr': true,
      'computer-science--discrete-mathematics': true,
      'computer-science--data-structures': false,
      'computer-science--computer-systems-organization': false
    },
    minorReqs: {
      'interactive-media--introduction-to-interactive-media': true,
      'interactive-media--communications-lab': false
    },
    majorElectives: {
      'computer-science--database-systems': false,
      'computer-science--machine-learning': false
    },
    minorElectives: {
      'interactive-media--interaction-design-studio': false,
      'interactive-media--application-development': false
    },
    generalElectives: 8,
    totalCreditsEarned: 32,
    degreeCompletionPercentage: 25
  },
  {
    email: 'student2@nyu.edu',
    majors: ['Economics'],
    minors: [],
    mandatory: {
      'Core Curriculum': true,
      'Writing': true,
      'Math': true
    },
    majorReqs: {
      'Principles of Microeconomics': true,
      'Principles of Macroeconomics': true,
      'Intermediate Microeconomics': false
    },
    minorReqs: {},
    majorElectives: {},
    minorElectives: {},
    generalElectives: 12,
    totalCreditsEarned: 28,
    degreeCompletionPercentage: 22
  },
  {
    email: 'student3@nyu.edu',
    majors: ['Psychology'],
    minors: ['Computer Science'],
    mandatory: {
      'Core Curriculum': true,
      'Writing': true,
      'Math': false
    },
    majorReqs: {
      'Introduction to Psychology': true,
      'Research Methods in Psychology': true,
      'Cognitive Psychology': false
    },
    minorReqs: {
      'Introduction to Computer Science': true,
      'Data Structures': false
    },
    majorElectives: {},
    minorElectives: {
      'Database Systems': false
    },
    generalElectives: 16,
    totalCreditsEarned: 24,
    degreeCompletionPercentage: 19
  }
];

// Helper function to safely create Map from object
const createMapFromObject = (obj) => {
  if (!obj || typeof obj !== 'object') {
    return new Map();
  }
  return new Map(Object.entries(obj));
};

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await UserProgress.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create users
    const createdUsers = [];
    for (const userData of sampleUsers) {
      const user = await User.create(userData);
      createdUsers.push(user);
      console.log(`👤 Created user: ${user.email}`);
    }

    // Create progress data
    for (const progressData of sampleProgress) {
      const user = createdUsers.find(u => u.email === progressData.email);
      if (user) {
        const progress = await UserProgress.create({
          userId: user._id,
          email: progressData.email,
          majors: progressData.majors || [],
          minors: progressData.minors || [],
          mandatory: createMapFromObject(progressData.mandatory),
          majorReqs: createMapFromObject(progressData.majorReqs),
          minorReqs: createMapFromObject(progressData.minorReqs),
          majorElectives: createMapFromObject(progressData.majorElectives),
          minorElectives: createMapFromObject(progressData.minorElectives),
          major2Reqs: new Map(),
          minor2Reqs: new Map(),
          major2Electives: new Map(),
          minor2Electives: new Map(),
          capstone: new Map(),
          generalElectives: progressData.generalElectives || 0,
          totalCreditsEarned: progressData.totalCreditsEarned || 0,
          degreeCompletionPercentage: progressData.degreeCompletionPercentage || 0
        });
        console.log(`📊 Created progress for: ${progressData.email}`);
      }
    }

    console.log('✅ Database seeded successfully!');
    console.log('\n📋 Test Credentials:');
    sampleUsers.forEach(user => {
      console.log(`Email: ${user.email} | Password: ${user.password}`);
    });

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
};

// Run the seed function
seedDatabase(); 