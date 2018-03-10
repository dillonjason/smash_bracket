import config from 'config'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import json from 'koa-json'
import serve from 'koa-static'
import views from 'koa-render'
import mount from 'koa-mount'

import Logger from './util/logger'

import metricsMiddleware from './middleware/metrics'
import attachDevMiddleware from './middleware/dev'

import headersMiddleware from './middleware/headers'
import loggerMiddleware from './middleware/logger'
import requestLoggerMiddleware from './middleware/request_logger'

import metricsRouter from './routers/metrics'
import statusRouter from './routers/status'
import apiRouter from './routers/api'
import viewRouter from './routers/view'

const port = process.env.PORT || 3000

let app = new Koa()

require('epimetheus/lib/event-loop').instrument()
require('epimetheus/lib/memory-usage').instrument()
require('./util/epimetheus').instrument(app, require('epimetheus/lib/defaults')())

// Serve hot-reloading bundle to client
if (config.get('shouldHotReload')) {
  attachDevMiddleware(app)
}

app
  .use(metricsMiddleware)
  .use(bodyParser())
  .use(json())
  .use(mount('/plan', serve(`${process.cwd()}/dist`, {
    cacheControl: `max-age=${365 * 24 * 60 * 60}, immutable`
  })))
  .use(views(`${process.cwd()}/dist/assets/public/`, {
    map: {
      html: 'handlebars'
    }
  }))

app
  .use(headersMiddleware)
  .use(loggerMiddleware)
  .use(requestLoggerMiddleware)

app
  .use(metricsRouter.routes())
  .use(statusRouter.routes())
  .use(apiRouter.routes())
  .use(viewRouter.routes())

app.listen(port)

Logger.info(`Server listening at http://localhost:${port}`)
