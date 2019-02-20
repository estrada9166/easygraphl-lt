'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const http = require('http').Server(app)
const socketIO = require('./socketIO')

socketIO.connect(http)

const loadTester = require('./controllers/loadTesting')

app.set('port', 8000)

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const apiRoutes = express.Router()
app.use('/api', apiRoutes)

apiRoutes.post('/', loadTester.loadTesting)

const server = http.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`)
})

module.exports = server
