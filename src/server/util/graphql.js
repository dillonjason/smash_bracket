import {Request} from './request'
import {createTournamentQuery, addPlayersToTournamentQuery, addSetsToTournamentQuery} from '../queries/tournament'
import {createMultipleMatchesQuery, addPlayersToMatchesQuery, updateMultipleMatchesQuery} from '../queries/match'
import {createMultipleSetsQuery, addMatchesToSetsQuery, addWinnerLoserSetsToSetsQuery} from '../queries/set'

export class GraphQl {
  constructor (logger) {
    this.request = new Request({
      headers: {
        'content-type': 'application/json'
      }
    })
    this.request.setLogger(logger)
    this.uri = 'https://api.graphcms.com/simple/v1/cjcdvzcre0ten0153t5t60tsg'
  }

  _getPostDate (query) {
    return {
      uri: this.uri,
      data: {
        query: query
      }
    }
  }

  async createTournament ({date, players, numberOfSets}) {
    const response = await this.request.post(this._getPostDate(createTournamentQuery({date, numberOfSets})))
    const data = await response.json()
    const tournamentId = data.data.createTournament.id

    await this.request.post(this._getPostDate(addPlayersToTournamentQuery({tournamentId, players})))
    return tournamentId
  }

  async createMatches ({matches}) {
    const response = await this.request.post(this._getPostDate(createMultipleMatchesQuery({matches})))
    const data = await response.json()
    return data.data
  }

  async updateMatches ({matches}) {
    await this.request.post(this._getPostDate(updateMultipleMatchesQuery({matches})))
  }

  async createSets ({sets}) {
    const response = await this.request.post(this._getPostDate(createMultipleSetsQuery({sets})))
    const data = await response.json()
    return data.data
  }

  async connectSetsToSets ({sets}) {
    const response = await this.request.post(this._getPostDate(addWinnerLoserSetsToSetsQuery({sets})))
    const data = await response.json()
    return data.data
  }

  async connectMatchesToSets ({sets}) {
    const response = await this.request.post(this._getPostDate(addMatchesToSetsQuery({sets})))
    const data = await response.json()
    return data.data
  }

  async connectPlayersToMatches ({sets}) {
    const response = await this.request.post(this._getPostDate(addPlayersToMatchesQuery({sets})))
    const data = await response.json()
    return data.data
  }

  async connectSetsToTournament ({sets, tournamentId}) {
    const response = await this.request.post(this._getPostDate(addSetsToTournamentQuery({sets, tournamentId})))
    const data = await response.json()
    return data.data
  }
}
