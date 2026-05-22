import Notification from '../models/Notification.js';

export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({})
      .populate('examId')
      .sort({ notificationDate: -1 });
    res.status(200).json({ notifications });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error: error.message });
  }
};

export const getNotificationsByExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const notifications = await Notification.find({ examId })
      .populate('examId')
      .sort({ notificationDate: -1 });
    res.status(200).json({ notifications });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error: error.message });
  }
};

export const createNotification = async (req, res) => {
  try {
    const { type, examId, title, content, notificationDate, link, important } = req.body;

    const newNotification = new Notification({
      type,
      examId,
      title,
      content,
      notificationDate,
      link,
      important
    });

    await newNotification.save();
    res.status(201).json({ message: 'Notification created successfully', notification: newNotification });
  } catch (error) {
    res.status(500).json({ message: 'Error creating notification', error: error.message });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting notification', error: error.message });
  }
};
