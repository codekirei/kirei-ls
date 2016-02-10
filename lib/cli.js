'use strict'

// import
//----------------------------------------------------------
const EOL = require('os').EOL
const co = require('co')
const merge = require('lodash.merge')

// local
const kls = require('..')
const Format = require('./format')
const helpText = require('./helpText')
const conf = require('./conf')

// jsdoc
function* cli(flags) {

  if (flags.help || flags.h) return helpText

  const contents = flags._.length
    ? yield kls(flags._)
    : yield kls(['./'])

  const _conf = merge(yield conf(), flags)

  return new Format(contents, _conf).out.join(EOL)
}

// export
//----------------------------------------------------------
module.exports = co.wrap(cli)
