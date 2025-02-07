const express = require("express");
const router = express.Router();
const { authenticate, isAdmin } = require("../middleware/authMiddleware");
const { 
    createTaskData,
    getAllTasksData,
    getUserTasksData,
    getTaskByIdData,
    updateTaskData,
    deleteTaskData,
    markTaskCompletedData
} = require("../controllers/taskController");

// Admin Routes
router.get("/", authenticate, isAdmin, getAllTasksData);
router.post("/", authenticate, isAdmin, createTaskData);
router.put("/:id", authenticate, isAdmin, updateTaskData);
router.delete("/:id", authenticate, isAdmin, deleteTaskData);

// Public Routes
router.get("/user", authenticate, getUserTasksData);
router.get("/:id", authenticate, getTaskByIdData);
router.put("/:id/complete", authenticate, markTaskCompletedData);

module.exports = router;
