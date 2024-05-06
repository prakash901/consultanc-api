const express = require("express")
const userController = require("../controllers/user.controller.js")
const consultationRequestController = require("../controllers/consultationRequest.controller.js")

const router = express.Router()
router.post("/register", userController.register)
router.post("/verifyphone", userController.verifyPhoneNumber)
router.post("/login", userController.login)
router.post(
  "/sendconsultationrequest",
  consultationRequestController.sendConsultationRequest
)

module.exports = router
