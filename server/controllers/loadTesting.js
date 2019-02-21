'use strict'

const startLoadTesting = require('../utils/loadTesterRunner')

const loadTesting = (req, res) => {
  try {
    const { url, duration = 5, arrivalRate = 10, queryArguments = {} } = req.body

    startLoadTesting(url, duration, arrivalRate, queryArguments)

    res.json({ success: true })
  } catch (err) {
    res.status(400).send({ success: false, error: err.message })
  }
}

module.exports = { loadTesting }
