import _ from 'lodash'

export class SetUtils {
  static _setNextSetPlayer ({set, player}) {
    const matches = _.get(set, 'matches')
    const position = _.get(matches, '0.firstPlayer') ? 'secondPlayer' : 'firstPlayer'
    const clearPosition = _.get(matches, '0.firstPlayer') ? 'firstPlayer' : 'secondPlayer'

    _.forEach(matches, match => {
      _.set(match, position, player)
      _.set(match, clearPosition, null)
    })
  }

  static getWinnerAndLoser ({set, matches}) {
    let winsNeeded = Math.floor(matches.length / 2) + 1

    const winningCount = _.countBy(matches, match => match.winner)
    const setWinner = _.find(_.keys(winningCount), winnerId => winningCount[winnerId] >= winsNeeded)

    const losingCount = _.countBy(matches, match => match.loser)
    const setLoser = _.find(_.keys(losingCount), loserId => losingCount[loserId] >= winsNeeded)

    return {setWinner, setLoser}
  }

  static getUpdatedNextSets ({setWinner, setLoser, winnerSet, loserSet}) {
    const updatedNextSets = []

    if (winnerSet) {
      this._setNextSetPlayer({set: winnerSet, player: setWinner})
      updatedNextSets.push(winnerSet)
    }

    if (loserSet) {
      this._setNextSetPlayer({set: loserSet, player: setLoser})
      updatedNextSets.push(loserSet)
    }

    return updatedNextSets
  }
}
