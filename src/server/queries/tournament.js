import _ from 'lodash'

export const createTournamentQuery = ({date, numberOfSets}) => `
  mutation {
    createTournament(date: "${date}", setsRemaining: ${numberOfSets}, isPublished: true) {
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

export const deleteTournamentQuery = ({id, sets, matches}) => {
  const deleteTournament = `
    deleteTournament: deleteTournament(id: "${id}") {
      id
    }
  `

  const deleteSets = _.map(sets, set => `
    DELETE_SET_${set.id}: deleteSet(id: "${set.id}") {
        id
      }
    `).join(' ')

  const deleteMatches = _.map(matches, match => `
    DELETE_MATCH_${match.id}: deleteMatch(id: "${match.id}") {
        id
      }
    `).join(' ')

  return `
    mutation {
      ${deleteTournament}  
      ${deleteSets}
      ${deleteMatches}
    }
  `
}

export const getTournamentSetsQuery = ({id}) => `
  query {
    Tournament(id: "${id}") {
      sets {
        id,
        matches {
          id
        }
      }
    }
  }
`
