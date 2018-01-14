import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import {PlayersTable} from './players_table'

export const PlayersComponent = ({data}) => {
  const {loading, error, allPlayers} = data

  return (
    <div className='tournaments-component'>
      {loading && 'Loading...'}
      {error && 'Error'}
      {allPlayers && <PlayersTable players={allPlayers} />}
    </div>
  )
}

PlayersComponent.propTypes = {
  data: PropTypes.object.isRequired
}

const query = gql`
  query {
    allPlayers {
      id
      name
      characters {
        name
        icon {
          url
        }
      }
      _matchWinsMeta {
        count
      }
      _firstPlayerMatchesMeta {
        count
      }
      _secondPlayerMatchesMeta {
        count
      }
      _winningSetsMeta {
        count
      }
      _firstPlaceTournamentsMeta {
        count
      }
      _secondPlaceTournamentsMeta {
        count
      }
      _thirdPlaceTournamentsMeta {
        count
      }
      _tournamentsMeta {
        count
      }
    }
  }
`

export const Players = graphql(query)(PlayersComponent)
