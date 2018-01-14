import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import {TournamentsTable} from './tournaments_table'

export const TournamentsComponent = ({data}) => {
  const {loading, error, allTournaments} = data

  return (
    <div className='tournaments-component'>
      {loading && 'Loading...'}
      {error && 'Error'}
      {allTournaments && <TournamentsTable tournaments={allTournaments} />}
    </div>
  )
}

TournamentsComponent.propTypes = {
  data: PropTypes.object.isRequired
}

const query = gql`
  query {
    allTournaments {
      id
      date
    }
  }
`

export const Tournaments = graphql(query)(TournamentsComponent)
