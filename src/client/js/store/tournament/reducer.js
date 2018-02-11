import _ from 'lodash'
import { ACTIONS } from './action_types'

const initialState = {
  editMatchesOpen: false,
  editSetMatchesId: '',
  editSetMatchesName: ''
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case ACTIONS.TOGGLE_EDIT_MATCHES:
      return _.merge({}, state, {
        editMatchesOpen: !state.editMatchesOpen,
        editSetMatchesId: action.id,
        editSetMatchesName: action.name
      })

    default:
      return state
  }
}

export default reducer
