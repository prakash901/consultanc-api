const mongoose = require("mongoose")

const consultancySchema = new mongoose.Schema(
  {
    name: String,
    phoneNumber: String,
    description: String,
    countries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Country"
      }
    ],
    universities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "University"
      }
    ],
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
      }
    ],
    pan: {
      panNumber: String,
      verifiedStatus: {
        type: String,
        enum: ["verified", "rejected", "pending"]
      }
    },
    address: {
      city: String,
      district: String
    }
  },
  { timestamps: true }
)

const Consultancy = mongoose.model("Consultancy", consultancySchema)

module.exports = Consultancy
