import Router from 'koa-router'

import {Bracket} from '../util/bracket'

let apiRouter = new Router({
  prefix: '/smash_bracket/api'
})

apiRouter
  .post('/createTournament', async function (ctx) {
    const {date, players} = ctx.request.body

    if (!date) {
      ctx.throw('No date provided')
    }

    if (!players || players.length < 2) {
      ctx.throw('At least two players are required')
    }

    const bracket = new Bracket({players})

    ctx.status = 200
    ctx.body = JSON.stringify({
      winners: bracket.winners,
      losers: bracket.losers
    })
  })

export default apiRouter
