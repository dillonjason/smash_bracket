import Router from 'koa-router'
import _ from 'lodash'

import {Bracket} from '../util/bracket'
import {GraphQl} from './../util/graphql'
import {SetUtils} from '../util/set'

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

    const bracket = new Bracket({players})

    const tournamentId = await graphQl.createTournament({date, players, numberOfSets: bracket.countSets()})
    await bracket.save({graphQl, tournamentId})

    ctx.status = 200
  })

  .post('/updateMatches', async function (ctx) {
    const {set, matches} = ctx.request.body
    const graphQl = new GraphQl(ctx.logger)

    if (_.find(matches, match => !match.id)) {
      ctx.throw('Match Id not provided')
    }

    await graphQl.updateMatches({matches})

    const {setWinner, setLoser} = SetUtils.getWinnerAndLoser({set, matches})

    if (setWinner) {
      const setProgress = await graphQl.getSetProgress({set})
      const winnerSet = _.get(setProgress, 'Set.winnerSet')
      const loserSet = _.get(setProgress, 'Set.loserSet')
      const updatedNextSets = SetUtils.getUpdatedNextSets({setWinner, setLoser, winnerSet, loserSet})
  
      await Promise.all([
        graphQl.updateSetWinner({
          set,
          setWinner,
          winnerSet,
          loserSet
        }),
        graphQl.connectPlayersToMatches({
          sets: updatedNextSets
        })
      ])
    }

    ctx.status = 200
  })

  .post('/deleteTournament', async function (ctx) {
    const {id} = ctx.request.body
    const graphQl = new GraphQl(ctx.logger)
    const sets = await graphQl.getTournamentSets({id})
    const matches = []

    _.forEach(sets, set => {
      _.forEach(set.matches, match => {
        matches.push(match)
      })
    })

    await graphQl.deleteTournament({id, sets, matches})

    ctx.status = 200
  })

export default apiRouter
