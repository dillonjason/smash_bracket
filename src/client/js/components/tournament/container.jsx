import React, {Component} from 'react'
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
import get from 'lodash/get'

import {toggleDeleteTournament} from '../../store/tournament/actions'

import {Loading} from '../shared/loading'
import {ApolloError} from '../shared/apollo_error'

import {Bracket} from './bracket'
import {EditMatchesDialog} from './edit_matches_dialog'
import {DeleteWarning} from './delete_warning'
import {Placing} from './placing'

export class ContainerComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      bracketRefetch: f => f
    }

    this.setBracketRefetch = this.setBracketRefetch.bind(this)
  }

  setBracketRefetch ({refetch}) {
    this.setState({
      bracketRefetch: refetch
    })
  }

  render () {
    const {data, editSetMatchesId, toggleDeleteTournament} = this.props
    const {loading, error, Tournament, refetch} = data
    let tournamentName = ''
    let hasPlacing = false
  
    if (Tournament) {
      tournamentName = moment(Tournament.date, 'YYYY-MM-DD').format('MMMM DD, YYYY')
      hasPlacing = Boolean(get(Tournament, 'firstPlace.name'))
    }
  
    return (
      <Grid item xs={12} style={{display: 'flex', flexDirection: 'column'}} className='bracket-component'>
        {loading && <Loading />}
        {error && <ApolloError refetch={refetch} />}
        {Tournament && [
          <div style={{display: 'flex'}} key='title'>
            <Typography variant='display2' style={{flex: '1'}}>
              {tournamentName} Tournament
            </Typography>
            <Button variant='raised' color='secondary' onClick={() => toggleDeleteTournament({id: Tournament.id})}>
              Delete Tournament
            </Button>
          </div>,
          hasPlacing && <Placing tournament={Tournament} key='placing' />,
          <Bracket tournamentId={Tournament.id} liftRefech={this.setBracketRefetch} key='bracket' />,
          editSetMatchesId && (
            <EditMatchesDialog
              editSetMatchesId={editSetMatchesId}
              key='edit-matches-dialog'
              bracketRefetch={this.state.bracketRefetch}
            />
          ),
          <DeleteWarning tournamentName={tournamentName} key='delete-warning' />
        ]}
      </Grid>
    )
  }
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
      firstPlace {
        name
      }
      secondPlace {
        name
      }
      thirdPlace {
        name
      }
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
