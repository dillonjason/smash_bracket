import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

import map from 'lodash/map'
import first from 'lodash/first'
import get from 'lodash/get'

import { withStyles } from 'material-ui/styles'

import {Connection} from './connection'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '200px',
    alignItems: 'center',
    listStyleType: 'none',
    paddingLeft: 0
  }
}

export const TreeRoundComponent = ({round, multiplier, classes}) => (
  <ul className={classes.container}>
    {map(round, set => (
      // <Fragment>
      //   {multiplier > 0 ? <Connection incoming /> : null}
        <li key={set.id}>
          {set.name}
          <p>
            {get(first(set.matches), 'firstPlayer.name', '')}
            {get(first(set.matches), 'secondPlayer.name', '')}
          </p>
        </li>
      //   <Connection outgoing />
      // </Fragment>
    ))}
  </ul>
)

TreeRoundComponent.propTypes = {
  round: PropTypes.array.isRequired,
  multiplier: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired
}

export const TreeRound = withStyles(styles)(TreeRoundComponent)
