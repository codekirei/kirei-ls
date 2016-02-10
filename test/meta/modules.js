'use strict'

// require modules used in testing and add to global object
// this file is injected by mocha.opts

// node
//----------------------------------------------------------
global.cwd = process.cwd()
const p = require('path')
global.p = p

// npm
//----------------------------------------------------------
require('mocha-generators').install()
global.sinon = require('sinon')

// chai
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
global.assert = chai.assert

// local
//----------------------------------------------------------
global.kls = require('../..')
global.fixtures = p.join('test', 'meta', 'fixtures')
