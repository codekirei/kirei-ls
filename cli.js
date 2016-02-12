#! /usr/bin/env node

'use strict'

// import
//----------------------------------------------------------
const EOL   = require('os').EOL
const argv  = require('minimist')(process.argv.slice(2))
const co    = require('co')
const merge = require('lodash.merge')

// local
const Output   = require('./lib/output')
const conf     = require('./lib/conf')
const helpText = require('./lib/helpText')
const kls      = require('.')

// jsdoc
function* cli(flags) {

  if (flags.help || flags.h) return helpText

  const contents = flags._.length
    ? yield kls(flags._)
    : yield kls(['./'])

  const _conf = merge({}, yield conf(), flags)

  return new Output(contents, _conf).out.join(EOL)
}

co(cli(argv))
  .then(console.log)
  .catch(err => console.error(err.stack))
