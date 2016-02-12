'use strict'

// import
//----------------------------------------------------------
const parseContent = require('./parseContent')
const parseFlags   = require('./parseFlags')

// jsdoc
function output(contents, flags) {

  const opts = parseFlags(flags)
  // console.log(opts)
  console.log(contents)

  if (contents.length > 1 || !opts.relative) {
    // use path from CWD
    // else use path from glob
  }

  const out =
    { files: {}
    , dirs: {}
    , exes: {}
    , symlinks: {}
    }

  // const out = []
  // contents.forEach(content => parseContent(content, opts))
  // return out
}

// export
//----------------------------------------------------------
module.exports = output
