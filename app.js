const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    credentials: true
  })
)
app.use(cors({ origin: "*" }))

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

app.use(bodyParser.json())
app.use("/api/admin", require("./routes/adminRoutes"))
app.use("/api/user", require("./routes/userRoutes"))
app.use("/api/consultancy", require("./routes/consultancyRoutes"))
app.get("/*", (req, res) => res.send("welcome to consultancy finder"))

module.exports = app
