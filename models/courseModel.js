const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema(
  {
    name: String,
    fee: Number,
    description: String,
    level: String
  },

  { timestamps: true }
)

const Course = mongoose.model("Course", courseSchema)

module.exports = Course
