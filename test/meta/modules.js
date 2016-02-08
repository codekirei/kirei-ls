'use strict'

// require modules used in testing and add to global object
// this file is injected by mocha.opts

// npm
//----------------------------------------------------------
global.assert = require('chai').assert
global.reqDir = require('require-directory')

// local
//----------------------------------------------------------
