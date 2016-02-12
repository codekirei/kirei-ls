'use strict'

// import
//----------------------------------------------------------
const ansi = require('ansi-styles')

// jsdoc
function colorize(str, color, next) {
  return ansi[color].open
    + str
    + (next ? ansi[next].open : ansi[color].close)
}

// export
//----------------------------------------------------------
module.exports = colorize
