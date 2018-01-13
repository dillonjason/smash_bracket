'use strict'

// NO ES6 in this file
require('babel-register')
require('babel-polyfill')

var addPath = require('app-module-path').addPath
addPath(`${process.cwd()}/src/server`)

var argv = require('minimist')(process.argv.slice(2))

if (typeof argv.file === 'string') {
  require([process.cwd(), '/', argv.file].join(''))
}
