const { createUser, loginUser, sendUserOTP, verifyUserOTP } = require("../services/authService");
const { handleError } = require("../utils/errorHandler");

const register = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({ success: true, message: 'User created successfully', data: user });
  } 
  catch (error) {
    handleError(res, error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email)
    console.log(password)
    const response = await loginUser(email, password);
    res.status(200).json({ success: true, message: 'User logined successfully', data: response });
  } 
  catch (error) {
    handleError(res, error);
  }
};

const sendOTP = async (req, res) => {
  try {
    const response = await sendUserOTP(req.body.email);
    res.status(200).json({ success: true, message: 'OTP sent successfully', data: null });
  } 
  catch (error) {
    handleError(res, error);
  }
};

const verifyOTP = async (req, res) => {
  try {
    const response = await verifyUserOTP(req.body.email, req.body.otp);
    res.status(200).json({ success: true, message: 'OTP validated successfully', data: response });
  } 
  catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  register,
  login,
  sendOTP,
  verifyOTP
}

