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
    , dir: ansi.blue
    , file: ansi.white
    , exes: ansi.green
    }
  this.columnize = (ar) =>
    columnize(ar, {maxRowLen: process.stdout.columns}).strs.join(EOL)

  contents.forEach(c => this.parseContent(c))
}

Format.prototype.parseContent = function(content) {
  const len = content.cwd.length + 1
  if (content.dirs.length) this.parseDirs(content.dirs, len)
  if (content.files.length) this.parseFiles(content.files, len)
  if (content.exes.length) this.parseExes(content.exes, len)
  if (content.symlinks.length) this.parseSymlinks(content.symlinks, len)
}

Format.prototype.parseDirs = function(dirs, len) {
  const relDirs = dirs.map(dir => `${dir.slice(len)}${sep}`)
  const whiteSep = `${ansi.white.open}${sep}${this.color.dir.open}`
  this.out.push('')
  this.heading('Folders')
  this.out.push(
    this.color.dir.open
  + this.columnize(relDirs)
      .replace(new RegExp(sep, 'g'), whiteSep)
  + this.color.dir.close
  )
}

Format.prototype.parseFiles = function(files, len) {
  const relFiles = files.map(file => file.slice(len))
  this.out.push('')
  this.heading('Files')
  this.out.push(
    this.color.file.open
  + this.columnize(relFiles)
  + this.color.file.close
  )
}

Format.prototype.parseExes = function(exes, len) {
  const relExes = exes.map(exe => `${exe.slice(len)}*`)
  const whiteStar = `${ansi.white.open}*${this.color.exes.open}`
  this.out.push('')
  this.heading('Executables')
  this.out.push(
    this.color.exes.open
  + this.columnize(relExes)
      .replace(/\*/g, whiteStar)
  + this.color.exes.close
  )
}

Format.prototype.parseSymlinks = function(symlinks) {
}

Format.prototype.heading = function(str) {
  if (this.conf.headings !== false) {
    this.out.push(`${this.color.heading.open}${str}${this.color.heading.close}`)
  }
}

// export
//----------------------------------------------------------
module.exports = Format
