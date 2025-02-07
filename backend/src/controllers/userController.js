const { handleError } = require("../utils/errorHandler");
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require("../services/userService");

const createUserData = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({ success: true, message: 'User created successfully', data: user });
  } 
  catch (error) {
    handleError(res, error);
  }
};

const getAllUsersData = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({ success: true, message: '', data: users });
  } 
  catch (error) {
    handleError(res, error);
  }
};

const getUserByIdData = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    res.status(200).json({ success: true, message: '', data: user });
  } 
  catch (error) {
    handleError(res, error);
  }
};

const updateUserData = async (req, res) => {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);
    res.status(200).json({ success: true, message: 'User updated successfully', data: updatedUser });
  } 
  catch (error) {
    handleError(res, error);
  }
};

const deleteUserData = async (req, res) => {
  try {
    const response = await deleteUser(req.params.id);
    res.status(200).json({ success: true, message: 'User deleted successfully', data: response });
  } 
  catch (error) {
    handleError(res, error);
  }
};

module.exports = {
    createUserData,
    getAllUsersData,
    getUserByIdData,
    updateUserData,
    deleteUserData
}
