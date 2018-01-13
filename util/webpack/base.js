let config = require('config')
let webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')

let fileName = config.get('shouldHotReload') ? '[name].js' : '[name].[hash].js'

let webpackBase = {
  entry: {
    vendors: [
      'lodash',
      'react',
      'react-addons-test-utils',
      'react-dom',
      'react-redux',
      'redux'
    ]
  },
  output: {
    path: process.cwd() + '/dist/assets/public/',
    publicPath: '/assets/public/',
    filename: fileName
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: fileName }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      template: 'src/server/html/index._TEMPLATE_.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new HtmlWebpackHarddiskPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
    modules: ['src/client/js', 'node_modules', 'src/client/sass'],
    alias: {
      product_style: process.cwd() + '/src/client/sass' + (process.env.PRODUCT_MODE === 'NM' ? '/app_nm.scss' : '/app_lv.scss')
    }
  },
  module: {
    rules: [
      {
        test: /\.woff([?]?.*)$/,
        use: 'file-loader'
      },
      {
        test: /\.woff2([?]?.*)$/,
        use: 'file-loader'
      },
      {
        test: /\.ttf([?]?.*)$/,
        use: 'file-loader'
      },
      {
        test: /\.eot([?]?.*)$/,
        use: 'file-loader'
      },
      {
        test: /\.json([?]?.*)$/,
        use: 'json-loader'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      },
      {
        test: /\.svg([?]?.*)$/,
        use: 'file-loader'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            [ 'env', { modules: false } ],
            'react'
          ],
          env: {
            dev: {
              plugins: [['react-transform', {
                transforms: [{
                  transform: 'react-transform-hmr',
                  imports: ['react'],
                  locals: ['module']
                }]
              }]]
            }
          }
        }
      }
    ]
  }
}

module.exports = webpackBase
