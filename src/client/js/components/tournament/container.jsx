import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import {connect} from 'react-redux'
import moment from 'moment'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import flow from 'lodash/flow'

import {Loading} from '../shared/loading'

import {Bracket} from './bracket'
import {EditMatchesDialog} from './edit_matches_dialog'

export const ContainerComponent = ({data, editSetMatchesId}) => {
  const {loading, error, Tournament} = data

  return (
    <Grid item xs={12} style={{display: 'flex', flexDirection: 'column'}} className='bracket-component'>
      {loading && <Loading />}
      {error && 'Error'}
      {Tournament && [
        <Typography variant='display1' key='title'>
          {moment(Tournament.date, 'YYYY-MM-DD').format('MMMM DD, YYYY')} Tournament
        </Typography>,
        <Bracket tournamentId={Tournament.id} key='bracket' />,
        editSetMatchesId && <EditMatchesDialog editSetMatchesId={editSetMatchesId} key='edit-matches-dialog' />
      ]}
    </Grid>
  )
}

ContainerComponent.propTypes = {
  data: PropTypes.object.isRequired,
  editSetMatchesId: PropTypes.string.isRequired
}

const query = gql`
  query Bracket($tournamentId: ID) {
    Tournament(id: $tournamentId) {
      id
      date
    }
  }
`

const mapStateToProps = (state) => ({
  editSetMatchesId: state.tournament.editSetMatchesId
})

const redux = connect(mapStateToProps)
const apollo = graphql(query)

export const Container = flow([
  redux,
  apollo
])(ContainerComponent)
