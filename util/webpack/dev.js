let webpackBase = require('./base')
let webpackMerge = require('webpack-merge')

let webpackDev = webpackMerge(webpackBase, {
  devtool: 'eval-source-map',
  entry: {
    app: [
      'webpack-hot-middleware/client',
      './src/client/js/app'
    ]
  },
  cache: true,
  module: {
    rules: [
      {
        test: /\.scss$|\.sass|\.css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
})

module.exports = webpackDev
