import React, {Component} from 'react'
import PropTypes from 'prop-types'

import map from 'lodash/map'

import {TreeHeader} from './tree_header'
import {TreeRound} from './tree_round'

export class Tree extends Component {
  render () {
    return (
      <div className='tree-component'>
        <div className='headers'>
          {map(this.props.rounds, (round, index) => <TreeHeader key={index}>Round {index + 1}</TreeHeader>)}
        </div>
        <div className='brackets'>
          {map(this.props.rounds, (round, index) => <TreeRound key={index} round={round} multiplier={index + 1} />)}
        </div>
      </div>
    )
  }
}

Tree.propTypes = {
  rounds: PropTypes.array.isRequired
}
