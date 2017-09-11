const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals');

const root = path.resolve(__dirname, '..')

function resolve(dirOrFile) {
  return path.join(root, dirOrFile)
}

module.exports = function () {
  return {
    entry: {
      app: path.join(root, 'src', 'index.ts'),
      test: path.join(root, 'test', 'index.ts')
    },
    output: {
      path: resolve('dist'),
      filename: '[name].js'
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      alias: {
        '@': resolve('src')
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
        // All .ts files will be linted by 'tslint'
        {
          enforce: 'pre',
          test: /\.ts$/,
          loader: 'tslint-loader',
          include: [resolve('src'), resolve('test')],
          options: {
            configuration: {
              extends: "tslint-config-airbnb",
              rules: {
                'only-arrow-function': false
              }
            },
            emitErrors: true,
            fix: false,
            failOnHint: true,
            tsConfigFile: resolve('tsconfig.json')
          }
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
