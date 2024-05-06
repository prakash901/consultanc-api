const User = require("../models/userModel")

exports.CheckRole = (...roles) => {
  return async (req, res, next) => {
    const { userId } = req.userData
    console.log("userId from the request at middleware", userId)
    try {
      const user = await User.findOne({ userId })
      console.log("user.role", user.userType)

      if (!roles.includes(user?.userType)) {
        // return next(
        return res.status(403).json({
          message:
            "Unauthorized user, you donot have permission to perform this task"
        })
        // )
      }
      next()
    } catch (error) {
      return res.status(500).json({
        message: "Error retriving the user data",
        error: error.message
      })
    }
  }
}
