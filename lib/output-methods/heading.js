'use strict'

// import
//----------------------------------------------------------
const EOL  = require('os').EOL

// jsdoc
function heading(type) {

  const headings =
    { dirs: 'Directories'
    , files: 'Files'
    , exes: 'Executables'
    , symlinks: 'Symlinks'
    }

  return this.props.headings !== false
    ? this.props.colors !== false
      ? EOL + this.colorize(headings[type], this.props.colors.headings)
      : EOL + headings[type]
    : ''
}

// export
//----------------------------------------------------------
module.exports = heading
