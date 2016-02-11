'use strict'

// import
//----------------------------------------------------------
const EOL       = require('os').EOL
const columnize = require('columnize-array')
const sep       = require('path').sep

// jsdoc
function columns(type, paths) {

  // build str from paths
  //----------------------------------------------------------
  const strFromPaths =
    this.props.columns !== false
      ? columnize(
          paths
        , { maxRowLen: process.stdout.columns }
        ).strs.join(EOL)
      : paths.join(EOL)

  // this.props.colors ? add color to cols
  //----------------------------------------------------------
  if (this.props.colors !== false) {

    const colorStr = this.colorize(strFromPaths, this.props.colors[type])

    const hasSymbol = (regex, symbol) =>
      colorStr.replace(
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
      default    : return colorStr
    }
  }

  // else return cols
  //----------------------------------------------------------
  return strFromPaths
}

// export
//----------------------------------------------------------
module.exports = columns
