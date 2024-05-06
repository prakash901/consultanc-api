const express = require("express")
const userController = require("../controllers/user.controller.js")
const consultationRequestController = require("../controllers/consultationRequest.controller.js")

const router = express.Router()
router.get(
  "/getrequestsbyconsultancyid",
  consultationRequestController.getConsultationRequestsByConsultancyId
)

module.exports = router
