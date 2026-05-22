import express from 'express';
import { createStudyPlan, getStudyPlans, getStudyPlanById, updateStudyPlan, deleteStudyPlan } from '../controllers/studyPlanController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, createStudyPlan);
router.get('/', authMiddleware, getStudyPlans);
router.get('/:id', authMiddleware, getStudyPlanById);
router.put('/:id', authMiddleware, updateStudyPlan);
router.delete('/:id', authMiddleware, deleteStudyPlan);

export default router;
