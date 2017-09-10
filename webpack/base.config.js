const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals');

module.exports = function () {
  return {
    entry: {
      app: path.resolve(__dirname, '..', 'src', 'index.ts')
    },
    output: {
      path: path.resolve(__dirname, '..', 'dist'),
      filename: '[name].js'
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      alias: {
        '@': path.resolve(__dirname, '..', 'src')
      }
    },
    module: {
      rules: [
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: "source-map-loader"
        },
        // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
        {
          test: /\.tsx?$/,
          loaders: [
            "awesome-typescript-loader"
          ],
          exclude: [/\.(spec|e2e|d)\.ts$/]
        }]
    },
    target: 'node',
    externals: [nodeExternals()]
  }
}
