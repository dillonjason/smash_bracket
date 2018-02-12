import {Request} from './request'

const prefix = '/smash_bracket/api'
const request = new Request()

export class Api {
  static async postCreateTournament ({data}) {
    return request.post({uri: `${prefix}/createTournament`, data})
  }

  static async postUpdateMatches ({data}) {
    return request.post({uri: `${prefix}/updateMatches`, data})
  }
}
