import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import get from 'lodash/get'
import forEach from 'lodash/forEach'
import find from 'lodash/find'
import filter from 'lodash/filter'
import isEmpty from 'lodash/isEmpty'
import flow from 'lodash/flow'
import pick from 'lodash/pick'

import Tree from 'react-d3-tree'

import {toggleEditMatches} from './../../store/tournament/actions'

import {Loading} from '../shared/loading'

const setPlayerNames = ({attributes, set, isFromWinner}) => {
  const prefix = isFromWinner ? 'Winner Of' : 'Loser Of'
  let playerName = `${prefix} ${get(set, 'name')}`
  const winnerId = get(set, 'setWinner.id')

  if (winnerId) {
    if (isFromWinner) {
      playerName = get(set, 'setWinner.name')
    } else {
      playerName = winnerId === get(set, 'firstPlayer.id') ? get(set, 'secondPlayer.name') : get(set, 'firstPlayer.name')
    }
  }

  if (attributes.firstPlayer) {
    attributes.secondPlayer = playerName
  } else {
    attributes.firstPlayer = playerName
  }
}

const getSetAttributes = ({set}) => pick(set, ['id', 'name'])

const generateTournamentTree = ({Tournament, set, endBranch}) => {
  const setData = find(Tournament.sets, tournamentSet => tournamentSet.id === set.id)

  if ((isEmpty(setData.winnerFromSets) && isEmpty(setData.loserFromSets)) || endBranch) {
    return endBranch
      ? {
        attributes: {...getSetAttributes({set: setData})}
      }
      : {
        attributes: {
          ...getSetAttributes({set: setData}),
          playerOne: get(setData, 'matches.0.firstPlayer.name'),
          playerTwo: get(setData, 'matches.0.secondPlayer.name')
        }
      }
  } else {
    const children = []
    const attributes = {...getSetAttributes({set: setData})}
    const setHasBye = setData.winnerFromSets.length === 1
    const setLosersStart = setData.loserFromSets.length === 2

    forEach(setData.winnerFromSets, fromSet => {
      const fromSetData = find(Tournament.sets, tournamentSet => tournamentSet.id === fromSet.id)
      setPlayerNames({attributes, set: fromSetData, isFromWinner: true})
      
      children.push({
        name: get(fromSetData, 'name'),
        ...generateTournamentTree({Tournament, set: fromSetData})
      })
    })

    forEach(setData.loserFromSets, fromSet => {
      const fromSetData = find(Tournament.sets, tournamentSet => tournamentSet.id === fromSet.id)
      setPlayerNames({attributes, set: fromSetData, isFromWinner: false})
      
      if (!setLosersStart) {
        children.push({
          name: get(fromSetData, 'name'),
          ...generateTournamentTree({Tournament, set: fromSetData, endBranch: setHasBye})
        })
      }
    })
    
    return {attributes, children}
  }
}

const onSetClick = ({attributes, toggleEditMatches}) => {
  toggleEditMatches({
    id: attributes.id,
    name: attributes.name
  })
}

export const BracketComponent = ({data, toggleEditMatches}) => {
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
          <Tree
            data={treeData}
            collapsible={false}
            pathFunc={'elbow'}
            nodeSvgShape={{
              shape: 'rect',
              shapeProps: {
                width: 20,
                height: 20,
                x: -10,
                y: -10
              }
            }}
            onClick={({attributes}) => onSetClick({attributes, toggleEditMatches})}
          />
        </div>
      }
    </div>
  )
}

BracketComponent.propTypes = {
  data: PropTypes.object.isRequired,
  toggleEditMatches: PropTypes.func.isRequired
}

const query = gql`
  query Bracket($tournamentId: ID) {
    Tournament(id: $tournamentId) {
      id
      date
      sets {
        id
        name
        setWinner {
          id
          name
        }
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
            id
            name
          }
          secondPlayer {
            id
            name
          }
        }
      }
    }
  }
`

const mapDispatchToProps = (dispatch) => ({
  toggleEditMatches: bindActionCreators(toggleEditMatches, dispatch)
})

const redux = connect(null, mapDispatchToProps)
const apollo = graphql(query)

export const Bracket = flow([
  redux,
  apollo
])(BracketComponent)
