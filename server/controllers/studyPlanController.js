import StudyPlan from '../models/StudyPlan.js';
import Task from '../models/Task.js';

export const createStudyPlan = async (req, res) => {
  try {
    const { examId, title, description, startDate, endDate, syllabusProgress } = req.body;

    const newPlan = new StudyPlan({
      userId: req.userId,
      examId,
      title,
      description,
      startDate,
      endDate,
      syllabusProgress
    });

    await newPlan.save();
    res.status(201).json({ message: 'Study plan created successfully', studyPlan: newPlan });
  } catch (error) {
    res.status(500).json({ message: 'Error creating study plan', error: error.message });
  }
};

export const getStudyPlans = async (req, res) => {
  try {
    const plans = await StudyPlan.find({ userId: req.userId }).populate('examId');
    res.status(200).json({ studyPlans: plans });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching study plans', error: error.message });
  }
};

export const getStudyPlanById = async (req, res) => {
  try {
    const plan = await StudyPlan.findById(req.params.id).populate('examId');
    if (!plan) {
      return res.status(404).json({ message: 'Study plan not found' });
    }

    if (plan.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to access this study plan' });
    }

    res.status(200).json({ studyPlan: plan });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching study plan', error: error.message });
  }
};

export const updateStudyPlan = async (req, res) => {
  try {
    const { syllabusProgress, overallProgress, isActive } = req.body;
    const plan = await StudyPlan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({ message: 'Study plan not found' });
    }

    if (plan.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this study plan' });
    }

    if (syllabusProgress) plan.syllabusProgress = syllabusProgress;
    if (overallProgress !== undefined) plan.overallProgress = overallProgress;
    if (isActive !== undefined) plan.isActive = isActive;
    plan.updatedAt = Date.now();

    await plan.save();
    res.status(200).json({ message: 'Study plan updated successfully', studyPlan: plan });
  } catch (error) {
    res.status(500).json({ message: 'Error updating study plan', error: error.message });
  }
};

export const deleteStudyPlan = async (req, res) => {
  try {
    const plan = await StudyPlan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: 'Study plan not found' });
    }

    if (plan.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this study plan' });
    }

    await StudyPlan.findByIdAndDelete(req.params.id);
    await Task.deleteMany({ studyPlanId: req.params.id });

    res.status(200).json({ message: 'Study plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting study plan', error: error.message });
  }
};
