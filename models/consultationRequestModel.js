const mongoose = require("mongoose")

// Define the schema for consultation request
const consultationRequestSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User model for student ID
    interestedConsultancies: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Consultancy" }
    ],
    interestedCities: [{ type: mongoose.Schema.Types.ObjectId, ref: "City" }],
    interestedUniversities: [
      { type: mongoose.Schema.Types.ObjectId, ref: "University" }
    ],
    interestedCourses: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Course" }
    ],
    interestedCountries: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Country" }
    ],
    address: {
      city: String,
      district: String
    }
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
)

// Create ConsultationRequest model
const ConsultationRequest = mongoose.model(
  "ConsultationRequest",
  consultationRequestSchema
)

module.exports = ConsultationRequest
