import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide exam name'],
    enum: ['IBPS', 'SBI', 'SSC CGL', 'SSC CHSL', 'Railway Exams'],
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  applicationStartDate: {
    type: Date,
    required: true
  },
  applicationEndDate: {
    type: Date,
    required: true
  },
  examDate: {
    type: Date,
    required: true
  },
  resultDate: {
    type: Date,
    required: true
  },
  syllabus: [{
    subject: String,
    topics: [String]
  }],
  totalMarks: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Exam', examSchema);
