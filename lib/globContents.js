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
function* globContents(cwd, potentialGlob) {

  // ensure glob
  //----------------------------------------------------------
  const glob = potentialGlob.indexOf('*') >= 0
    ? potentialGlob
    : p.join(potentialGlob, '*')

  // prep output
  //----------------------------------------------------------
  const out =
    { files: []
    , exes: []
    , dirs: []
    , symlinks: []
    , stats: {}
    , cwd
    , glob
    }

  // read glob and format output
  //----------------------------------------------------------
  const paths = yield globby(p.join(cwd, glob))
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
