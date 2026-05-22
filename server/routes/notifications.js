import express from 'express';
import { getAllNotifications, getNotificationsByExam, createNotification, deleteNotification } from '../controllers/notificationController.js';

const router = express.Router();

router.get('/', getAllNotifications);
router.get('/exam/:examId', getNotificationsByExam);
router.post('/', createNotification);
router.delete('/:id', deleteNotification);

export default router;
