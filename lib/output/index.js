'use strict'

// import
//----------------------------------------------------------
const merge = require('lodash.merge')
const sep = require('path').sep
const colorize = require('./colorize')
const parseFlags = require('./parseFlags')
const sort = require('./sort')

// jsdoc
function output(contents, flags) {

  // setup initial vars
  //----------------------------------------------------------
  const types = ['files', 'dirs', 'exes', 'symlinks']
  let out = types.reduce((a, b) => Object.assign(a, a[b] = {}), {})

  // parse flags
  //----------------------------------------------------------
  const opts = parseFlags(flags)

  // parse contents (opts.relative)
  //----------------------------------------------------------
  const parseContent = contents.length === 1 && opts.relative
    ? ob => out = merge(out, ob.contents)
    : ob => console.log('TODO') // TODO
  contents.forEach(parseContent)
  console.log(out.files)

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
    types.forEach(type => {
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
  // console.log(colorMap)

  // combine types (opts.types)
  //----------------------------------------------------------
  if (!opts.types) out = types.reduce((a, b) => Object.assign(a, out[b]), {})

  // sort and add detail (opts.sort, opts.detail)
  //----------------------------------------------------------
  if (opts.sort) out = sort[opts.sort](out, opts.detail, opts.types)

  // columnize (opts.columns)
  //----------------------------------------------------------

  // add headers (opts.types, opts.colors)
  //----------------------------------------------------------

  // return array of lines (opts.colors)
  //----------------------------------------------------------

}

// export
//----------------------------------------------------------
module.exports = output
