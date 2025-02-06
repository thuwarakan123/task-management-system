const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({success: false, message: "Access denied", data: null});

  try {
    const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = verified;
    next();
  } 
  catch (error) {
    res.status(400).json({success: false, message: "Invalid token", data: null});
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({success: false, message: "Access denied. Admins only", data: null});
  }
  next();
};
