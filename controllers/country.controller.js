// const Car = require("../models/carModel")
const Country = require("../models/countryModel")
const { get } = require("mongoose")

async function show(req, res) {
  try {
    const countries = await Country.find()
    res.status(200).json(countries)
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function save(req, res) {
  try {
    console.log("req.body is ", req.body)
    const country = await new Country(req.body)
    await country.save()
    res.status(200).json(country)
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports = {
  show: show,
  save: save
}
