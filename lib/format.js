'use strict'

// import
//----------------------------------------------------------
const columnize = require('columnize-array')
const EOL = require('os').EOL
const sep = require('path').sep
const ansi = require('ansi-styles')

// jsdoc
function Format(contents, conf) {
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

Format.prototype.parseContent = function(content) {
  const types = ['dirs', 'files', 'exes', 'symlinks']
  types.forEach(type => {
    if (content[type].length) {
      this.parseType(type, content[type], content.cwd.length + 1)
    }
  })
}

Format.prototype.parseType = function(type, contentAr, len) {

  let paths = contentAr.map(path => path.slice(len))
  if (type === 'dirs') paths = paths.map(path => path += sep)
  if (type === 'exes') paths = paths.map(path => path += '*')

  this.out.push(this.heading(type))
  this.out.push(this.columns(type, paths))
}

Format.prototype.heading = function(type) {
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

Format.prototype.columns = function(type, paths) {

  // columnize columns
  //----------------------------------------------------------
  const opts =
    { maxRowLen: process.stdout.columns
    }
  let columns = columnize(paths, opts).strs.join(EOL)

  // decolorize symbols
  //----------------------------------------------------------
  const white = ch => ansi.white.open + ch + this.color[type].open
  if (type === 'dirs') {
    columns = columns.replace(new RegExp(sep, 'g'), white(sep))
  }
  if (type === 'exes') {
    columns = columns.replace(/\*/g, white('*'))
  }

  // colorize and return columns
  //----------------------------------------------------------
  return this.color[type].open + columns + this.color[type].close
}

// export
//----------------------------------------------------------
module.exports = Format
