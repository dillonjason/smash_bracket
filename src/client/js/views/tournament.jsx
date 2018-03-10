import React from 'react'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid'

import { Container } from '../components/tournament/container'

export const Tournament = ({match}) => (
  <Grid container className='tournament-view'>
    <Container tournamentId={match.params.tournamentId} />
  </Grid>
)

Tournament.propTypes = {
  match: PropTypes.object.isRequired
}
