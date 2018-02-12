import _ from 'lodash'
import { ACTIONS } from './action_types'

const initialState = {
  editMatchesOpen: false,
  editSetMatchesId: '',
  editSetMatchesName: '',

  // First Match
  firstMatchId: '',
  firstMatchFirstCharacter: '',
  firstMatchSecondCharacter: '',
  firstMatchWinner: '',

  // Second Match
  secondMatchId: '',
  secondMatchFirstCharacter: '',
  secondMatchSecondCharacter: '',
  secondMatchWinner: '',

  // Third Match
  thirdMatchId: '',
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
        firstMatchId: '',
        firstMatchFirstCharacter: '',
        firstMatchSecondCharacter: '',
        firstMatchWinner: '',

        secondMatchId: '',
        secondMatchFirstCharacter: '',
        secondMatchSecondCharacter: '',
        secondMatchWinner: '',

        thirdMatchId: '',
        thirdMatchFirstCharacter: '',
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
