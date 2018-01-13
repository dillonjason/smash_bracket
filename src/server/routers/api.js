import Router from 'koa-router'

import mockData from './../../../mock/mock.json'

let apiRouter = new Router({
  prefix: '/smash_bracket/api'
})

apiRouter
  .get('/mockData', async function (ctx) {
    ctx.body = mockData
  })

export default apiRouter
