const User = require("../models/userModel");
const mongoose = require("mongoose");

const createUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });

  if (existingUser) throw new Error('Email already exists');  

  const newUser = new User(userData);
  return await newUser.save();
};

const getAllUsers = async () => {
  return await User.find({}, { password: 0, __v: 0, otp: 0, otpExpiry: 0 });  
};

const getUserById = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID format");
  }

  const user = await User.findById(userId, { password: 0, __v: 0, otp: 0, otpExpiry: 0 });

  if (!user) throw new Error('User not found');

  return user;
};

const updateUser = async (userId, updateData) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID format");
  }

  const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });

  if (!updatedUser) throw new Error('User not found');

  return updatedUser;
};

const deleteUser = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID format");
  }

  const deletedUser = await User.findByIdAndDelete(userId);

  if (!deletedUser) throw new Error('User not found');

  return deletedUser;
};

module.exports = {
   createUser,
   getAllUsers,
   getUserById,
   updateUser,
   deleteUser
}