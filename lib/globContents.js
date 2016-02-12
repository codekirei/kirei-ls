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
  const relTarget = p.resolve(p.dirname(path), target.target)
  const stats = yield getStats(relTarget)

  if (stats.isDirectory()) target.type = 'dir'
  else if (stats.isFile()) {
    target.type = (yield isexe(relTarget)) ? 'exe' : 'file'
  }

  return target
}

// jsdoc
function* globContents(potentialGlob) {

  // ensure glob and compute common root
  //----------------------------------------------------------
  const glob = potentialGlob.indexOf('*') >= 0
    ? potentialGlob
    : p.join(potentialGlob, '*')
  const root = glob.slice(0, glob.indexOf('*'))

  // create output skeleton
  //----------------------------------------------------------
  const out =
    { glob
    , root
    , contents:
      { files: {}
      , exes: {}
      , dirs: {}
      , symlinks: {}
      }
    }

  // get paths and stats from glob
  //----------------------------------------------------------
  const paths = yield globby(glob)
  const stats = yield Promise.all(paths.map(path => getStats(path)))

  // filter paths and stats into output
  //----------------------------------------------------------
  yield Promise.map(stats, co.wrap(function* (stat, i) {

    const path = paths[i]

    if (stat.isDirectory()) {
      out.contents.dirs[path] = stat
      return
    }

    else if (stat.isSymbolicLink()) {
      out.contents.symlinks[path] = yield linkTarget(path)
      out.contents.symlinks[path].stats = stat
      return
    }

    else if (stat.isFile()) {
      (yield isexe(path))
        ? out.contents.exes[path] = stat
        : out.contents.files[path] = stat
      return
    }
  }))

  // return constructed output
  //----------------------------------------------------------
  return out
}

// export
//----------------------------------------------------------
module.exports = co.wrap(globContents)
