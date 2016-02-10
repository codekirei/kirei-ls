'use strict'

// jsdoc
function parseContent(content) {

  const types = ['dirs', 'files', 'exes', 'symlinks']

  types.forEach(
    type => {
      if (content[type].length) {
        this.parseType(type, content[type], content.cwd.length + 1)
      }
    }
  )
}

// export
//----------------------------------------------------------
module.exports = parseContent
