import React from 'react'
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

import {updateFormField} from '../../store/tournament/actions'

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200
  }
})

const EditMatchFormComponent = ({data, classes, matchIndex, matchData, updateForFmield}) => {
  const {loading, error, Match} = data
  const prefixes = ['first', 'second', 'third']
  const matchPrefix = prefixes[matchIndex]
  const thisMatchData = matchData[matchIndex]

  const handleChange = ({event, field}) => {
    const value = event.target.value
    updateForFmield({
      field: `${matchPrefix}${field}`,
      value
    })
  }

  return (
    <div className='add-tournament-form-component'>
      {loading && <Loading />}
      {error && 'Error'}
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
              onChange={event => handleChange({event, field: 'MatchWinner'})}
            >
              <FormControlLabel
                value={`${get(Match, 'firstPlayer.id')}`}
                control={<Radio />}
                label={`${get(Match, 'firstPlayer.name')}`}
              />
              <FormControlLabel
                value={`${get(Match, 'secondPlayer.id')}`}
                control={<Radio />}
                label={`${get(Match, 'secondPlayer.name')}`}
              />
            </RadioGroup>
          </FormControl>
        </form>
      }
    </div>
  )
}

EditMatchFormComponent.propTypes = {
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  matchIndex: PropTypes.number.isRequired,
  matchData: PropTypes.array.isRequired,
  updateForFmield: PropTypes.func.isRequired
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
  updateForFmield: bindActionCreators(updateFormField, dispatch)
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
        characters {
          id
        }
      }
      firstPlayerCharacter {
        id
        icon {
          url
        }
      }
      secondPlayer {
        id
        name
        characters {
          id
        }
      }
      secondPlayerCharacter {
        id
        icon {
          url
        }
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
