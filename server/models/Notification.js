import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['application', 'admit_card', 'result'],
    required: true
  },
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please provide notification title'],
    maxlength: 200
  },
  content: {
    type: String,
    required: [true, 'Please provide notification content'],
    maxlength: 1000
  },
  notificationDate: {
    type: Date,
    required: true
  },
  link: String,
  important: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Notification', notificationSchema);
