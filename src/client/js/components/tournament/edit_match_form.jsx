import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import flow from 'lodash/flow'
import get from 'lodash/get'

import {withStyles} from 'material-ui/styles'
import {FormLabel, FormControl, FormControlLabel} from 'material-ui/Form'
import Radio, {RadioGroup} from 'material-ui/Radio'

import {CharacterSelect} from './../shared/character_select'
import {Loading} from '../shared/loading'
import {ApolloError} from '../shared/apollo_error'

import {updateFormField} from '../../store/tournament/actions'

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200
  }
})

class EditMatchFormComponent extends Component {
  constructor (props) {
    super(props)
    this.prefixes = ['first', 'second', 'third']
  }

  componentDidMount () {
    this.props.updateFormField({
      field: `${this.prefixes[this.props.matchIndex]}MatchId`,
      value: this.props.matchId
    })
  }

  componentDidUpdate (prevProps) {
    if (this.props.data.Match) {
      const thisMatchData = this.props.matchData[this.props.matchIndex]
      const dbMatchData = this.props.data.Match

      if (!thisMatchData.matchFirstCharacter && get(dbMatchData, 'firstPlayerCharacter.id', '')) {
        this.props.updateFormField({
          field: `${this.prefixes[this.props.matchIndex]}MatchFirstCharacter`,
          value: get(dbMatchData, 'firstPlayerCharacter.id', '')
        })
      }

      if (!thisMatchData.matchSecondCharacter && get(dbMatchData, 'secondPlayerCharacter.id', '')) {
        this.props.updateFormField({
          field: `${this.prefixes[this.props.matchIndex]}MatchSecondCharacter`,
          value: get(dbMatchData, 'secondPlayerCharacter.id', '')
        })
      }

      if (!thisMatchData.matchWinner && get(dbMatchData, 'winner.id', '')) {
        this.props.updateFormField({
          field: `${this.prefixes[this.props.matchIndex]}MatchWinner`,
          value: get(dbMatchData, 'winner.id', '')
        })
      }
    }
  }

  render () {
    const {data, classes, matchIndex, matchData, updateFormField} = this.props
    const {loading, error, Match, refetch} = data
    const matchPrefix = this.prefixes[matchIndex]
    const thisMatchData = matchData[matchIndex]

    const handleChange = ({event, field}) => {
      const value = event.target.value
      updateFormField({
        field: `${matchPrefix}${field}`,
        value
      })
    }

    const handleRadioChange = ({event}) => {
      const winner = event.target.value
      const loser = get(Match, 'firstPlayer.id') === winner ? get(Match, 'secondPlayer.id') : get(Match, 'firstPlayer.id')

      updateFormField({
        field: `${matchPrefix}MatchWinner`,
        value: winner
      })

      updateFormField({
        field: `${matchPrefix}MatchLoser`,
        value: loser
      })
    }

    return (
      <div className='add-tournament-form-component'>
        {loading && <Loading />}
        {error && <ApolloError refetch={refetch} />}
        {Match &&
          <form>
            <CharacterSelect
              id={`${Match.id}_player_1_character`}
              label={`${get(Match, 'firstPlayer.name', 'Unknown')}'s Character`}
              value={thisMatchData.matchFirstCharacter}
              onChange={event => handleChange({event, field: 'MatchFirstCharacter'})}
            />

            <CharacterSelect
              id={`${Match.id}_player_2_character`}
              label={`${get(Match, 'secondPlayer.name', 'Unknown')}'s Character`}
              value={thisMatchData.matchSecondCharacter}
              onChange={event => handleChange({event, field: 'MatchSecondCharacter'})}
            />

            <FormControl className={classes.formControl}>
              <FormLabel>Winner</FormLabel>
              <RadioGroup
                row
                name={`${Match.id}_winner`}
                value={thisMatchData.matchWinner}
                onChange={event => handleRadioChange({event, field: 'MatchWinner'})}
              >
                <FormControlLabel
                  value={`${get(Match, 'firstPlayer.id')}`}
                  control={<Radio />}
                  label={`${get(Match, 'firstPlayer.name', 'Unknown')}`}
                />
                <FormControlLabel
                  value={`${get(Match, 'secondPlayer.id')}`}
                  control={<Radio />}
                  label={`${get(Match, 'secondPlayer.name', 'Unknown')}`}
                />
              </RadioGroup>
            </FormControl>
          </form>
        }
      </div>
    )
  }
}

EditMatchFormComponent.propTypes = {
  matchId: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  matchIndex: PropTypes.number.isRequired,
  matchData: PropTypes.array.isRequired,
  updateFormField: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  matchData: [
    {
      matchFirstCharacter: state.tournament.firstMatchFirstCharacter,
      matchSecondCharacter: state.tournament.firstMatchSecondCharacter,
      matchWinner: state.tournament.firstMatchWinner
    },
    {
      matchFirstCharacter: state.tournament.secondMatchFirstCharacter,
      matchSecondCharacter: state.tournament.secondMatchSecondCharacter,
      matchWinner: state.tournament.secondMatchWinner
    },
    {
      matchFirstCharacter: state.tournament.thirdMatchFirstCharacter,
      matchSecondCharacter: state.tournament.thirdMatchSecondCharacter,
      matchWinner: state.tournament.thirdMatchWinner
    }
  ]
})

const mapDispatchToProps = (dispatch) => ({
  updateFormField: bindActionCreators(updateFormField, dispatch)
})

const query = gql`
  query EditMatchForm($matchId: ID) {
    Match(id: $matchId) {
      id
      winner {
        id
      }
      firstPlayer {
        id
        name
      }
      firstPlayerCharacter {
        id
      }
      secondPlayer {
        id
        name
      }
      secondPlayerCharacter {
        id
      }
    }
  }
`

const redux = connect(mapStateToProps, mapDispatchToProps)
const apollo = graphql(query)
const styleWrapper = withStyles(styles, {withTheme: true})

export const EditMatchForm = flow([
  redux,
  apollo,
  styleWrapper
])(
  EditMatchFormComponent
)
