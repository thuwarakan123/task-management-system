const { handleError } = require("../utils/errorHandler");
const { 
    createTask,
    getAllTasks,
    getUserTasks,
    getTaskById,
    updateTask,
    deleteTask,
    markTaskCompleted
} = require("../services/taskService");

const createTaskData = async (req, res) => {
  try {
    const task = await createTask(req.body);
    res.status(201).json({ success: true, message: 'Task created successfully', data: task });
  } 
  catch (error) {
    handleError(res, error);
  }
};

const getAllTasksData = async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.status(200).json({ success: true, message: '', data: tasks });
  } 
  catch (error) {
    handleError(res, error);
  }
};

const getUserTasksData = async (req, res) => {
  try {
    const tasks = await getUserTasks(req.user.id);
    res.status(200).json({ success: true,  message: '', data: tasks });
  } 
  catch (error) {
    handleError(res, error);
  }
};

const getTaskByIdData = async (req, res) => {
  try {
    const task = await getTaskById(req.params.id);
    res.status(200).json({ success: true,  message: '', data: task });
  } 
  catch (error) {
    handleError(res, error);
  }
};

const updateTaskData = async (req, res) => {
  try {
    const updatedTask = await updateTask(req.params.id, req.body);
    res.status(200).json({ success: true,  message: 'Task updated successfully', data: updatedTask });
  } 
  catch (error) {
    handleError(res, error);
  }
};

const deleteTaskData = async (req, res) => {
  try {
    const response = await deleteTask(req.params.id);
    res.status(200).json({ success: true,  message: 'Task deleted successfully', data: response });
  } 
  catch (error) {
    handleError(res, error);
  }
};

const markTaskCompletedData = async (req, res) => {
  try {
    const task = await markTaskCompleted(req.params.id, req.user.id);
    res.status(200).json({ success: true, message: 'Task marked completed', data: task });
  } 
  catch (error) {
    handleError(res, error);
  }
};

module.exports = { 
    createTaskData,
    getAllTasksData,
    getUserTasksData,
    getTaskByIdData,
    updateTaskData,
    deleteTaskData,
    markTaskCompletedData
}