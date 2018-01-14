import Router from 'koa-router'

let apiRouter = new Router({
  prefix: '/smash_bracket/api'
})

apiRouter
  .post('/createTournament', async function (ctx) {
    ctx.logger.info('postin')

    ctx.status = 200
  })

export default apiRouter
