import webpack from 'webpack'
import webpackDevMiddleware from 'koa-webpack-dev-middleware'
import webpackHotMiddleware from 'koa-webpack-hot-middleware'

import webpackDevConfig from './../../../util/webpack/dev'

function attachDevMiddleware (app) {
  let compiler = webpack(webpackDevConfig)

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackDevConfig.output.publicPath
  }))

  app.use(webpackHotMiddleware(compiler))
}

export default attachDevMiddleware
