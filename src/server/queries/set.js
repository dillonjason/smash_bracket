import _ from 'lodash'

export const createSetQuery = () => `
  mutation {
    createSet(isPublished: true) {
      id
    }
  }
`

export const createMultipleSetsQuery = ({sets}) => {
  const adds = _.map(sets, set => `
    ALIAS_${set}: createSet(isPublished: true) {
      id
    }
  `).join(' ')

  return `
    mutation {
      ${adds}
    }
  `
}

export const addMatchesToSetQuery = ({setId, matches}) => {
  const adds = _.map(matches, match => `
    ${match}: addToMatches(matchesMatchId: "${match}", setSetId: "${setId}") {
      matchesMatch {
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

export const addMatchesToSetsQuery = ({sets}) => {
  const adds = _.map(sets, set => `
    ${_.map(set.matches, match => `
      ${match.id}: addToMatches(matchesMatchId: "${match.id}", setSetId: "${set.id}") {
        matchesMatch {
          id
        }
      }
    `).join(' ')}
  `).join(' ')

  return `
    mutation {
      ${adds}
    }
  `
}

export const addWinnerLoserSetsToSetsQuery = ({sets}) => {
  const adds = _.map(sets, set => {
    let query = ''

    const winnerSet = set.winnerSet
    if (winnerSet) {
      query += `
        ${set.id}_winner: addToWinnerSet(winnerSetSetId: "${winnerSet}", winnerFromSetsSetId: "${set.id}") {
          winnerSetSet {
            id
          }
        }
      `
    }

    const loserSet = set.loserSet
    if (loserSet) {
      query += `
        ${set.id}_loser: addToLoserSet(loserSetSetId: "${loserSet}", loserFromSetsSetId: "${set.id}") {
          loserSetSet {
            id
          }
        }
      `
    }

    return query
  }).join(' ')

  return `
    mutation {
      ${adds}
    }
  `
}
