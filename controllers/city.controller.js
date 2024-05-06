// const Car = require("../models/carModel")
const City = require("../models/cityModel")
const { get } = require("mongoose")

async function show(req, res) {
  try {
    const cities = await City.find()
    res.status(200).json(cities)
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function save(req, res) {
  try {
    console.log("req.body is ", req.body)
    const city = new City(req.body)
    await city.save()
    res.status(200).json(city)
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports = {
  show: show,
  save: save
}
