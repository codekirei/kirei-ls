'use strict'

// jsdoc
function parseContent(content) {

  const types = ['dirs', 'files', 'exes', 'symlinks']
  const first = types.map(s => s.slice(0, 1))
  const test = str => this.props[str]
  const filter = types.concat(first).some(test)

  types.forEach(
    type => {
      const requested = () => this.props[type] || this.props[type.slice(0, 1)]
      if (content[type].length) {
        if (filter && requested() || !filter) {
          this.parseType(type, content[type], content.cwd.length + 1)
        }
      }
    }
  )
}

// export
//----------------------------------------------------------
module.exports = parseContent
