// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const UserSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { 
//     type: String, 
//     unique: true, 
//     required: true,         
//     match: [
//       /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 
//       'Please provide a valid email address',
//     ], 
//   },
//   password: { type: String, required: true },
//   role: { type: String, enum: ["admin", "user"], default: "user" },
// }, { timestamps: true });

// UserSchema.pre("save", async function(next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// module.exports = mongoose.model("User", UserSchema);
