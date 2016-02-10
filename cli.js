#! /usr/bin/env node

'use strict'

const flags = require('minimist')(process.argv.slice(2))
const cli = require('./lib/cli')

cli(flags)
  .then(console.log)
  .catch(err => console.error(err.stack))
