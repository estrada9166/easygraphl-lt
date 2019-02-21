'use strict'

const fs = require('fs')
const { spawn, exec } = require('child_process')
const moment = require('moment')

const loadTesting = (req, res) => {
  try {
    const { url, duration = 5, arrivalRate = 10, queryArguments = {} } = req.body

    const socketIO = require('../socketIO').connection()

    exec(`npx get-graphql-schema ${url} > utils/schema.gql`, (err) => {
      if (err) {
        socketIO.sendEvent('load-tester-error', 'There was an error running the load tester, check the logs')
        console.log('Error:', err.message)
      }

      runLoadTesting(socketIO, url, duration, arrivalRate, queryArguments)
    })

    res.json({ success: true })
  } catch (err) {
    res.status(400).send({ success: false, error: err.message })
  }
}

function runLoadTesting(socketIO, url, duration, arrivalRate, queryArguments) {
  const date = moment().format('YYYYMMDDHHMMSS').toString()
  fs.writeFile('./utils/args.json', JSON.stringify(queryArguments), (err) => {
    if (err) {
      socketIO.sendEvent('load-tester-error', 'There was an error running the load tester, check the logs')
      console.log('Error:', err)
    }

    const artilleryRun = spawn('../node_modules/.bin/artillery', [
      'run',
      '--target',
      `${url}`,
      '--overrides',
      `'{"config": {"phases": [{"duration": ${duration}, "arrivalRate": ${arrivalRate}}]}}'`,
      '--output',
      `files/${date}.json`,
      'artillery.yml'
    ], {
      shell: true,
      cwd: './utils'
    })

    artilleryRun.stdout.on('data', (data) => {
      socketIO.sendEvent('load-test', data.toString())
    })

    artilleryRun.stderr.on('data', (data) => {
      socketIO.sendEvent('load-tester-error', 'There was an error running the load tester, check the logs')
      console.log('Error:', data.toString())
    })

    artilleryRun.on('exit', (code) => {
      socketIO.sendEvent('finish', `Finish with code ${code}`)
      console.log(`Child exited with code ${code}`)
      deleteArgsFile('./utils/args.json')
      deleteArgsFile('./utils/schema.gql')
    })
  })
}

function deleteArgsFile (filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log('Error: ', err)
    };
  })
}

module.exports = { loadTesting }
