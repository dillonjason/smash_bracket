import _ from 'lodash'
import { ACTIONS } from './action_types'

const initialState = {
  isLoaded: false
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case ACTIONS.DATA_LOADED:
      return _.merge({}, state, {isLoaded: true}, action.data)

    default:
      return state
  }
}

export default reducer
