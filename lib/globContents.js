'use strict'

// import
//----------------------------------------------------------
const Promise = require('bluebird')
const co      = require('co')
const fs      = require('fs')
const globby  = require('globby')
const isexe   = require('isexe')
const p       = require('path')

// promisification
//----------------------------------------------------------
const getStats = Promise.promisify(fs.lstat)
const readLink = Promise.promisify(fs.readlink)

// jsdoc
function* linkTarget(path) {

  const target = { target: yield readLink(path) }
  const stats = yield getStats(target.target)

  if (stats.isDirectory()) target.type = 'dir'
  else if (stats.isFile()) {
    target.type = (yield isexe(target.target)) ? 'exe' : 'file'
  }

  return target
}

// jsdoc
function* globContents(potentialGlob) {

  // ensure glob
  //----------------------------------------------------------
  const glob = potentialGlob.indexOf('*') >= 0
    ? potentialGlob
    : p.join(potentialGlob, '*')

  // create output skeleton
  //----------------------------------------------------------
  const out =
    { files: []
    , exes: []
    , dirs: []
    , symlinks: {}
    , stats: {}
    , glob
    }

  // get paths and stats from glob
  //----------------------------------------------------------
  const paths = yield globby(glob)
  const stats = yield Promise.all(paths.map(path => getStats(path)))

  // filter paths and stats into output
  //----------------------------------------------------------
  yield Promise.map(stats, co.wrap(function* (stat, i) {

    const path = paths[i]
    out.stats[path] = stat

    if (stat.isDirectory()) return out.dirs.push(path)

    else if (stat.isSymbolicLink()) {
      out.symlinks[path] = yield linkTarget(path)
      return
    }

    else if (stat.isFile()) return (yield isexe(path))
      ? out.exes.push(path)
      : out.files.push(path)
  }))

  // return constructed output
  //----------------------------------------------------------
  return out
}

// export
//----------------------------------------------------------
module.exports = co.wrap(globContents)
