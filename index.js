'use strict'

// import
//----------------------------------------------------------
const Promise = require('bluebird')
const globContents = require('./lib/globContents')

// jsdoc
function kls(paths) {
  return Promise.all(
    paths.map(
      path => globContents(path)
    )
  )
}

// export
//----------------------------------------------------------
module.exports = kls
