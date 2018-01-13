// based on express version https://github.com/roylines/node-epimetheus/blob/master/lib/express.js
import Router from 'koa-router'
import metrics from 'epimetheus/lib/metrics'

async function middleware (ctx, next) {
  let start = process.hrtime()

  await next()

  metrics.observe(ctx.method, ctx.path, ctx.status, start)
}

function instrument (server, options) {
  const router = new Router()
  router.get(options.url, async function (ctx, next) {
    ctx.body = metrics.summary()
    ctx.set('content-type', 'text/plain')
    await next()
  })
  server.use(middleware)
  server.use(router.routes())
}

function instrumentable (server) {
  return server && !server.name && server.use
}

export {
  instrumentable,
  instrument
}
