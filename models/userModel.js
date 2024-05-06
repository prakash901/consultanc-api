const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    // email: { type: String, unique: true },
    email: { type: String },
    isEmailVerified: { type: Boolean, default: false },
    // phoneNumber: { type: String, unique: true },
    phoneNumber: { type: String },
    isPhoneVerified: { type: Boolean, default: false },
    password: { type: String, required: true },
    userType: {
      type: String,
      enum: ["normal", "consultancy", "admin"],
      default: "normal"
    }
  },
  { timestamps: true }
)

const User = mongoose.model("User", userSchema)
module.exports = User
