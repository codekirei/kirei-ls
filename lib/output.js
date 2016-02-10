'use strict'

// import
//----------------------------------------------------------
const ansi = require('ansi-styles')

// jsdoc
function Output(contents, conf) {

  // require and bind methods
  //----------------------------------------------------------
  [ 'columns'
  , 'heading'
  , 'parseContent'
  , 'parseType'
  ].forEach(method =>
    this.constructor.prototype[method] = require(`./output-methods/${method}`)
  )

  this.conf = conf
  this.out = []
  this.color =
    { heading: ansi.red
    , dirs: ansi.blue
    , files: ansi.white
    , exes: ansi.green
    }

  contents.forEach(c => this.parseContent(c))
}

// export
//----------------------------------------------------------
module.exports = Output
