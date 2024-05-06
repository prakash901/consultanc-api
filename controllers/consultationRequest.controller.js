const mongoose = require("mongoose")

const ConsultationRequest = require("../models/ConsultationRequestModel")
const User = require("../models/userModel")
// Function to validate entities by checking if the provided IDs exist
async function validateEntities(entityIds, model) {
  if (!entityIds || !entityIds.length) {
    return true // No entities provided, considered valid
  }
  try {
    const entities = await mongoose
      .model(model)
      .find({ _id: { $in: entityIds } })
    console.log("entities", entities)
    const validEntityIds = entities.map((entity) => entity._id.toString())
    return validEntityIds.length === entityIds.length // All provided IDs exist
  } catch (error) {
    console.error("Error validating entities:", error)
    return false // Error occurred or some IDs are invalid
  }
}

async function sendConsultationRequest(req, res) {
  try {
    const {
      student,
      interestedConsultancies,
      interestedCities,
      interestedUniversities,
      interestedCourses,
      interestedCountries,
      address
    } = req.body
    console.log("interestedConsultancies", interestedConsultancies)
    // Check if the student ID exists
    const existingStudent = await User.findById(student)
    if (!existingStudent) {
      return res.status(404).json({ error: "Student not found" })
    }

    // Validate interested consultancies
    const validConsultancies = await validateEntities(
      interestedConsultancies,
      "Consultancy"
    )
    if (!validConsultancies) {
      return res.status(400).json({ error: "Invalid consultancies provided" })
    }

    // Validate interested countries
    const validCountries = await validateEntities(
      interestedCountries,
      "Country"
    )
    if (!validCountries) {
      return res.status(400).json({ error: "Invalid countries provided" })
    }

    // Validate interested cities
    const validCities = await validateEntities(interestedCities, "City")
    if (!validCities) {
      return res.status(400).json({ error: "Invalid cities provided" })
    }

    // Validate interested universities
    const validUniversities = await validateEntities(
      interestedUniversities,
      "University"
    )
    if (!validUniversities) {
      return res.status(400).json({ error: "Invalid universities provided" })
    }

    // Validate interested courses
    const validCourses = await validateEntities(interestedCourses, "Course")
    if (!validCourses) {
      return res.status(400).json({ error: "Invalid courses provided" })
    }

    // Create the consultation request
    const consultationRequest = new ConsultationRequest({
      student,
      interestedConsultancies,
      interestedCities,
      interestedUniversities,
      interestedCourses,
      interestedCountries,
      address
    })
    await consultationRequest.save()

    res.status(201).json({ message: "Consultation request sent successfully" })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

async function getConsultationRequests(req, res) {
  try {
    // Fetch all consultation requests
    const consultationRequests = await ConsultationRequest.find()
      .populate({
        path: "student",
        select: "-password" // Exclude the password field
      }) // Populate the student field to get user details
      .populate("interestedConsultancies") // Populate the interested consultancies
      .populate("interestedCities") // Populate the interested cities
      .populate("interestedUniversities") // Populate the interested universities
      .populate("interestedCourses") // Populate the interested courses
      .populate("interestedCountries") // Populate the interested countries

    res.status(200).json(consultationRequests)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

async function getConsultationRequestsByConsultancyId(req, res) {
  try {
    const { consultancyId } = req.body
    console.log("consultancyId", consultancyId)
    // Fetch consultation requests made to the specified consultancy
    const consultationRequests = await ConsultationRequest.find({
      interestedConsultancies: consultancyId
    })
      .populate({
        path: "student",
        select: "-password" // Exclude the password field
      }) // Populate the student field to get user details
      .populate("interestedCities")
      .populate("interestedUniversities")
      .populate("interestedCourses")
      .populate("interestedCountries")
      .select("-interestedConsultancies") // Exclude interestedConsultancies field

    res.status(200).json(consultationRequests)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
module.exports = {
  sendConsultationRequest,
  getConsultationRequests,
  getConsultationRequestsByConsultancyId
}
