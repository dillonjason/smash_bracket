import { ACTIONS } from './action_types'

export function toggleAddTournament () {
  return {
    type: ACTIONS.TOGGLE_ADD_TOURNAMENT
  }
}

export function updateFormField ({field, value}) {
  return {
    type: ACTIONS.UPDATE_TOURNAMENT_ADD_FORM_FIELD,
    field,
    value
  }
}

export function clearFormField () {
  return {
    type: ACTIONS.CLEAR_TOURNAMENT_ADD_FORM_FIELD
  }
}

export function submitAddTournament (refetch) {
  return {
    type: ACTIONS.CREATE_TOURNAMENT,
    refetch
  }
}

export function disableAddTournament (disabled) {
  return {
    type: ACTIONS.DISABLE_ADD_TOURNAMENT,
    disabled
  }
}
