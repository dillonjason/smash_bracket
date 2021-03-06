import { ACTIONS } from './action_types'

export function dataLoaded (data) {
  return {
    type: ACTIONS.DATA_LOADED,
    data
  }
}

export function fetchInitData () {
  return {
    type: ACTIONS.FETCH_INIT_DATA
  }
}

export function toggleGlobalSnackbar ({message} = {}) {
  return {
    type: ACTIONS.TOGGLE_GLOBAL_SNACKBAR,
    message: message || ''
  }
}
