import _ from 'lodash'

export class Bracket {
  constructor ({players}) {
    this.players = _.shuffle(players)
    this.winners = this._generateWinnersBracket()
    this.losers = this._generateLosersBracket()
    this.finals = this._generateFinalsBracket()
  }

  _isPowerOf2 (n) {
    return n && (n & (n - 1)) === 0
  }

  _getNumberOfByes () {
    let numberOfByes = 0

    if (!this._isPowerOf2(this.players.length)) {
      let nextPowerOf2 = this.players.length + 1

      while (!this._isPowerOf2(nextPowerOf2)) {
        nextPowerOf2++
      }

      numberOfByes = nextPowerOf2 - this.players.length
    }

    return numberOfByes
  }

  _generateWinnersBracket () {
    const playersClone = _.cloneDeep(this.players)
    const numberOfByes = this._getNumberOfByes()
    const byes = []

    for (let i = 0; i < numberOfByes; i++) {
      byes.push(playersClone.shift())
    }

    const firstRound = []
    const numberOfSetsInFirstRound = playersClone.length / 2
    for (let i = 0; i < numberOfSetsInFirstRound; i++) {
      const set = {
        firstPlayer: playersClone.shift(),
        secondPlayer: playersClone.shift(),
        id: i.toString()
      }

      firstRound.push(set)
    }

    const rounds = [firstRound]

    while (_.last(rounds).length > 1 || byes.length) {
      const lastRound = _.last(rounds)
      const round = []

      _.forEach(lastRound, set => {
        const lastSetInRound = _.last(round)

        if (!lastSetInRound || (lastSetInRound.firstPlayer && lastSetInRound.secondPlayer)) {
          const newSet = {
            firstPlayer: set.id,
            id: `${set.id}_${round.length}`
          }

          round.push(newSet)
        } else {
          lastSetInRound.secondPlayer = set.id
        }
      })

      while (byes.length) {
        let bye = byes.pop()
        
        const lastSetInRound = _.last(round)

        if (lastSetInRound.firstPlayer && lastSetInRound.secondPlayer) {
          const ids = _.split(lastSetInRound.id, '_')
          const lastInt = Number(ids.pop()) + 1
          ids.push(lastInt)
          const newSet = {
            firstPlayer: bye,
            id: ids.join('_')
          }

          round.push(newSet)
        } else {
          lastSetInRound.secondPlayer = bye
        }
      }

      rounds.push(round)
    }

    return rounds
  }

  _generateLosersBracket () {
    const winnersFirstRound = _.cloneDeep(this.winners[0])
    const losersBye = winnersFirstRound.length % 2
    const numFirstRoundPlayers = (winnersFirstRound.length - losersBye) / 2
    const numFirstRoundSets = numFirstRoundPlayers / 2
    let firstRound = []

    for (let i = 0; i < numFirstRoundSets; i++) {
      const set = {
        firstPlayer: winnersFirstRound.shift().id,
        secondPlayer: winnersFirstRound.shift().id,
        id: `L_${i}`
      }

      firstRound.push(set)
    }

    const byes = []

    if (losersBye) {
      byes.push(winnersFirstRound.pop().id)
    }

    if (this.winners.length > 1) {
      const winnersRound = _.cloneDeep(this.winners[1])
      _.forEach(winnersRound, set => byes.unshift(set.id))
    }

    if (numFirstRoundSets === 0) {
      const set = {
        firstPlayer: byes.pop(),
        secondPLayer: byes.shift(),
        id: `L_0`
      }

      firstRound.push(set)
    }

    const rounds = [firstRound]
    
    while (_.last(rounds).length > 1 || byes.length) {
      const lastRound = _.last(rounds)
      const roundNumber = rounds.length

      const round = []

      _.forEach(lastRound, set => {
        const lastSetInRound = _.last(round)

        if (!lastSetInRound || (lastSetInRound.firstPlayer && lastSetInRound.secondPlayer)) {
          const newSet = {
            firstPlayer: set.id,
            id: `${set.id}_${round.length}`
          }

          round.push(newSet)
        } else {
          lastSetInRound.secondPlayer = set.id
        }
      })

      while (byes.length) {
        let bye = byes.shift()
        
        const lastSetInRound = _.last(round)

        if (lastSetInRound.firstPlayer && lastSetInRound.secondPlayer) {
          const ids = _.split(lastSetInRound.id, '_')
          const lastInt = Number(ids.pop()) + 1
          ids.push(lastInt)
          const newSet = {
            firstPlayer: bye,
            id: ids.join('_')
          }

          round.push(newSet)
        } else {
          lastSetInRound.secondPlayer = bye
        }
      }

      rounds.push(round)

      if (this.winners.length > roundNumber + 1) {
        const winnersRound = _.cloneDeep(this.winners[roundNumber + 1])
        _.forEach(winnersRound, set => byes.unshift(set.id))
      }
    }

    return rounds
  }

  _generateFinalsBracket () {
    const finalSet = {
      id: 'FINAL',
      firstPlayer: _.last(_.last(this.winners)).id,
      secondPlayer: _.last(_.last(this.losers)).id
    }

    const optionalFinalSet = {
      id: 'OPT_FINAL',
      firstPlayer: _.last(_.last(this.winners)).id,
      secondPlayer: _.last(_.last(this.losers)).id
    }

    return [[finalSet], [optionalFinalSet]]
  }

  _mapSets () {
    const winnerSets = _.flattenDeep(this.winners)
    const loserSets = _.flattenDeep(this.losers)

    _.forEach(this.winners, (round, roundIndex) => {
      _.forEach(round, set => {
        const winnerGoesTo = _.find(winnerSets, nextSet => nextSet.firstPlayer === set.id || nextSet.secondPlayer === set.id)
        if (winnerGoesTo) {
          set.winnerSet = winnerGoesTo.id
        }

        const loserGoesTo = _.find(loserSets, nextSet => nextSet.firstPlayer === set.id || nextSet.secondPlayer === set.id)
        if (loserGoesTo) {
          set.loserSet = loserGoesTo.id
        }
      })
    })

    _.forEach(this.losers, (round, roundIndex) => {
      _.forEach(round, set => {
        const winnerGoesTo = _.find(winnerSets, nextSet => nextSet.firstPlayer === set.id || nextSet.secondPlayer === set.id)
        if (winnerGoesTo) {
          set.winnerSet = winnerGoesTo.id
        }
      })
    })
  }

  _setNewIds ({bracket, matchIds, setIds}) {
    _.forEach(bracket, round => {
      _.forEach(round, set => {
        const placeHolderId = _.get(set, 'id')
        _.set(set, 'id', _.get(setIds, `ALIAS_${placeHolderId}.id`))
        _.set(set, 'matches', [
          {id: _.get(matchIds, `ALIAS_${placeHolderId}_M0.id`)},
          {id: _.get(matchIds, `ALIAS_${placeHolderId}_M1.id`)},
          {id: _.get(matchIds, `ALIAS_${placeHolderId}_M2.id`)}
        ])
        
        const firstPlayerSetId = _.get(setIds, `ALIAS_${_.get(set, 'firstPlayer')}.id`)
        if (firstPlayerSetId) {
          _.set(set, 'firstPlayer', firstPlayerSetId)
        } else {
          _.forEach(set.matches, match => _.set(match, 'firstPlayer', set.firstPlayer))
        }

        const secondPlayerSetId = _.get(setIds, `ALIAS_${_.get(set, 'secondPlayer')}.id`)
        if (secondPlayerSetId) {
          _.set(set, 'secondPlayer', secondPlayerSetId)
        } else {
          _.forEach(set.matches, match => _.set(match, 'secondPlayer', set.firstPlayer))
        }
      })
    })
  }

  async save ({graphQl, tournamentId}) {
    let matches = []
    const sets = []

    _.forEach(this.winners, round => {
      _.forEach(round, set => {
        sets.push(set.id)
        matches = _.concat(matches, [`${set.id}_M0`, `${set.id}_M1`, `${set.id}_M2`])
      })
    })

    _.forEach(this.losers, round => {
      _.forEach(round, set => {
        sets.push(set.id)
        matches = _.concat(matches, [`${set.id}_M0`, `${set.id}_M1`, `${set.id}_M2`])
      })
    })

    _.forEach(this.finals, round => {
      _.forEach(round, set => {
        sets.push(set.id)
        matches = _.concat(matches, [`${set.id}_M0`, `${set.id}_M1`, `${set.id}_M2`])
      })
    })

    const matchIds = await graphQl.createMatches({matches})
    const setIds = await graphQl.createSets({sets})

    this._setNewIds({bracket: this.winners, matchIds, setIds})
    this._setNewIds({bracket: this.losers, matchIds, setIds})
    this._setNewIds({bracket: this.finals, matchIds, setIds})
    this._mapSets()

    const allSets = _.concat(
      _.flattenDeep(this.winners),
      _.flattenDeep(this.losers),
      _.flattenDeep(this.finals)
    )

    await graphQl.connectPlayersToMatches({sets: allSets})
    await graphQl.connectMatchesToSets({sets: allSets})
    await graphQl.connectSetsToSets({sets: allSets})
    await graphQl.connectSetsToTournament({sets: allSets, tournamentId})
  }
}
