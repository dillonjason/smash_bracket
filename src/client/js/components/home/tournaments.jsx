import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import flow from 'lodash/flow'
import {TournamentsTable} from './tournaments_table'
import { AddTournamentDialog } from './add_tournament_dialog'
import {homeDataReloaded} from './../../store/home/actions'

export class TournamentsComponent extends Component {
  componentDidUpdate () {
    if (this.props.reloadHomeData) {
      this.props.data.refetch()
      this.props.homeDataReloaded()
    }
  }

  render () {
    const {loading, error, allTournaments} = this.props.data

    return (
      <div className='tournaments-component'>
        {loading && 'Loading...'}
        {error && 'Error'}
        {allTournaments && <TournamentsTable tournaments={allTournaments} />}
        <AddTournamentDialog />
      </div>
    )
  }
}

TournamentsComponent.propTypes = {
  data: PropTypes.object.isRequired,
  reloadHomeData: PropTypes.bool.isRequired,
  homeDataReloaded: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  reloadHomeData: state.home.reloadHomeData
})

const mapDispatchToProps = (dispatch) => ({
  homeDateReloaded: bindActionCreators(homeDataReloaded, dispatch)
})

const query = gql`
  query {
    allTournaments {
      id
      setsRemaining
      firstPlace {
        name
      }
      date
    }
  }
`

const redux = connect(mapStateToProps, mapDispatchToProps)
const apollo = graphql(query)

export const Tournaments = flow([
  redux,
  apollo
])(TournamentsComponent)
