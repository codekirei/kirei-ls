'use strict'

// import
//----------------------------------------------------------
const sep = require('path').sep

// jsdoc
function parseType(type, contentAr) {

  let paths = contentAr
  if (type === 'dirs') paths = paths.map(path => path += sep)
  if (type === 'exes') paths = paths.map(path => path += '*')

  this.out.push(this.heading(type))
  this.out.push(this.parsePaths(type, paths))
}

// export
//----------------------------------------------------------
module.exports = parseType
