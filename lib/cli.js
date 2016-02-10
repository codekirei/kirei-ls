'use strict'

// import
//----------------------------------------------------------
const co = require('co')
const merge = require('lodash.merge')

const kls = require('..')
const helpText = require('./helpText')
const parseConf = require('./parseConf')
const format = require('./format')

// jsdoc
function* cli(configPath, flags) {

  if (flags.help || flags.h) return helpText

  const contents = flags._.length
    ? yield kls(flags._)
    : yield kls('./')

  const conf = configPath
    ? merge(yield parseConf(configPath), flags)
    : flags

  return format(contents, conf)
}

// export
//----------------------------------------------------------
module.exports = co.wrap(cli)
