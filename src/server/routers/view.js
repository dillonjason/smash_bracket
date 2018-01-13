import Router from 'koa-router'

let viewRouter = Router()

viewRouter
  .get('/smash_bracket(/?.*)', async function (ctx) {
    // Example log to test headers/Logger middleware working
    ctx.logger.info(`get request for ${ctx.request.path}`)

    ctx.body = await ctx.render('index')
  })

export default viewRouter
