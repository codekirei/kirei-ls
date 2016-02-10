'use strict'

// import
//----------------------------------------------------------
const co = require('co')
const merge = require('lodash.merge')

const kls = require('..')
const format = require('./format')
const helpText = require('./helpText')
const conf = require('./conf')

// jsdoc
function* cli(flags) {

  if (flags.help || flags.h) return helpText

  const contents = flags._.length
    ? yield kls(flags._)
    : yield kls(['./'])

  return format(contents, merge(yield conf(), flags))
}

// export
//----------------------------------------------------------
module.exports = co.wrap(cli)
