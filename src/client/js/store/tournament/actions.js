import { ACTIONS } from './action_types'

export function toggleEditMatches ({id, name} = {}) {
  return {
    type: ACTIONS.TOGGLE_EDIT_MATCHES,
    id: id || '',
    name: name || ''
  }
}

export function toggleDeleteTournament ({id} = {}) {
  return {
    type: ACTIONS.TOGGLE_DELETE_TOURNAMENT,
    id: id || ''
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

export function submitEditMatches (refetch) {
  return {
    type: ACTIONS.SUBMIT_UPDATE_MATCHES,
    refetch
  }
}

export function submitDeleteTournament () {
  return {
    type: ACTIONS.SUBMIT_DELETE_TOURNAMENT
  }
}
