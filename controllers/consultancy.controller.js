const Consultancy = require("../models/consultancyModel")

async function show(req, res) {
  try {
    const { universities, courses, countries, district, page, limit } = req.body
    let filter = {}

    const pageNumber = page || 1
    const limitPerPage = limit || 10
    const skip = (pageNumber - 1) * limitPerPage

    const totalCount = await Consultancy.countDocuments(filter)

    // Check if universities array is provided in the request body
    if (universities) {
      filter.universities = { $all: universities }
    }

    // Check if courses array is provided in the request body
    if (courses) {
      filter.courses = { $all: courses }
    }

    // Check if countries array is provided in the request body
    if (countries) {
      filter.countries = { $all: countries }
    }

    if (district) {
      filter["address.district"] = { $in: district }
    }

    const consultancies = await Consultancy.find(filter)
      .skip(skip)
      .limit(limitPerPage)
      .populate("countries") // Populate the countries field
      .populate("universities") // Populate the universities field
      .populate("courses") // Populate the courses field

    const totalPages = Math.ceil(totalCount / limitPerPage)

    const metadata = {
      totalCount: totalCount,
      totalPages: totalPages
    }

    if (consultancies.length === 0) {
      return res.status(404).json({
        error: "No consultancies found "
      })
    }

    res.status(200).json({ metadata: metadata, data: consultancies })
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function save(req, res) {
  try {
    const consultancy = new Consultancy(req.body)
    await consultancy.save()
    res.status(200).json(consultancy)
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports = {
  show: show,
  save: save
}
