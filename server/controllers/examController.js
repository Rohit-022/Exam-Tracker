import Exam from '../models/Exam.js';
import User from '../models/User.js';

export const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find({});
    res.status(200).json({ exams });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exams', error: error.message });
  }
};

export const getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }
    res.status(200).json({ exam });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exam', error: error.message });
  }
};

export const selectExam = async (req, res) => {
  try {
    const { examId } = req.body;
    
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.targetExams.includes(examId)) {
      user.targetExams.push(examId);
      await user.save();
    }

    res.status(200).json({ message: 'Exam selected successfully', targetExams: user.targetExams });
  } catch (error) {
    res.status(500).json({ message: 'Error selecting exam', error: error.message });
  }
};

export const deselectExam = async (req, res) => {
  try {
    const { examId } = req.body;
    
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.targetExams = user.targetExams.filter(id => id.toString() !== examId);
    await user.save();

    res.status(200).json({ message: 'Exam deselected successfully', targetExams: user.targetExams });
  } catch (error) {
    res.status(500).json({ message: 'Error deselecting exam', error: error.message });
  }
};

export const createExam = async (req, res) => {
  try {
    const { name, description, applicationStartDate, applicationEndDate, examDate, resultDate, syllabus, totalMarks, duration } = req.body;

    const newExam = new Exam({
      name,
      description,
      applicationStartDate,
      applicationEndDate,
      examDate,
      resultDate,
      syllabus,
      totalMarks,
      duration
    });

    await newExam.save();
    res.status(201).json({ message: 'Exam created successfully', exam: newExam });
  } catch (error) {
    res.status(500).json({ message: 'Error creating exam', error: error.message });
  }
};
