#! /usr/bin/env node

'use strict'

// import
//----------------------------------------------------------
const argv  = require('minimist')(process.argv.slice(2))
const co    = require('co')
const merge = require('lodash.merge')

// local
const conf     = require('./lib/conf')
const helpText = require('./lib/helpText')
const kls      = require('.')
const output   = require('./lib/output')

// jsdoc
function* cli(flags) {

  if (flags.help || flags.h) return helpText

  const contents = flags._.length
    ? yield kls(flags._)
    : yield kls(['./'])

  const _conf = merge({}, yield conf(), flags)

  return output(contents, _conf)
}

co(cli(argv))
  .then(console.log)
  .catch(err => console.error(err.stack))
