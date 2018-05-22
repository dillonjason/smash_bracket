import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'

export const TreeRound = ({round, multiplier}) => (
  <ul>
    {map(round, set => (
      <li>
        
      </li>
    ))}
  </ul>
)

TreeRound.prop
