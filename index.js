'use strict'

// import
//----------------------------------------------------------
const Promise = require('bluebird')
const globContents = require('./lib/globContents')

// jsdoc
function kls(paths) {
  const cwd = process.cwd()
  const proms = paths.map(path => globContents(cwd, path))
  return Promise.all(proms)
}

// export
//----------------------------------------------------------
module.exports = kls
