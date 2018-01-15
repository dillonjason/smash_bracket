import React from 'react'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid'

import { Container } from '../components/tournament/container'

export const Tournament = ({match}) => (
  <div className='tournament-view'>
    <Grid container>
      <Grid item xs={12}>
        <Container tournamentId={match.params.tournamentId} />
      </Grid>
    </Grid>
  </div>
)

Tournament.propTypes = {
  match: PropTypes.object.isRequired
}
