import _ from 'lodash'
import { ACTIONS } from './action_types'

const initialState = {
  reloadHomeData: false,
  addTournamentOpen: false,

  date: new Date(),
  players: []
}

function reducer (state = initialState, action) {
  let newState

  switch (action.type) {
    case ACTIONS.TOGGLE_ADD_TOURNAMENT:
      return _.merge({}, state, {addTournamentOpen: !state.addTournamentOpen})

    case ACTIONS.UPDATE_TOURNAMENT_ADD_FORM_FIELD:
      newState = _.cloneDeep(state)
      _.set(newState, action.field, action.value)

      return newState

    case ACTIONS.CLEAR_TOURNAMENT_ADD_FORM_FIELD:
      newState = _.cloneDeep(state)
      _.set(newState, 'date', new Date())
      _.set(newState, 'players', [])

      return newState

    case ACTIONS.RELOAD_HOME_DATA:
      return _.merge({}, state, {reloadHomeData: true})

    case ACTIONS.HOME_DATA_RELOADED:
      return _.merge({}, state, {reloadHomeData: false})

    default:
      return state
  }
}

export default reducer
