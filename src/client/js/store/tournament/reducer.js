import _ from 'lodash'
import { ACTIONS } from './action_types'

const initialState = {
  editMatchesOpen: false,
  editSetMatchesId: '',
  editSetMatchesName: '',

  // First Match
  firstMatchFirstCharacter: '',
  firstMatchSecondCharacter: '',
  firstMatchWinner: '',

  // Second Match
  secondMatchFirstCharacter: '',
  secondMatchSecondCharacter: '',
  secondMatchWinner: '',

  // Third Match
  thirdMatchFirstCharacter: '',
  thirdMatchSecondCharacter: '',
  thirdMatchWinner: ''
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

    case ACTIONS.CLEAR_MATCH_EDIT_FORM_FIELD:
      return _.merge({}, state, {
        firstMatchfirstCharacter: '',
        firstMatchSecondCharacter: '',
        firstMatchWinner: '',
        secondMatchfirstCharacter: '',
        secondMatchSecondCharacter: '',
        secondMatchWinner: '',
        thirdMatchfirstCharacter: '',
        thirdMatchSecondCharacter: '',
        thirdMatchWinner: ''
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
