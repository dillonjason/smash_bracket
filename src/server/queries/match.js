import _ from 'lodash'

export const createMatchQuery = ({firstPlayer, secondPlayer}) => `
  mutation {
    createMatch(firstPlayer: "${firstPlayer}", secondPlayer: "${secondPlayer}", isPublished: true) {
      id
    }
  }
`

export const createMultipleMatchesQuery = ({matches}) => {
  const adds = _.map(matches, match => `
    ALIAS_${match}: createMatch(isPublished: true) {
      id
    }
  `).join(' ')

  return `
    mutation {
      ${adds}
    }
  `
}

export const updateMultipleMatchesQuery = ({matches}) => {
  const adds = _.map(matches, match => `
    ALIAS_${match.id}: updateMatch(id: "${match.id}", firstPlayerCharacterId: "${match.firstCharacter}", secondPlayerCharacterId: "${match.secondCharacter}", winnerId: "${match.winner}") {
      id
    }
  `).join(' ')

  return `
    mutation {
      ${adds}
    }
  `
}

export const addPlayersToMatchesQuery = ({sets}) => {
  const adds = _.map(sets, set => `
    ${_.map(set.matches, match => {
    let query = ''
    
    if (match.firstPlayer) {
      query += `
        ${match.id}_first: addToFirstPlayer(firstPlayerPlayerId: "${match.firstPlayer}", firstPlayerMatchesMatchId: "${match.id}") {
          firstPlayerMatchesMatch {
            id
          }
        }
      `
    }

    if (match.secondPlayer) {
      query += `
        ${match.id}_second: addToSecondPlayer(secondPlayerPlayerId: "${match.secondPlayer}", secondPlayerMatchesMatchId: "${match.id}") {
          secondPlayerMatchesMatch {
            id
          }
        }
      `
    }

    return query
  }).join(' ')}
  `).join(' ')

  return `
    mutation {
      ${adds}
    }
  `
}
