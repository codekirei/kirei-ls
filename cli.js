#! /usr/bin/env node

'use strict'

const Liftoff = require('liftoff')
const argv = require('minimist')(process.argv.slice(2))
const Kls = require('./')

new Liftoff(
  { name: 'kls'
  , configName: '.kls'
  , extensions:
    { rc: null
    }
  , completions: null
  }
).launch(
  { configPath: argv.config || argv.conf
  }
  , env => new Kls(env, argv)
)
