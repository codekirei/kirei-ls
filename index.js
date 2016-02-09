'use strict'

// import
//----------------------------------------------------------
const p = require('path')
const columnize = require('columnize-array')
const merge = require('lodash.merge')
const co = require('co')
const isexe = require('isexe')
const freeze = require('deep-freeze')

const globContents = require('./lib/globContents')

// jsdoc
function kls(env, flags) {

  const cwd = process.cwd()

  // globContents(flags._[0], cwd).then(res => console.log(res))
  return globContents(flags._[0], cwd)
}

// export
//----------------------------------------------------------
module.exports = kls
