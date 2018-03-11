import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import get from 'lodash/get'
import forEach from 'lodash/forEach'
import find from 'lodash/find'
import filter from 'lodash/filter'
import isEmpty from 'lodash/isEmpty'
import flow from 'lodash/flow'
import pick from 'lodash/pick'

import Tree from 'react-d3-tree'

import Snackbar from 'material-ui/Snackbar'

import { Node } from './node'

import { toggleEditMatches } from './../../store/tournament/actions'

import { Loading } from '../shared/loading'

export class BracketComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      translate: undefined,
      snackbarOpen: false
    }

    this.onSetClick = this.onSetClick.bind(this)
  }

  componentDidMount () {
    const dimensions = this.treeContainer.getBoundingClientRect()
    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: dimensions.height / 2
      }
    })
  }

  componentDidUpdate () {
    if (this.props.data.Tournament) {
      const {refetch} = this.props.data
      this.props.liftRefech({refetch})
    }
  }

  setPlayerNames ({ attributes, set, isFromWinner }) {
    const prefix = isFromWinner ? 'Winner Of' : 'Loser Of'
    let playerName = `${prefix} ${get(set, 'name')}`
    let playerReady = false
    const winnerId = get(set, 'setWinner.id')
  
    if (winnerId) {
      playerReady = true
      if (isFromWinner) {
        playerName = get(set, 'setWinner.name')
      } else {
        playerName = winnerId === get(set, 'firstPlayer.id') ? get(set, 'secondPlayer.name') : get(set, 'firstPlayer.name')
      }
    }
  
    if (attributes.firstPlayer) {
      attributes.secondPlayer = playerName
      attributes.secondPlayerReady = playerReady
    } else {
      attributes.firstPlayer = playerName
      attributes.firstPlayerReady = playerReady
    }
  }
  
  getSetAttributes ({ set }) {
    return pick(set, ['id', 'name'])
  }
  
  generateTournamentTree ({ Tournament, set, endBranch }) {
    const setData = find(Tournament.sets, tournamentSet => tournamentSet.id === set.id)
  
    if ((isEmpty(setData.winnerFromSets) && isEmpty(setData.loserFromSets)) || endBranch) {
      return endBranch
        ? {
          attributes: {
            ...this.getSetAttributes({ set: setData }),
            firstPlayerReady: Boolean(get(setData, 'matches.0.firstPlayer.name')),
            secondPlayerReady: Boolean(get(setData, 'matches.0.firstPlayer.name'))
          }
        }
        : {
          attributes: {
            ...this.getSetAttributes({ set: setData }),
            firstPlayer: get(setData, 'matches.0.firstPlayer.name'),
            firstPlayerReady: Boolean(get(setData, 'matches.0.firstPlayer.name')),
            secondPlayer: get(setData, 'matches.0.secondPlayer.name'),
            secondPlayerReady: Boolean(get(setData, 'matches.0.secondPlayer.name'))
          }
        }
    } else {
      const children = []
      const attributes = {
        ...this.getSetAttributes({ set: setData }),
        firstPlayer: get(setData, 'matches.0.firstPlayer.name'),
        firstPlayerReady: Boolean(get(setData, 'matches.0.firstPlayer.name')),
        secondPlayer: get(setData, 'matches.0.secondPlayer.name'),
        secondPlayerReady: Boolean(get(setData, 'matches.0.secondPlayer.name'))
      }
      const setHasBye = setData.winnerFromSets.length <= 1
      const setLosersStart = setData.loserFromSets.length === 2
      const numPlayers = setData.winnerFromSets.length + setData.loserFromSets.length
  
      forEach(setData.winnerFromSets, fromSet => {
        const fromSetData = find(Tournament.sets, tournamentSet => tournamentSet.id === fromSet.id)
        this.setPlayerNames({ attributes, set: fromSetData, isFromWinner: true })
  
        children.push({
          name: get(fromSetData, 'name'),
          ...this.generateTournamentTree({ Tournament, set: fromSetData })
        })
      })
  
      forEach(setData.loserFromSets, fromSet => {
        const fromSetData = find(Tournament.sets, tournamentSet => tournamentSet.id === fromSet.id)
        this.setPlayerNames({ attributes, set: fromSetData, isFromWinner: false })
  
        if (!setLosersStart && numPlayers === 2) {
          children.push({
            name: get(fromSetData, 'name'),
            ...this.generateTournamentTree({ Tournament, set: fromSetData, endBranch: setHasBye })
          })
        }
      })
  
      return { attributes, children }
    }
  }
  
  onSetClick ({ attributes }) {
    if (attributes.firstPlayerReady && attributes.secondPlayerReady) {
      this.props.toggleEditMatches({
        id: attributes.id,
        name: attributes.name
      })
    } else {
      this.setState({snackbarOpen: true})
    }
  }

  render () {
    const { loading, error, Tournament } = this.props.data
    const treeData = []

    if (Tournament) {
      const finalSets = filter(Tournament.sets, set => !set.winnerSet && !set.loserSet)
      const finalSet = find(finalSets, set => find(Tournament.sets, otherSet => get(otherSet, 'winnerSet.id', '') === set.id))

      treeData.push({
        name: finalSet.name,
        ...this.generateTournamentTree({ Tournament, set: finalSet })
      })
    }

    return (
      <div style={{ flex: '1' }} ref={tc => (this.treeContainer = tc)}>
        {loading && <Loading />}
        {error && 'Error'}
        {Tournament &&
          <Tree
            data={treeData}
            collapsible={false}
            pathFunc={'elbow'}
            nodeSvgShape={{
              shape: 'none'
            }}
            nodeSize={{
              x: 250,
              y: 150
            }}
            allowForeignObjects
            nodeLabelComponent={{
              render: <Node />,
              foreignObjectWrapper: {
                x: -88,
                y: -63
              }
            }}
            separation={{
              siblings: 2,
              nonSiblings: 3
            }}
            zoom={0.6}
            translate={this.state.translate}
            onClick={this.onSetClick}
          />
        }
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={3000}
          message='Previous sets need to finish'
          onClose={() => this.setState({snackbarOpen: false})}
        />
      </div>
    )
  }
}

BracketComponent.propTypes = {
  liftRefech: PropTypes.func.isRequired,
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
