import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import {connect} from 'react-redux'
import moment from 'moment'
import Typography from 'material-ui/Typography'
import flow from 'lodash/flow'

import {Loading} from '../shared/loading'

import {Bracket} from './bracket'
import {EditMatchesDialog} from './edit_matches_dialog'

export const ContainerComponent = ({data, editSetMatchesId}) => {
  const {loading, error, Tournament} = data

  return (
    <div className='bracket-component'>
      {loading && <Loading />}
      {error && 'Error'}
      {Tournament && <div>
        <Typography type='display1'>
          {moment(Tournament.date, 'YYYY-MM-DD').format('MMMM DD, YYYY')} Tournament
        </Typography>
        <Bracket tournamentId={Tournament.id} />
        {editSetMatchesId && <EditMatchesDialog editSetMatchesId={editSetMatchesId} />}
      </div>}
    </div>
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
