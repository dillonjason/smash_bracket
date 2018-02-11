import { ACTIONS } from './action_types'

export function toggleEditMatches ({id, name} = {}) {
  return {
    type: ACTIONS.TOGGLE_EDIT_MATCHES,
    id: id || '',
    name: name || ''
  }
}

export function updateFormField ({field, value}) {
  return {
    type: ACTIONS.UPDATE_MATCH_EDIT_FORM_FIELD,
    field,
    value
  }
}

export function clearFormField () {
  return {
    type: ACTIONS.CLEAR_MATCH_EDIT_FORM_FIELD
  }
}

export function submitEditMatches () {
  return {
    type: ACTIONS.SUBMIT_EDIT_MATCHES
  }
}
