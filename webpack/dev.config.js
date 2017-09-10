const webpackMerge = require('webpack-merge')
const webpack = require('webpack')

const commonConfig = require('./base.config.js')

module.exports = function () {
  return webpackMerge(commonConfig(), {
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      })
    ]
  })
}
