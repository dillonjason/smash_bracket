import React, {Component} from 'react'
import PropTypes from 'prop-types'

import map from 'lodash/map'

import { withStyles } from 'material-ui/styles'

import {TreeHeader} from './tree_header'
import {TreeRound} from './tree_round'

const styles = (theme) => ({
  headers: {
    display: 'flex',
    flexDirection: 'row'
  },
  brackets: {
    display: 'flex',
    flexDirection: 'row'
  }
})

class TreeComponent extends Component {
  render () {
    return (
      <div className='tree-component'>
        <div className={this.props.classes.headers}>
          {map(this.props.rounds, (round, index) => <TreeHeader key={index}>Round {index + 1}</TreeHeader>)}
        </div>
        <div className={this.props.classes.brackets}>
          {map(this.props.rounds, (round, index) => <TreeRound key={index} round={round} multiplier={index + 1} />)}
        </div>
      </div>
    )
  }
}

TreeComponent.propTypes = {
  rounds: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
}

export const Tree = withStyles(styles)(TreeComponent)
