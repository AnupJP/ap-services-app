const Task = require('../models/Task');

// Get all tasks with pagination and lean query
exports.getAllTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default to page 1, 10 items per page
    const tasks = await Task.find()
      .select('title description status')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();
    const totalTasks = await Task.countDocuments(); // Count total tasks for pagination metadata

    res.status(200).json({
      tasks,
      currentPage: Number(page),
      totalPages: Math.ceil(totalTasks / limit),
      totalTasks,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single task
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).select('title description status').lean();
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body; // Destructure fields for validation
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const task = new Task({ title, description, status });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const updates = req.body; // Destructure fields for selective updates
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id },
      updates,
      { new: true, runValidators: true } // Return updated task, validate before save
    ).select('title description status').lean();

    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
