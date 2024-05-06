// const twilio = require("twilio")

// // Twilio credentials
// const accountSid = process.env.TWILIO_ACCOUNT_SID
// const authToken = process.env.TWILIO_AUTH_TOKEN
// const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER

// // Create Twilio client
// const client = twilio(accountSid, authToken)

// async function sendVerificationSMS(phoneNumber) {
//   console.log("ph in func", phoneNumber)
//   console.log("a", accountSid)
//   console.log("authToken", authToken)
//   console.log("twilioPhoneNumber", twilioPhoneNumber)
//   try {
//     // Generate random verification code
//     const verificationCode = Math.floor(100000 + Math.random() * 900000)
//     console.log("client", client)
//     // Send SMS with verification code
//     const message = await client.messages.create({
//       body: `Your verification code for consultancy finder is: ${verificationCode}`,
//       to: phoneNumber,
//       from: twilioPhoneNumber
//     })

//     // You can save the verification code in the database for later verification
//     console.log("Twilio Response:", message)
//     console.log("Twilio Response sid:", message.sid)
//     return verificationCode
//   } catch (error) {
//     throw new Error("Failed to send verification SMS", error)
//   }
// }

// module.exports = {
//   sendVerificationSMS
// }

const twilio = require("twilio")

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER

// Create Twilio client
const client = twilio(accountSid, authToken)
async function sendVerificationSMS(phoneNumber) {
  console.log("ph in func", phoneNumber)
  console.log("a", accountSid)
  console.log("authToken", authToken)
  console.log("twilioPhoneNumber", twilioPhoneNumber)
  try {
    // Generate random verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000)
    console.log("client", client)
    // Send SMS with verification code
    const message = await client.messages.create({
      body: `Your verification code for consultancy finder is: ${verificationCode}`,
      to: phoneNumber,
      from: twilioPhoneNumber
    })

    // You can save the verification code in the database for later verification
    console.log("Twilio Response:", message)
    console.log("Twilio Response sid:", message.sid)
    return verificationCode
  } catch (error) {
    // Access the specific error message
    const errorMessage = error.message || "Unknown error"
    console.error("Failed to send verification SMS:", errorMessage)
    throw new Error("Failed to send verification SMS", error) // Re-throw for further handling
  }
}

module.exports = {
  sendVerificationSMS
}
