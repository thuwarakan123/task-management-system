const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    firstName: { 
        type: String, 
        required: [true, 'First Name is required']  
    },
    lastName: { 
        type: String, 
        required: [true, 'Last Name is required'] 
    },
    email: { 
        type: String, 
        unique: true, 
        required: [true, 'Email is required'], 
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 
            'Please provide a valid email address',
        ],
    },
    mobileNumber: { 
        type: String, 
        required: [true, 'Phone Number is required'] 
    },
    address: { 
        type: String, 
        required: [true, 'Address is required']  
    },
    password: { 
        type: String, 
        required: [true, 'Password is required']  
    },
    role: { 
        type: String, 
        enum: ["admin", "user"], 
        default: "user" 
    },
    otp: { type: String },  
    otpExpiry: { type: Date }  
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.pre("findByIdAndUpdate", async function (next) {
    const update = this.getUpdate();
    
    if (update.password) {
      update.password = await bcrypt.hash(update.password, 10);
    }
  
    next();
  });

UserSchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate();
    
    if (update.password) {
      update.password = await bcrypt.hash(update.password, 10);
    }
  
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;