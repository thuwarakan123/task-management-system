const Task = require("../models/taskModel");

const createTask = async (taskData) => {
  return await Task.create(taskData);
};

const getAllTasks = async () => {
  return await Task.find().populate("assignedUser", "firstName lastName email");
};

const getUserTasks = async (userId) => {
  return await Task.find({ assignedUser: userId });
};

const getTaskById = async (taskId) => {
  const task = await Task.findById(taskId).populate("assignedUser", "firstName lastName email");

  if (!task) throw new Error('Task not found');

  return task;
};

const updateTask = async (taskId, updateData) => {
  const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, { new: true, runValidators: true });

  if (!updatedTask) throw new Error('Task not found');;

  return updatedTask;
};

const deleteTask = async (taskId) => {
  const deletedTask = await Task.findByIdAndDelete(taskId);

  if (!deletedTask) throw new Error('Task not found');

  return deletedTask;
};

const markTaskCompleted = async (taskId, userId) => {
  const task = await Task.findById(taskId);

  if (!task) throw new Error('Task not found');
  
  if (task.assignedUser.toString() !== userId) {
    throw new Error ("Unauthorized: You are not assigned to this task");
  }

  task.status = "completed";
  task.completionDate = new Date();

  await task.save();

  return task;
};

module.exports = { 
  createTask,
  getAllTasks,
  getUserTasks,
  getTaskById,
  updateTask,
  deleteTask,
  markTaskCompleted
}