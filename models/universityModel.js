const mongoose = require("mongoose")

const universitySchema = new mongoose.Schema(
  {
    name: String,
    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country"
    },
    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City"
    },
    description: String
  },
  { timestamps: true }
)

const University = mongoose.model("University", universitySchema)

module.exports = University
