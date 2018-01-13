let webpack = require('webpack')
let path = require('path')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let webpackMerge = require('webpack-merge')

let webpackBase = require('./base')

let extractSass = new ExtractTextPlugin({
  filename: '[name].[hash].css',
  allChunks: false
})

let webpackProd = webpackMerge(webpackBase, {
  devtool: 'source-map',
  entry: {
    app: './src/client/js/app'
  },
  module: {
    rules: [
      {
        test: /\.scss$|\.sass|\.css$/,
        use: extractSass.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'autoprefixer-loader',
              options: {
                browsers: 'last 2 version'
              }
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [
                  path.resolve(__dirname, './node_modules'),
                  path.resolve(__dirname, './src/client/sass')
                ]
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    extractSass,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
})

module.exports = webpackProd
