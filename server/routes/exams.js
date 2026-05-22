import express from 'express';
import { getAllExams, getExamById, selectExam, deselectExam, createExam } from '../controllers/examController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllExams);
router.get('/:id', getExamById);
router.post('/select', authMiddleware, selectExam);
router.post('/deselect', authMiddleware, deselectExam);
router.post('/', createExam);

export default router;
