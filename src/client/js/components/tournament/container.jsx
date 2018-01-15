import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'
import Typography from 'material-ui/Typography'

import {Loading} from '../shared/loading'

import {Bracket} from './bracket'

export const ContainerComponent = ({data}) => {
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
      </div>}
    </div>
  )
}

ContainerComponent.propTypes = {
  data: PropTypes.object.isRequired
}

const query = gql`
  query Bracket($tournamentId: ID) {
    Tournament(id: $tournamentId) {
      id
      date
    }
  }
`

export const Container = graphql(query)(ContainerComponent)
