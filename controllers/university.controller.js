const University = require("../models/universityModel")

async function show(req, res) {
  try {
    const universities = await University.find()
      .populate("countryId")
      .populate("cityId")
    res.status(200).json(universities)
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function save(req, res) {
  try {
    const university = new University(req.body)
    await university.save()
    res.status(200).json(university)
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports = {
  show: show,
  save: save
}
