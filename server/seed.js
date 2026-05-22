import Exam from './models/Exam.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const seedExams = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Clear existing exams
    await Exam.deleteMany({});

    const examsData = [
      {
        name: 'IBPS',
        description: 'Institute of Banking Personnel Selection examination for banking sector jobs',
        applicationStartDate: new Date('2024-09-01'),
        applicationEndDate: new Date('2024-09-30'),
        examDate: new Date('2024-12-15'),
        resultDate: new Date('2025-01-30'),
        syllabus: [
          {
            subject: 'Reasoning',
            topics: ['Analogy', 'Classification', 'Coding-Decoding', 'Syllogism', 'Sitting Arrangement']
          },
          {
            subject: 'Quantitative Aptitude',
            topics: ['Simplification', 'Percentage', 'Profit & Loss', 'Time & Work', 'Speed & Distance']
          },
          {
            subject: 'English Language',
            topics: ['Reading Comprehension', 'Grammar', 'Vocabulary', 'Error Spotting', 'Cloze Test']
          },
          {
            subject: 'General Awareness',
            topics: ['Current Events', 'Banking', 'Economics', 'History', 'Geography']
          }
        ],
        totalMarks: 100,
        duration: '60 minutes'
      },
      {
        name: 'SBI',
        description: 'State Bank of India recruitment examination for various positions',
        applicationStartDate: new Date('2024-08-15'),
        applicationEndDate: new Date('2024-09-15'),
        examDate: new Date('2024-11-10'),
        resultDate: new Date('2024-12-20'),
        syllabus: [
          {
            subject: 'Reasoning',
            topics: ['Logic Puzzles', 'Blood Relations', 'Coding-Decoding', 'Data Interpretation']
          },
          {
            subject: 'Quantitative Aptitude',
            topics: ['Arithmetic', 'Geometry', 'Algebra', 'Data Interpretation']
          },
          {
            subject: 'English',
            topics: ['Comprehension', 'Vocabulary', 'Grammar', 'Writing Skills']
          }
        ],
        totalMarks: 100,
        duration: '60 minutes'
      },
      {
        name: 'SSC CGL',
        description: 'Staff Selection Commission Combined Graduate Level examination',
        applicationStartDate: new Date('2024-07-01'),
        applicationEndDate: new Date('2024-08-15'),
        examDate: new Date('2024-09-12'),
        resultDate: new Date('2024-10-30'),
        syllabus: [
          {
            subject: 'General Intelligence and Reasoning',
            topics: ['Analogies', 'Similarities and Differences', 'Problem Solving', 'Analysis']
          },
          {
            subject: 'General Awareness',
            topics: ['History', 'Geography', 'Polity', 'Economics', 'Science']
          },
          {
            subject: 'Quantitative Ability',
            topics: ['Arithmetic', 'Algebra', 'Geometry', 'Statistics']
          },
          {
            subject: 'English Comprehension',
            topics: ['Reading Comprehension', 'Grammar', 'Sentence Improvement', 'Vocabulary']
          }
        ],
        totalMarks: 200,
        duration: '120 minutes'
      },
      {
        name: 'SSC CHSL',
        description: 'Staff Selection Commission Combined Higher Secondary Level examination',
        applicationStartDate: new Date('2024-10-01'),
        applicationEndDate: new Date('2024-11-01'),
        examDate: new Date('2025-01-15'),
        resultDate: new Date('2025-03-01'),
        syllabus: [
          {
            subject: 'General Intelligence',
            topics: ['Reasoning', 'Spatial Visualization', 'Analysis', 'Problem Solving']
          },
          {
            subject: 'General Awareness',
            topics: ['Current Affairs', 'History', 'Geography', 'Polity', 'General Science']
          },
          {
            subject: 'Quantitative Aptitude',
            topics: ['Basic Arithmetic', 'Percentage', 'Simple Interest', 'Time & Work']
          },
          {
            subject: 'English Language',
            topics: ['Grammar', 'Vocabulary', 'Reading Comprehension', 'Spelling']
          }
        ],
        totalMarks: 200,
        duration: '120 minutes'
      },
      {
        name: 'Railway Exams',
        description: 'Indian Railway recruitment examination for various positions',
        applicationStartDate: new Date('2024-06-01'),
        applicationEndDate: new Date('2024-07-15'),
        examDate: new Date('2024-08-20'),
        resultDate: new Date('2024-09-30'),
        syllabus: [
          {
            subject: 'General Science',
            topics: ['Physics', 'Chemistry', 'Biology', 'Basic Concepts']
          },
          {
            subject: 'Mathematics',
            topics: ['Arithmetic', 'Algebra', 'Geometry', 'Trigonometry']
          },
          {
            subject: 'General Knowledge',
            topics: ['India', 'World', 'Sports', 'Culture', 'Economics']
          },
          {
            subject: 'Mental Ability',
            topics: ['Logic', 'Spatial Reasoning', 'Problem Solving']
          }
        ],
        totalMarks: 100,
        duration: '120 minutes'
      }
    ];

    await Exam.insertMany(examsData);
    console.log('Exams seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding exams:', error);
    process.exit(1);
  }
};

seedExams();
