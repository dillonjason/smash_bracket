import _ from 'lodash'
import Router from 'koa-router'
import stats from 'util/stats'

let metricsRouter = new Router()
let appStartTime = new Date().getTime()

metricsRouter
  .get('/smash_bracket/metrics', async function (ctx, next) {
    let processInfo = process.memoryUsage()
    let uptime = new Date().getTime() - appStartTime

    ctx.body = _.merge({}, {uptime}, processInfo, stats.toJSON())
    await next()
  })

export default metricsRouter
