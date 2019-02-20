'use strict'

const fs = require('fs')
const path = require('path')
const EasyGraphQLLoadTester = require('easygraphql-load-tester')
const isEmpty = require('lodash.isempty')

let args = require('./args.json')

if (!isEmpty(args)) {
  args = JSON.parse(args)
}

const schema = fs.readFileSync(path.join(__dirname, 'schema.gql'), 'utf8')

const easyGraphQLLoadTester = new EasyGraphQLLoadTester(schema, args)

const testCases = easyGraphQLLoadTester.artillery()

module.exports = {
  testCases
}
