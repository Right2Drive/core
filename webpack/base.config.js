const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals');

const root = path.resolve(__dirname, '..')

function resolve(dir) {
  return path.join(root, dir)
}

module.exports = function () {
  return {
    entry: {
      app: path.join(root, 'src', 'index.ts')
    },
    output: {
      path: path.join(root, 'dist'),
      filename: '[name].js'
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      alias: {
        '@': path.join(root, 'src')
      }
    },
    module: {
      rules: [
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: "source-map-loader",
          options: {
            configFile: path.join(root, 'tslint.json'),
            emitErrors: true,
            fix: false
          }
        },
        // All .ts files will be linted by 'tslint'
        {
          enforce: 'pre',
          test: /\.ts$/,
          loader: 'tslint-loader',
          include: [resolve('src'), resolve('test')]
        },
        // All files with a '.ts' extension will be handled by 'awesome-typescript-loader'.
        {
          test: /\.ts$/,
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
