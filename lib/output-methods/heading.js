'use strict'

// import
//----------------------------------------------------------
const EOL = require('os').EOL

// jsdoc
function heading(type) {

  const headings =
    { dirs: 'Directories'
    , files: 'Files'
    , exes: 'Executables'
    , symlinks: 'Symlinks'
    }

  return this.conf.headings !== false
    ? EOL + this.color.heading.open + headings[type] + this.color.heading.close
    : ''
}

// export
//----------------------------------------------------------
module.exports = heading
