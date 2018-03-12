import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'

import Typography from 'material-ui/Typography'

export const Placing = ({tournament}) => {
  return (
    <div>
      <Typography variant='display1'>
        First Place: {get(tournament, 'firstPlace.name', 'Unknown')}
      </Typography>
      <Typography variant='display1'>
        Secondary Place: {get(tournament, 'secondPlace.name', 'Unknown')}
      </Typography>
      <Typography variant='display1'>
        Third Place: {get(tournament, 'thirdPlace.name', 'Unknown')}
      </Typography>
    </div>
  )
}

Placing.propTypes = {
  tournament: PropTypes.object.isRequired
}
