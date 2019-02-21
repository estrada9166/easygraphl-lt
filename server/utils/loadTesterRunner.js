'use strict'

const fs = require('fs')
const { spawn, exec } = require('child_process')
const moment = require('moment')

const socketIO = require('../socketIO').connection()

const startLoadTesting = (url, duration, arrivalRate, queryArguments) => {
  exec(`npx get-graphql-schema ${url} > utils/schema.gql`, (err) => {
    if (err) {
      socketIO.sendEvent('load-tester-error', 'There was an error running the load tester, check the logs')
      console.log('Error:', err.message)
    }

    runLoadTesting(url, duration, arrivalRate, queryArguments)
  })
}

const runLoadTesting = (url, duration, arrivalRate, queryArguments) => {
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
      `../files-results/${date}.json`,
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
      console.log(`Finish with code ${code}`)
      deleteArgsFile('./utils/args.json')
      deleteArgsFile('./utils/schema.gql')
    })
  })
}

const deleteArgsFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log('Error: ', err)
    };
  })
}

module.exports = startLoadTesting
