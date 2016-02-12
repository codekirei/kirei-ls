'use strict'

// import
//----------------------------------------------------------
const merge = require('lodash.merge')
const sep = require('path').sep
const colorize = require('./colorize')
const parseFlags = require('./parseFlags')

// jsdoc
function output(contents, flags) {

  // parse flags
  //----------------------------------------------------------
  const opts = parseFlags(flags)

  // parse contents (opts.relative)
  //----------------------------------------------------------
  let out = { files: {}, dirs: {}, exes: {}, symlinks: {} }
  const parseContent = contents.length === 1 && opts.relative
    ? ob => out = merge(out, ob.contents)
    : ob => console.log('TODO') // TODO
  contents.forEach(parseContent)

  // add symbols (opts.symbols)
  //----------------------------------------------------------
  if (opts.symbols) {

    const dirs = Object.keys(out.dirs)
    if (dirs.length) dirs.forEach(k => {
      out.dirs[k + sep] = out.dirs[k]
      delete out.dirs[k]
    })

    const exes = Object.keys(out.exes)
    if (exes.length) exes.forEach(k => {
      out.exes[k + '*'] = out.exes[k]
      delete out.exes[k]
    })
  }

  // build colorMap (opts.colors)
  //----------------------------------------------------------
  let colorMap = {}
  if (opts.colors) {

    // TODO: optimize this to not include extra color close escape codes;
    //   you really only need it at the very end

    // colorize types
    ['files', 'dirs', 'exes', 'symlinks'].forEach(type => {
      const keys = Object.keys(out[type])
      if (keys.length) keys.forEach(k => {
        let colorStr = colorize(k, opts.colors[type])
        if (type === 'dirs') colorStr = replace(colorStr, type, sep)
        if (type === 'exes') colorStr = replace(colorStr, type, '\\*', '*')
        colorMap[k] = colorStr
      })
    })

    // colorize symbols
    function replace(str, type, regex, symbol) {
      return str.replace(
        new RegExp(regex, 'g')
        , colorize(
            symbol ? symbol : regex
            , opts.colors.symbols
            , opts.colors[type]
          )
      )
    }
  }
  console.log(colorMap)

  // const out = []
  // contents.forEach(content => parseContent(content, opts))
  // return out
}

// export
//----------------------------------------------------------
module.exports = output
