import _ from 'lodash'
import { ACTIONS } from './action_types'

const initialState = {
  reloadHomeData: false,
  addTournamentOpen: false,
  disableAddTournament: false,

  date: new Date(),
  players: [],

  optimistic: {}
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

    case ACTIONS.DISABLE_ADD_TOURNAMENT:
      return _.merge({}, state, {disableAddTournament: action.disabled})

    default:
      return state
  }
}

export default reducer
