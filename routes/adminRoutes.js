const express = require("express")
const countryController = require("../controllers/country.controller.js")
const cityController = require("../controllers/city.controller.js")
const universityController = require("../controllers/university.controller.js")
const courseController = require("../controllers/course.controller.js")
const consultancyController = require("../controllers/consultancy.controller.js")
const consultationRequestController = require("../controllers/consultationRequest.controller.js")
const verifyTokenMiddleware = require("../middleware/verifyToken.js")
const { CheckRole } = require("../middleware/CheckRole.js")

const router = express.Router()
router.post(
  "/addcountry",
  // verifyTokenMiddleware.verifyToken,
  // CheckRole("admin"),
  countryController.save
)
router.get(
  "/getcountries",
  // verifyTokenMiddleware.verifyToken,
  // CheckRole("admin"),
  countryController.show
)
router.post(
  "/addcity",
  // verifyTokenMiddleware.verifyToken,
  // CheckRole("admin"),
  cityController.save
)
router.get(
  "/getcities",
  // verifyTokenMiddleware.verifyToken,
  // CheckRole("admin"),
  cityController.show
)
router.post(
  "/adduniversity",
  // verifyTokenMiddleware.verifyToken,
  // CheckRole("admin"),
  universityController.save
)
router.get(
  "/getuniversities",
  // verifyTokenMiddleware.verifyToken,
  // CheckRole("admin"),
  universityController.show
)
router.post(
  "/addcourse",
  // verifyTokenMiddleware.verifyToken,
  // CheckRole("admin"),
  courseController.save
)
router.get(
  "/getcourses",
  // verifyTokenMiddleware.verifyToken,
  // CheckRole("admin"),
  courseController.show
)
router.post(
  "/addconsultancy",
  // verifyTokenMiddleware.verifyToken,
  // CheckRole("admin"),
  consultancyController.save
)
router.post(
  "/getconsultancies",
  // verifyTokenMiddleware.verifyToken,
  // CheckRole("admin"),
  consultancyController.show
)
router.get(
  "/getconsultationrequests",
  consultationRequestController.getConsultationRequests
)
module.exports = router
