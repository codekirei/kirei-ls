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
  this.columnize = (ar) =>
    columnize(ar, {maxRowLen: process.stdout.columns}).strs.join(EOL)

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

  // prep paths
  //----------------------------------------------------------
  let paths = contentAr.map(path => path.slice(len))
  if (type === 'dirs') paths = paths.map(path => path += sep)
  if (type === 'exes') paths = paths.map(path => path += '*')

  // push heading
  //----------------------------------------------------------
  this.out.push(this.heading(type))

  // push columns
  //----------------------------------------------------------
  let columns = this.columnize(paths)
  if (type === 'dirs') {
    const whiteSep = `${ansi.white.open}${sep}${this.color[type].open}`
    columns = columns.replace(new RegExp(sep, 'g'), whiteSep)
  }
  if (type === 'exes') {
    const whiteStar = `${ansi.white.open}*${this.color[type].open}`
    columns = columns.replace(/\*/g , whiteStar)
  }
  this.out.push(this.color[type].open + columns + this.color[type].close)
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

// export
//----------------------------------------------------------
module.exports = Format
