import { takeEvery } from 'redux-saga'
import { put, select } from 'redux-saga/effects'
import pick from 'lodash/pick'

import {Api} from '../util/api'

// Store Imports
import { ACTIONS } from '../store/tournament/action_types'
import {clearFormField, toggleEditMatches, toggleDeleteTournament} from '../store/tournament/actions'

function * updateSetMatches () {
  try {
    const stateData = yield select(state => pick(state.tournament, [
      'editSetMatchesId',

      'firstMatchId',
      'firstMatchFirstCharacter',
      'firstMatchSecondCharacter',
      'firstMatchWinner',

      'secondMatchId',
      'secondMatchFirstCharacter',
      'secondMatchSecondCharacter',
      'secondMatchWinner',

      'thirdMatchId',
      'thirdMatchFirstCharacter',
      'thirdMatchSecondCharacter',
      'thirdMatchWinner'
    ]))

    const data = {
      set: stateData.editSetMatchesId,
      matches: [
        {
          id: stateData.firstMatchId,
          firstCharacter: stateData.firstMatchFirstCharacter,
          secondCharacter: stateData.firstMatchSecondCharacter,
          winner: stateData.firstMatchWinner
        },
        {
          id: stateData.secondMatchId,
          firstCharacter: stateData.secondMatchFirstCharacter,
          secondCharacter: stateData.secondMatchSecondCharacter,
          winner: stateData.secondMatchWinner
        },
        {
          id: stateData.thirdMatchId,
          firstCharacter: stateData.thirdMatchFirstCharacter,
          secondCharacter: stateData.thirdMatchSecondCharacter,
          winner: stateData.thirdMatchWinner
        }
      ]
    }

    yield Api.postUpdateMatches({data})
    yield put(toggleEditMatches())
    yield put(clearFormField())
  } catch (error) {
    console.error('Post Failed', error)
  }
}

function * deleteTournament () {
  try {
    const id = yield select(state => state.tournament.deleteTournamentId)
    yield put(toggleDeleteTournament())
    // yield Api.deleteTournament({id})
  } catch (error) {
    yield put(toggleDeleteTournament())
    console.error('Post Failed', error)
  }
}

export function * tournamentSaga () {
  yield takeEvery(ACTIONS.SUBMIT_UPDATE_MATCHES, updateSetMatches)
  yield takeEvery(ACTIONS.SUBMIT_DELETE_TOURNAMENT, deleteTournament)
}
