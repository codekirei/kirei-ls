'use strict'

// import
//----------------------------------------------------------
const ansi = require('ansi-styles')

// utils
//----------------------------------------------------------
const bold = str => ansi.bold.open + str + ansi.bold.close

// export
//----------------------------------------------------------
module.exports =
`
  ${bold('HELP:')}
    -h, --help

  ${bold('FILTER:')}
    -d, --dirs
    -e, --exes
    -f, --files
    -l, --links

  ${bold('SORT:')}
    -s, --sort <age|ext|name|size>

  ${bold('PRESENTATION:')}
    -1, --no-columns
    -C, --no-colors
    -D, --no-detail
    -G, --no-group
    -R, --no-relative
    -S, --no-symbols`
