import {Request} from './request'
import {createTournamentQuery, addPlayersToTournamentQuery, addSetsToTournamentQuery, deleteTournamentQuery, getTournamentSetsQuery, setTournamentPlacingQuery} from '../queries/tournament'
import {createMultipleMatchesQuery, addPlayersToMatchesQuery, updateMultipleMatchesQuery} from '../queries/match'
import {createMultipleSetsQuery, addMatchesToSetsQuery, addWinnerLoserSetsToSetsQuery, updateSetWinner, getSetProgress, getSetMatches} from '../queries/set'

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

  _getPostData (query) {
    return {
      uri: this.uri,
      data: {
        query: query
      }
    }
  }

  async createTournament ({date, players, numberOfSets}) {
    const response = await this.request.post(this._getPostData(createTournamentQuery({date, numberOfSets})))
    const data = await response.json()
    const tournamentId = data.data.createTournament.id

    await this.request.post(this._getPostData(addPlayersToTournamentQuery({tournamentId, players})))
    return tournamentId
  }

  async createMatches ({matches}) {
    const response = await this.request.post(this._getPostData(createMultipleMatchesQuery({matches})))
    const data = await response.json()
    return data.data
  }

  async updateMatches ({matches}) {
    await this.request.post(this._getPostData(updateMultipleMatchesQuery({matches})))
  }

  async createSets ({sets}) {
    const response = await this.request.post(this._getPostData(createMultipleSetsQuery({sets})))
    const data = await response.json()
    return data.data
  }

  async connectSetsToSets ({sets}) {
    const response = await this.request.post(this._getPostData(addWinnerLoserSetsToSetsQuery({sets})))
    const data = await response.json()
    return data.data
  }

  async connectMatchesToSets ({sets}) {
    const response = await this.request.post(this._getPostData(addMatchesToSetsQuery({sets})))
    const data = await response.json()
    return data.data
  }

  async connectPlayersToMatches ({sets}) {
    const response = await this.request.post(this._getPostData(addPlayersToMatchesQuery({sets})))
    const data = await response.json()
    return data.data
  }

  async connectSetsToTournament ({sets, tournamentId}) {
    const response = await this.request.post(this._getPostData(addSetsToTournamentQuery({sets, tournamentId})))
    const data = await response.json()
    return data.data
  }

  async updateSetWinner ({set, setWinner, setLoser, winnersMatch, losersMatch}) {
    await this.request.post(this._getPostData(updateSetWinner({set, setWinner, setLoser, winnersMatch, losersMatch})))
  }

  async getTournamentSets ({id}) {
    const response = await this.request.post(this._getPostData(getTournamentSetsQuery({id})))
    const data = await response.json()

    return data.data.Tournament.sets
  }

  async deleteTournament ({id, sets, matches}) {
    await this.request.post(this._getPostData(deleteTournamentQuery({id, sets, matches})))
  }

  async getSetProgress ({set}) {
    const response = await this.request.post(this._getPostData(getSetProgress({set})))
    const data = await response.json()

    return data.data
  }

  async getSetMatches ({set}) {
    const response = await this.request.post(this._getPostData(getSetMatches({set})))
    const data = await response.json()

    return data.data
  }

  async setTournamentPlacing ({tournament, firstPlace, secondPlace, thirdPlace}) {
    await this.request.post(this._getPostData(setTournamentPlacingQuery({tournament, firstPlace, secondPlace, thirdPlace})))
  }
}
