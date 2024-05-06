// const Car = require("../models/carModel")
const Course = require("../models/courseModel")

async function show(req, res) {
  try {
    const courses = await Course.find()
    res.status(200).json(courses)
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function save(req, res) {
  try {
    const course = await new Course(req.body)
    await course.save()
    res.status(200).json(course)
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports = {
  show: show,
  save: save
}
