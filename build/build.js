'use strict'
const rm = require('rimraf')
const webpack = require('webpack')
const webpackConfig = require('../webpack/dev.config.js')
const path = require('path')
const { fork } = require('child_process')

let server;
const root = path.resolve(__dirname, '..')
const compiler = webpack(webpackConfig())

/** Fork new process for the node server */
function runServer(firstRun = false) {
  return fork(path.join(root, 'dist', 'app.js'), [firstRun ? 'FIRST_RUN' : 'REBUILD'])
}

rm(path.join(root, 'dist'), err => {
  if (err) throw err
  const watching = compiler.watch({}, (err, stats) => {
    console.log(stats.toString({
      chunks: false,  // Makes the build much quieter
      colors: true    // Shows colors in the console
    }));
    // If the server is running it we need to kill & restart it
    if (server) {
      if (server.connected) {
        server.send({
          type: 'close'
        })
      }
      server.on('message', (msg) => {
        if (msg && msg.type === 'close') {
          server = runServer()
        }
      })
      server = null
    } else { // First run, just start server
      server = runServer(true)
    }
  })
})
