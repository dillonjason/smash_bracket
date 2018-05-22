import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'

export const TreeRound = ({round, multiplier}) => (
  <ul>
    {map(round, set => (
      <li key={set.id}>
        {set.name}
      </li>
    ))}
  </ul>
)

TreeRound.propTypes = {
  round: PropTypes.array.isRequired,
  multiplier: PropTypes.number.isRequired
}
