import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import map from 'lodash/map'
import get from 'lodash/get'

import {Loading} from '../shared/loading'

export const BracketComponent = ({data}) => {
  const {loading, error, Tournament} = data
  const treeData = []

  if (Tournament) {

  }

  return (
    <div>
      {loading && <Loading />}
      {error && 'Error'}
      {Tournament && <div>
        {map(Tournament.sets, set => <p key={set.id}>
          <strong>{set.id}</strong>
          <br />
          <strong>Winner Set: </strong> {get(set, 'winnerSet.id', '')}
          <br />
          <strong>Losers Set: </strong> {get(set, 'loserSet.id', '')}
        </p>)}
      </div>}
    </div>
  )
}

BracketComponent.propTypes = {
  data: PropTypes.object.isRequired
}

const query = gql`
  query Bracket($tournamentId: ID) {
    Tournament(id: $tournamentId) {
      id
      date
      sets {
        id
        winnerSet {
          id
        }
        loserSet {
          id
        }
      }
    }
  }
`

export const Bracket = graphql(query)(BracketComponent)
