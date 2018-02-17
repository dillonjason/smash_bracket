import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import moment from 'moment'

import TextField from 'material-ui/TextField'
import {withStyles} from 'material-ui/styles'

import {MultiSelect} from './../shared/multi_select'
import {Loading} from '../shared/loading'

import {updateFormField} from '../../store/home/actions'

const styles = theme => ({
  form: {
    marginTop: theme.spacing.unit
  },
  textField: {
    width: 300,
    marginBottom: theme.spacing.unit
  }
})

const AddTournamentFormComponent = ({classes, data, date, players, updateFormField}) => {
  const {loading, error, allPlayers} = data

  const onDateChange = (event) => {
    updateFormField({field: 'date', value: event.target.value})
  }

  const onPlayersChange = (event) => {
    updateFormField({field: 'players', value: event.target.value})
  }

  return (
    <div className='add-tournament-form-component'>
      {loading && <Loading />}
      {error && 'Error'}
      {allPlayers &&
        <div className={classes.form}>
          <TextField
            label='Tournament Start Date'
            type='date'
            value={moment(date).format('YYYY-MM-DD')}
            className={classes.textField}
            onChange={onDateChange}
          />
          <MultiSelect
            className={classes.textField}
            inputId='add-tournament-players-select'
            label='Players'
            value={players}
            options={allPlayers}
            optionKey='id'
            optionText='name'
            onChange={onPlayersChange}
          />
        </div>
      }
    </div>
  )
}

AddTournamentFormComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  date: PropTypes.object,
  players: PropTypes.array,
  updateFormField: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  date: state.home.date,
  players: state.home.players
})

const mapDispatchToProps = (dispatch) => ({
  updateFormField: bindActionCreators(updateFormField, dispatch)
})

const query = gql`
  query {
    allPlayers {
      id
      name
    }
  }
`

export const AddTournamentForm = connect(mapStateToProps, mapDispatchToProps)(
  graphql(query)(
    withStyles(styles, {withTheme: true})(
      AddTournamentFormComponent
    )
  )
)
