import Router from 'koa-router'

import {Bracket} from '../util/bracket'
import {GraphQl} from './../util/graphql'

let apiRouter = new Router({
  prefix: '/smash_bracket/api'
})

apiRouter
  .post('/createTournament', async function (ctx) {
    const {date, players} = ctx.request.body
    const graphQl = new GraphQl(ctx.logger)

    if (!date) {
      ctx.throw('No date provided')
    }

    if (!players || players.length < 3) {
      ctx.throw('At least three players are required')
    }

    const tournamentId = await graphQl.createTournament({date, players})

    const bracket = new Bracket({players})
    await bracket.save({graphQl, tournamentId})

    ctx.status = 200
  })

export default apiRouter
