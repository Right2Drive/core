const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

const commonConfig = require('./base.config.js')

module.exports = function () {
  return webpackMerge(commonConfig(), {
  })
}
