import React, {Component} from 'react'
import PropTypes from 'prop-types'

import map from 'lodash/map'

import {TreeHeader} from './tree_header'

export class Tree extends Component {
  render () {
    return (
      <div className='tree-component'>
        <div className='headers'>
          {map(this.props.rounds, (round, index) => <TreeHeader>Round {index + 1}</TreeHeader>)}
        </div>
        <div className='brackets'>
          {map(this.props.rounds, (round, index) => <TreeRound round={round} multiplier={index + 1} />)}
        </div>
      </div>
    )
  }
}

Tree.propTypes = {
  rounds: PropTypes.array.isRequired
}
