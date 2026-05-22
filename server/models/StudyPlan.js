import mongoose from 'mongoose';

const syllabusProgressSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  topics: [{
    name: String,
    completed: {
      type: Boolean,
      default: false
    }
  }],
  completionPercentage: {
    type: Number,
    default: 0
  }
});

const studyPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  syllabusProgress: [syllabusProgressSchema],
  overallProgress: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('StudyPlan', studyPlanSchema);
