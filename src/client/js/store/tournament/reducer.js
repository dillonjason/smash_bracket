import _ from 'lodash'
import { ACTIONS } from './action_types'

const initialState = {
  deleteTournamentOpen: false,
  deleteTournamentId: '',

  editMatchesOpen: false,
  editSetMatchesId: '',
  editSetMatchesName: '',

  // First Match
  firstMatchId: '',
  firstMatchFirstCharacter: '',
  firstMatchSecondCharacter: '',
  firstMatchWinner: '',
  firstMatchLoser: '',

  // Second Match
  secondMatchId: '',
  secondMatchFirstCharacter: '',
  secondMatchSecondCharacter: '',
  secondMatchWinner: '',
  secondMatchLoser: '',

  // Third Match
  thirdMatchId: '',
  thirdMatchFirstCharacter: '',
  thirdMatchSecondCharacter: '',
  thirdMatchWinner: '',
  thirdMatchLoser: ''
}

function reducer (state = initialState, action) {
  let newState

  switch (action.type) {
    case ACTIONS.TOGGLE_EDIT_MATCHES:
      return _.merge({}, state, {
        editMatchesOpen: !state.editMatchesOpen,
        editSetMatchesId: action.id,
        editSetMatchesName: action.name
      })

    case ACTIONS.TOGGLE_DELETE_TOURNAMENT:
      return _.merge({}, state, {
        deleteTournamentOpen: !state.deleteTournamentOpen,
        deleteTournamentId: action.id
      })

    case ACTIONS.CLEAR_MATCH_EDIT_FORM_FIELD:
      return _.merge({}, state, {
        firstMatchId: '',
        firstMatchFirstCharacter: '',
        firstMatchSecondCharacter: '',
        firstMatchWinner: '',
        firstMatchLoser: '',

        secondMatchId: '',
        secondMatchFirstCharacter: '',
        secondMatchSecondCharacter: '',
        secondMatchWinner: '',
        secondMatchLoser: '',

        thirdMatchId: '',
        thirdMatchFirstCharacter: '',
        thirdMatchSecondCharacter: '',
        thirdMatchWinner: '',
        thirdMatchLoser: ''
      })

    case ACTIONS.UPDATE_MATCH_EDIT_FORM_FIELD:
      newState = _.cloneDeep(state)
      _.set(newState, action.field, action.value)

      return newState

    default:
      return state
  }
}

export default reducer
