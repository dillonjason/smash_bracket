import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import moment from 'moment'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import flow from 'lodash/flow'

import {toggleDeleteTournament} from '../../store/tournament/actions'

import {Loading} from '../shared/loading'

import {Bracket} from './bracket'
import {EditMatchesDialog} from './edit_matches_dialog'
import {DeleteWarning} from './delete_warning'

export const ContainerComponent = ({data, editSetMatchesId, toggleDeleteTournament}) => {
  const {loading, error, Tournament} = data
  let tournamentName = ''

  if (Tournament) {
    tournamentName = moment(Tournament.date, 'YYYY-MM-DD').format('MMMM DD, YYYY')
  }

  return (
    <Grid item xs={12} style={{display: 'flex', flexDirection: 'column'}} className='bracket-component'>
      {loading && <Loading />}
      {error && 'Error'}
      {Tournament && [
        <div style={{display: 'flex'}} key='title'>
          <Typography variant='display1' style={{flex: '1'}}>
            {tournamentName} Tournament
          </Typography>
          <Button variant='raised' color='secondary' onClick={() => toggleDeleteTournament({id: Tournament.id})}>
            Delete Tournament
          </Button>
        </div>,
        <Bracket tournamentId={Tournament.id} key='bracket' />,
        editSetMatchesId && <EditMatchesDialog editSetMatchesId={editSetMatchesId} key='edit-matches-dialog' />,
        <DeleteWarning tournamentName={tournamentName} key='delete-warning' />
      ]}
    </Grid>
  )
}

ContainerComponent.propTypes = {
  data: PropTypes.object.isRequired,
  editSetMatchesId: PropTypes.string.isRequired,
  toggleDeleteTournament: PropTypes.func.isRequired
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

const mapDispatchToProps = (dispatch) => ({
  toggleDeleteTournament: bindActionCreators(toggleDeleteTournament, dispatch)
})

const redux = connect(mapStateToProps, mapDispatchToProps)
const apollo = graphql(query)

export const Container = flow([
  redux,
  apollo
])(ContainerComponent)
