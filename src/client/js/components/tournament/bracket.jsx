import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

import get from 'lodash/get'
import forEach from 'lodash/forEach'
import find from 'lodash/find'
import filter from 'lodash/filter'
import isEmpty from 'lodash/isEmpty'

import Tree from 'react-d3-tree'

import {Loading} from '../shared/loading'

const setPlayerNames = ({attributes, set, prefix}) => {
  if (attributes.firstPlayer) {
    attributes.secondPlayer = `${prefix} ${get(set, 'name')}`
  } else {
    attributes.firstPlayer = `${prefix} ${get(set, 'name')}`
  }
}

const generateTournamentTree = ({Tournament, set, endBranch}) => {
  const setData = find(Tournament.sets, tournamentSet => tournamentSet.id === set.id)

  if ((isEmpty(setData.winnerFromSets) && isEmpty(setData.loserFromSets)) || endBranch) {
    return endBranch
      ? {}
      : {
        attributes: {
          playerOne: get(setData, 'matches.0.firstPlayer.name'),
          playerTwo: get(setData, 'matches.0.secondPlayer.name')
        }
      }
  } else {
    const children = []
    const attributes = {}
    const setHasBye = setData.winnerFromSets.length === 1
    const setLosersStart = setData.loserFromSets.length === 2

    forEach(setData.winnerFromSets, fromSet => {
      const fromSetData = find(Tournament.sets, tournamentSet => tournamentSet.id === fromSet.id)
      setPlayerNames({attributes, set: fromSetData, prefix: 'Winner of'})
      
      children.push({
        name: get(fromSetData, 'name'),
        ...generateTournamentTree({Tournament, set: fromSet})
      })
    })

    forEach(setData.loserFromSets, fromSet => {
      const fromSetData = find(Tournament.sets, tournamentSet => tournamentSet.id === fromSet.id)
      setPlayerNames({attributes, set: fromSetData, prefix: 'Loser of'})
      
      if (!setLosersStart) {
        children.push({
          name: get(fromSetData, 'name'),
          ...generateTournamentTree({Tournament, set: fromSet, endBranch: setHasBye})
        })
      }
    })
    
    return {attributes, children}
  }
}

export const BracketComponent = ({data}) => {
  const {loading, error, Tournament} = data
  const treeData = []

  if (Tournament) {
    const finalSets = filter(Tournament.sets, set => !set.winnerSet && !set.loserSet)
    const finalSet = find(finalSets, set => find(Tournament.sets, otherSet => get(otherSet, 'winnerSet.id', '') === set.id))

    treeData.push({
      name: finalSet.name,
      ...generateTournamentTree({Tournament, set: finalSet})
    })
  }

  return (
    <div>
      {loading && <Loading />}
      {error && 'Error'}
      {Tournament &&
        <div style={{height: '500px'}}>
          {/* {map(Tournament.sets, set => <p key={set.id}>
            <strong>{set.id}</strong>
            <br />
            <strong>Winner Set: </strong> {get(set, 'winnerSet.id', '')}
            <br />
            <strong>Losers Set: </strong> {get(set, 'loserSet.id', '')}
          </p>)} */}
          <Tree
            data={treeData}
            collapsible={false}
          />
        </div>
      }
    </div>
  )
}

BracketComponent.propTypes = {
  data: PropTypes.object.isRequired
}

const query = gql`
  query Bracket($tournamentId: ID) {
    Tournament(id: $tournamentId) {
      id
      date
      sets {
        id
        name
        winnerSet {
          id
        }
        winnerFromSets {
          id
        }
        loserSet {
          id
        }
        loserFromSets {
          id
        }
        matches {
          firstPlayer {
            name
          }
          secondPlayer {
            name
          }
        }
      }
    }
  }
`

export const Bracket = graphql(query)(BracketComponent)
