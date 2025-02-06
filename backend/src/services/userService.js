// const User = require("../models/userModel");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// exports.createUser = async (userData) => {
//   const existingUser = await User.findOne({ email: userData.email });
//   if (existingUser) throw { status: 400, message: "Email already exists" };

//   const newUser = new User(userData);
//   return await newUser.save();
// };

// exports.loginUser = async (email, password) => {
//   const user = await User.findOne({ email });
//   if (!user) throw { status: 401, message: "Invalid credentials" };

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) throw { status: 401, message: "Invalid credentials" };

//   const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
//   return { token, user };
// };
