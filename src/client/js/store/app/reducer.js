import _ from 'lodash'
import { ACTIONS } from './action_types'

const initialState = {
  isLoaded: false,

  showGlobalSnackbar: false,
  snackbarMessage: ''
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case ACTIONS.DATA_LOADED:
      return _.merge({}, state, {isLoaded: true}, action.data)

    case ACTIONS.TOGGLE_GLOBAL_SNACKBAR:
      return _.merge({}, state, {
        showGlobalSnackbar: !state.showGlobalSnackbar,
        snackbarMessage: action.message
      })

    default:
      return state
  }
}

export default reducer
