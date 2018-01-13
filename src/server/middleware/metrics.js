import logger from 'util/logger'
import stats from 'util/stats'

export default async function metricsMiddleware (ctx, next) {
  stats.meter('requests').mark()
  stats.meter(`${ctx.request.path}`).mark()

  try {
    await next()
  } catch (err) {
    logger.error(err)

    stats.meter('errors').mark()
    stats.meter(`errors_${ctx.request.path}`).mark()

    ctx.status = 500
  }
}
