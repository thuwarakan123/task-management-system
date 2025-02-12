const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const createUser = async (userData) => {
  const userExists = await User.findOne({ email: userData.email });

  if (userExists) {
    throw new Error('Email already exists');  
  }

  const newUser = new User(userData);
  return await newUser.save();
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  return { user, token: generateToken(user) };
};

const sendUserOTP = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  const otp = Math.floor(100000 + Math.random() * 900000).toString();  
  user.otp = otp;
  user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); 
  await user.save();

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: "thuwarakan123@gmail.com",
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It expires in 10 minutes.`,
  });

  return true;
};

const verifyUserOTP = async (email, otp) => {
  const user = await User.findOne({ email });
  if (!user || user.otp !== otp || new Date() > user.otpExpiry) {
    throw new Error("Invalid or expired OTP");
  }

  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  return { token: generateToken(user), user };
};

module.exports = {
  createUser,
  loginUser,
  sendUserOTP,
  verifyUserOTP
}
