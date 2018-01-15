import _ from 'lodash'

export class Bracket {
  constructor ({players}) {
    this.players = _.shuffle(players)
    this.winners = this._generateWinnersBracket()
    this.losers = this._generateLosersBracket()
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
        key: i.toString()
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
            firstPlayer: set.key,
            key: `${set.key}_${round.length}`
          }

          round.push(newSet)
        } else {
          lastSetInRound.secondPlayer = set.key
        }
      })

      while (byes.length) {
        let bye = byes.pop()
        
        const lastSetInRound = _.last(round)

        if (lastSetInRound.firstPlayer && lastSetInRound.secondPlayer) {
          const keys = _.split(lastSetInRound.key, '_')
          const lastInt = Number(keys.pop()) + 1
          keys.push(lastInt)
          const newSet = {
            firstPlayer: bye,
            key: keys.join('_')
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
        firstPlayer: winnersFirstRound.shift().key,
        secondPlayer: winnersFirstRound.shift().key,
        key: `L_${i}`
      }

      firstRound.push(set)
    }

    const byes = []

    if (losersBye) {
      byes.push(winnersFirstRound.pop().key)
    }

    if (this.winners.length > 1) {
      const winnersRound = _.cloneDeep(this.winners[1])
      _.forEach(winnersRound, set => byes.unshift(set.key))
    }

    if (numFirstRoundSets === 0) {
      const set = {
        firstPlayer: byes.pop(),
        secondPLayer: byes.shift(),
        key: `L_0`
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
            firstPlayer: set.key,
            key: `${set.key}_${round.length}`
          }

          round.push(newSet)
        } else {
          lastSetInRound.secondPlayer = set.key
        }
      })

      while (byes.length) {
        let bye = byes.shift()
        
        const lastSetInRound = _.last(round)

        if (lastSetInRound.firstPlayer && lastSetInRound.secondPlayer) {
          const keys = _.split(lastSetInRound.key, '_')
          const lastInt = Number(keys.pop()) + 1
          keys.push(lastInt)
          const newSet = {
            firstPlayer: bye,
            key: keys.join('_')
          }

          round.push(newSet)
        } else {
          lastSetInRound.secondPlayer = bye
        }
      }

      rounds.push(round)

      if (this.winners.length > roundNumber + 1) {
        const winnersRound = _.cloneDeep(this.winners[roundNumber + 1])
        _.forEach(winnersRound, set => byes.unshift(set.key))
      }
    }

    return rounds
  }
}
