import _ from 'lodash'

export const createTournamentQuery = ({date}) => `
  mutation {
    createTournament(date: "${date}", isPublished: true) {
      id
    }
  }
`

export const addPlayersToTournamentQuery = ({tournamentId, players}) => {
  const adds = _.map(players, player => `
    ${player}: addToPlayers(playersPlayerId: "${player}", tournamentsTournamentId: "${tournamentId}") {
      tournamentsTournament {
        id
      }
    }
  `).join(' ')

  return `
    mutation {
      ${adds}
    }
  `
}

export const addSetsToTournamentQuery = ({tournamentId, sets}) => {
  const adds = _.map(sets, set => `
  ${set.id}: addToSets(setsSetId: "${set.id}", tournamentTournamentId: "${tournamentId}") {
      tournamentTournament {
        id
      }
    }
  `).join(' ')

  return `
    mutation {
      ${adds}
    }
  `
}
