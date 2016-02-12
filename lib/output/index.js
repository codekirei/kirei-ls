'use strict'

// import
//----------------------------------------------------------
const merge = require('lodash.merge')
const sep = require('path').sep
const parseFlags   = require('./parseFlags')

// jsdoc
function output(contents, flags) {

  // console.log(contents)
  const opts = parseFlags(flags)
  // console.log(opts)

  let out =
    { files: {}
    , dirs: {}
    , exes: {}
    , symlinks: {}
    }
  // console.log(out)

  // parse contents (opts.relative)
  //----------------------------------------------------------
  const parseContent = contents.length === 1 && opts.relative
    ? ob => out = merge(out, ob.contents)
    : ob => console.log('TODO') // TODO
  contents.forEach(parseContent)
  // console.log(out)

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
  // console.log(Object.keys(out.dirs))
  // console.log(Object.keys(out.exes))

  // const out = []
  // contents.forEach(content => parseContent(content, opts))
  // return out
}

// export
//----------------------------------------------------------
module.exports = output
