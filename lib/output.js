'use strict'

// jsdoc
function Output(contents, flags) {

  // require and bind methods
  //----------------------------------------------------------
  [ 'colorize'
  , 'heading'
  , 'parseContents'
  , 'parseFlags'
  , 'parsePaths'
  , 'parseType'
  ].forEach(method =>
    this.constructor.prototype[method] = require(`./output-methods/${method}`)
  )

  // bind props
  //----------------------------------------------------------
  this.props = this.parseFlags(flags)

  // build out
  //----------------------------------------------------------
  this.out = []
  contents.forEach(c => this.parseContents(c))
}

// export
//----------------------------------------------------------
module.exports = Output
