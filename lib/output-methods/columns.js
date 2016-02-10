'use strict'

// import
//----------------------------------------------------------
const EOL       = require('os').EOL
const columnize = require('columnize-array')
const sep       = require('path').sep

// jsdoc
function columns(type, paths) {

  // build columns
  //----------------------------------------------------------
  const opts =
    { maxRowLen: process.stdout.columns
    }
  const cols = columnize(paths, opts).strs.join(EOL)

  // this.props.colors ? add color to cols
  //----------------------------------------------------------
  if (this.props.colors !== false) {

    const colorCols = this.colorize(cols, this.props.colors[type])

    const hasSymbol = (regex, symbol) =>
      colorCols.replace(
        new RegExp(regex, 'g')
      , this.colorize(
          symbol ? symbol : regex
          , this.props.colors.symbols
          , this.props.colors[type]
        )
      )

    switch (type) {
      case 'dirs': return hasSymbol(sep)
      case 'exes': return hasSymbol('\\*', '*')
      default    : return colorCols
    }
  }

  // else return cols
  //----------------------------------------------------------
  return cols
}

// export
//----------------------------------------------------------
module.exports = columns
