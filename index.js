'use strict'

// import
//----------------------------------------------------------
const Promise = require('bluebird')
const columnize = require('columnize-array')
const fs = require('fs')
const merge = require('lodash.merge')

// jsdoc
const read = Promise.promisify(fs.readdir)

// jsdoc
function kls(env, flags) {

  // read dir
  //----------------------------------------------------------
  return read(flags._[0])
}

// export
//----------------------------------------------------------
module.exports = kls
