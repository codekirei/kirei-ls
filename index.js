'use strict'

// import
//----------------------------------------------------------
const Promise = require('bluebird')
const globContents = require('./lib/globContents')

// jsdoc
function kls(paths) {
  const cwd = process.cwd()
  return Promise.all(
    paths.map(
      path => globContents(cwd, path)
    )
  )
}

// export
//----------------------------------------------------------
module.exports = kls
