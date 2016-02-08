'use strict'

// import
//----------------------------------------------------------
const Promise = require('bluebird')
const p = require('path')
const columnize = require('columnize-array')
const fs = require('fs')
const merge = require('lodash.merge')
const globby = require('globby')

// jsdoc
function kls(env, flags) {

  // read dir
  //----------------------------------------------------------
  const cwd = process.cwd()
  const glob = flags._[0].indexOf('*') >= 0
    ? flags._[0]
    : p.join(flags._[0], '*')
  const path =
    { rel: glob
    , abs: p.join(cwd, glob)
    }
  return globby(path.abs)
}

// export
//----------------------------------------------------------
module.exports = kls
