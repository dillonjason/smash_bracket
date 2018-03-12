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
    ALIAS_${set.id}: createSet(isPublished: true, name: "${set.name}") {
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

    const optionalSet = set.optionalSet
    if (optionalSet) {
      query += `
        ${set.id}_optional: setOptionalSet(optionalSetSetId: "${optionalSet}", optionalFromSetSetId: "${set.id}") {
          optionalSetSet {
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

export const getSetProgress = ({set}) => (`
    query {
      Set(id: "${set}") {
        id,
        tournament {
          id
        },
        matches {
          firstPlayer {
            id
          }
          secondPlayer {
            id
          }
        },
        winnerFromSets {
          id,
          matches {
            firstPlayer {
              id
            }
            secondPlayer {
              id
            }
          }
          setWinner {
            id
          }
          winnerFromSets {
            id
          }
          loserFromSets {
            id
          }
        },
        winnerSet {
          id,
          matches {
            id
            firstPlayer {
              id
            }
            secondPlayer {
              id
            }
          }
        }
        loserSet {
          id
          matches {
            id
            firstPlayer {
              id
            }
            secondPlayer {
              id
            }
          }
        }
        optionalSet {
          id
        }
        optionalFromSet {
          id
        }
      }
    }
  `
)

export const getSetMatches = ({set}) => (`
  query {
    Set(id: "${set}") {
      id,
      matches {
        id
      }
    }
  }
`)

export const updateSetWinner = ({set, setWinner}) => {
  return `
    mutation {
      updateSet(id: "${set}", setWinnerId: "${setWinner}") {
        id
      }
    }
  `
}
