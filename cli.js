#! /usr/bin/env node

'use strict'

const Liftoff = require('liftoff')
const argv = require('minimist')(process.argv.slice(2))
const cli = require('./lib/cli')

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
  , env => cli(env.configPath, argv).then(console.log)
)
