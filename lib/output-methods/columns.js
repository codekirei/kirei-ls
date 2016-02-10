'use strict'

// import
//----------------------------------------------------------
const EOL       = require('os').EOL
const ansi      = require('ansi-styles')
const columnize = require('columnize-array')
const sep       = require('path').sep

// jsdoc
function columns(type, paths) {

  // columnize columns
  //----------------------------------------------------------
  const opts =
    { maxRowLen: process.stdout.columns
    }
  let cols = columnize(paths, opts).strs.join(EOL)

  // decolorize symbols
  //----------------------------------------------------------
  const white = ch => ansi.white.open + ch + this.color[type].open
  if (type === 'dirs') {
    cols = cols.replace(new RegExp(sep, 'g'), white(sep))
  }
  if (type === 'exes') {
    cols = cols.replace(/\*/g, white('*'))
  }

  // colorize and return cols
  //----------------------------------------------------------
  return this.color[type].open + cols + this.color[type].close
}

// export
//----------------------------------------------------------
module.exports = columns
