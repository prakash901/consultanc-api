// auth.controller.js
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel.js")
const { sendVerificationSMS } = require("../utilities/sendVerificationSMS.js")
// const {
//   sendVerificationEmail,
//   sendVerificationSMS
// } = require("../utils/verification")

async function register(req, res) {
  try {
    const { email, phoneNumber, password } = req.body
    // Check if either email or phone number is provided
    if (!email && !phoneNumber) {
      throw new Error("Email or phone number is required")
    }
    let existingUser
    if (email) {
      existingUser = await User.findOne({ email })
      if (existingUser) {
        throw new Error("Email is already registered")
      }
    }
    if (phoneNumber) {
      existingUser = await User.findOne({ phoneNumber })
      if (existingUser) {
        throw new Error("Phone number is already registered")
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({
      email,
      phoneNumber,
      password: hashedPassword,
      userType: "normal"
    })
    await user.save()
    // Send verification email or SMS
    // if (email) {
    //   await sendVerificationEmail(email);
    // } else {
    //   await sendVerificationSMS(phoneNumber);
    // }
    res.status(201).json({
      message: "User registered successfully. Verification email/SMS sent."
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

async function login(req, res) {
  try {
    const { email, phoneNumber, password } = req.body

    // Check if either email or phone number is provided
    if (!email && !phoneNumber) {
      throw new Error("Email or phone number is required")
    }

    // Find the user by email or phone number
    let user
    if (email) {
      user = await User.findOne({ email })
    } else {
      user = await User.findOne({ phoneNumber })
    }

    // Check if user exists
    if (!user) {
      throw new Error("User not found")
    }

    // Check if the provided password matches the user's hashed password
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      throw new Error("Incorrect password")
    }
    const payload = {
      userId: user._id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      userType: user.userType
    }

    // Generate JWT token
    const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    })

    // Send token in response
    res.status(200).json({ token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//  Verify phone number
async function verifyPhoneNumber(req, res) {
  try {
    const { phoneNumber } = req.body
    console.log("ph in controller", phoneNumber)

    // Send verification SMS
    await sendVerificationSMS(phoneNumber)

    res.status(200).json({ message: "Verification code sent to phone number" })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
module.exports = {
  login: login,
  register: register,
  verifyPhoneNumber: verifyPhoneNumber
}
