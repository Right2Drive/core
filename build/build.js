'use strict'
const rm = require('rimraf')
const webpack = require('webpack')
const webpackConfig = require('../webpack/dev.config.js')
const path = require('path')
const { fork } = require('child_process')

let server;
const root = path.resolve(__dirname, '..')
const compiler = webpack(webpackConfig())

function runServer() {
  return fork(path.join(root, 'dist', 'app.js'))
}

rm(path.join(root, 'dist'), err => {
  if (err) throw err
  const watching = compiler.watch({}, (err, stats) => {
    console.log(stats.toString({
      chunks: false,  // Makes the build much quieter
      colors: true    // Shows colors in the console
    }));
    if (server) {
      server.send({
        type: 'close'
      })
      server.on('message', (msg) => {
        if (msg && msg.type === 'close') {
          server = runServer()
        }
      })
      server = null
    } else {
      server = runServer()
    }
  })
})
