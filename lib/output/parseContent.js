'use strict'

// import
//----------------------------------------------------------
const parseType = require('./parseType')

// jsdoc
function parseContents(content, opts) {

  const types = ['dirs', 'files', 'exes', 'symlinks']
  types.forEach(
    type => {
      if (content[type].length) parseType(type, content[type])
    }
  )
}

// export
//----------------------------------------------------------
module.exports = parseContents
