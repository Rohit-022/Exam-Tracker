import Task from '../models/Task.js';

export const createTask = async (req, res) => {
  try {
    const { studyPlanId, title, description, type, dueDate, priority, checklistItems } = req.body;

    const newTask = new Task({
      userId: req.userId,
      studyPlanId,
      title,
      description,
      type,
      dueDate,
      priority,
      checklistItems
    });

    await newTask.save();
    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { studyPlanId } = req.query;
    let query = { userId: req.userId };

    if (studyPlanId) {
      query.studyPlanId = studyPlanId;
    }

    const tasks = await Task.find(query).sort({ dueDate: 1 });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, completed, checklistItems } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this task' });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (dueDate) task.dueDate = dueDate;
    if (priority) task.priority = priority;
    if (completed !== undefined) {
      task.completed = completed;
      if (completed) {
        task.completedDate = Date.now();
      }
    }
    if (checklistItems) task.checklistItems = checklistItems;
    task.updatedAt = Date.now();

    await task.save();
    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this task' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};
