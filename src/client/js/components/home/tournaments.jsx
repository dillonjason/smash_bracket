import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import flow from 'lodash/flow'

import {TournamentsTable} from './tournaments_table'
import { AddTournamentDialog } from './add_tournament_dialog'

import {Loading} from '../shared/loading'

export class TournamentsComponent extends Component {
  render () {
    const {loading, error, allTournaments, refetch} = this.props.data

    return (
      <div className='tournaments-component'>
        {loading && <Loading />}
        {error && 'Error'}
        {allTournaments && <TournamentsTable tournaments={allTournaments} refetch={refetch} />}
        <AddTournamentDialog refetch={refetch} />
      </div>
    )
  }
}

TournamentsComponent.propTypes = {
  data: PropTypes.object.isRequired
}

const query = gql`
  query {
    allTournaments(orderBy: date_DESC) {
      id
      setsRemaining
      firstPlace {
        name
      }
      date
    }
  }
`

const apollo = graphql(query)

export const Tournaments = flow([
  apollo
])(TournamentsComponent)
