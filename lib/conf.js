'use strict'

// import
//----------------------------------------------------------
const co = require('co')
const findUp = require('find-up')
const fs = require('fs')
const ini = require('ini')
const p = require('path')

// promises
//----------------------------------------------------------
const Promise = require('bluebird')
Promise.longStackTraces()
const read = Promise.promisify(fs.readFile)

// jsdoc
function* parseConf() {

  // attempt to parse .klsrc
  //----------------------------------------------------------
  const rc = yield findUp('.klsrc')
  if (rc) return ini.parse(yield read(rc, 'utf-8'))

  // attempt to parse $XDG_CONFIG_HOME/kls/kls.conf
  //----------------------------------------------------------
  const xdg = process.env.XDG_CONFIG_HOME
  if (xdg) {
    const xdgconf = p.join(xdg, 'kls', 'kls.conf')
    try {
      return ini.parse(yield read(xdgconf, 'utf-8'))
    } catch (err) {
      if (err.code === 'ENOENT') return {}
      throw err
    }
  }
}

// export
//----------------------------------------------------------
module.exports = co.wrap(parseConf)
