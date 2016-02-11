'use strict'

// import
//----------------------------------------------------------
const ansi = require('ansi-styles')

const bold = str => ansi.bold.open + str + ansi.bold.close

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
    -C, --no-color
    -D, --no-detail
    -G, --no-group
    -M, --no-multi
    -R, --no-relative
    -S, --no-symbols`
