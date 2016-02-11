'use strict'

// import
//----------------------------------------------------------
const merge = require('lodash.merge')

// jsdoc
function Output(contents, props) {

  // require and bind methods
  //----------------------------------------------------------
  [ 'colorize'
  , 'heading'
  , 'parseContent'
  , 'parsePaths'
  , 'parseType'
  ].forEach(method =>
    this.constructor.prototype[method] = require(`./output-methods/${method}`)
  )

  // bind props
  //----------------------------------------------------------
  this.props = merge(
    { colors:
      { headings: 'red'
      , symbols: 'white'
      , dirs: 'blue'
      , files: 'white'
      , exes: 'green'
      }
    }
    , props
  )

  // build out
  //----------------------------------------------------------
  this.out = []
  contents.forEach(c => this.parseContent(c))
}

// export
//----------------------------------------------------------
module.exports = Output
