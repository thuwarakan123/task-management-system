const express = require("express");
const router = express.Router();
const { authenticate, isAdmin } = require("../middleware/authMiddleware");
const {
    createUserData,
    getAllUsersData,
    getUserByIdData,
    updateUserData,
    deleteUserData
} = require("../controllers/userController");

router.post("/", authenticate, isAdmin, createUserData);
router.get("/", authenticate, isAdmin, getAllUsersData);
router.get("/:id", authenticate, isAdmin, getUserByIdData);
router.put("/:id", authenticate, isAdmin, updateUserData);
router.delete("/:id", authenticate, isAdmin, deleteUserData);

module.exports = router;
