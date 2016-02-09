'use strict'

// import
//----------------------------------------------------------
const Promise = require('bluebird')
const co = require('co')
const fs = require('fs')
const globby = require('globby')
const isexe = require('isexe')
const p = require('path')

const getStats = Promise.promisify(fs.lstat)

// jsdoc
function* globContents(relGlob, cwd) {

  // prep paths
  //----------------------------------------------------------
  const glob = relGlob.indexOf('*') >= 0
    ? relGlob
    : p.join(relGlob, '*')
  const absGlob = p.join(cwd, glob)

  // prep output
  //----------------------------------------------------------
  const out =
    { files: []
    , exes: []
    , dirs: []
    , symlinks: []
    , stats: {}
    , glob: absGlob
    }

  // read glob and format output
  //----------------------------------------------------------
  const paths = yield globby(absGlob)
  const stats = yield Promise.all(paths.map(path => getStats(path)))
  const exes = yield Promise.all(paths.map(path => isexe(path)))
  stats.forEach((stat, i) => {
    const path = paths[i]
    out.stats[path] = stat
    if (stat.isDirectory()) out.dirs.push(path)
    if (stat.isSymbolicLink()) out.symlinks.push(path)
    if (stat.isFile()) exes[i] ? out.exes.push(path) : out.files.push(path)
  })
  return out
}

// export
//----------------------------------------------------------
module.exports = co.wrap(globContents)
