import { takeEvery } from 'redux-saga'
import { put, select } from 'redux-saga/effects'
import pick from 'lodash/pick'

import {Api} from '../util/api'

// Store Imports
import { ACTIONS } from '../store/tournament/action_types'
import {clearFormField, toggleEditMatches, toggleDeleteTournament} from '../store/tournament/actions'
import {toggleGlobalSnackbar} from '../store/app/actions'

function * updateSetMatches ({refetch}) {
  try {
    const stateData = yield select(state => pick(state.tournament, [
      'editSetMatchesId',

      'firstMatchId',
      'firstMatchFirstCharacter',
      'firstMatchSecondCharacter',
      'firstMatchWinner',
      'firstMatchLoser',

      'secondMatchId',
      'secondMatchFirstCharacter',
      'secondMatchSecondCharacter',
      'secondMatchWinner',
      'secondMatchLoser',

      'thirdMatchId',
      'thirdMatchFirstCharacter',
      'thirdMatchSecondCharacter',
      'thirdMatchWinner',
      'thirdMatchLoser'
    ]))

    const data = {
      set: stateData.editSetMatchesId,
      matches: [
        {
          id: stateData.firstMatchId,
          firstCharacter: stateData.firstMatchFirstCharacter,
          secondCharacter: stateData.firstMatchSecondCharacter,
          winner: stateData.firstMatchWinner,
          loser: stateData.firstMatchLoser
        },
        {
          id: stateData.secondMatchId,
          firstCharacter: stateData.secondMatchFirstCharacter,
          secondCharacter: stateData.secondMatchSecondCharacter,
          winner: stateData.secondMatchWinner,
          loser: stateData.secondMatchLoser
        },
        {
          id: stateData.thirdMatchId,
          firstCharacter: stateData.thirdMatchFirstCharacter,
          secondCharacter: stateData.thirdMatchSecondCharacter,
          winner: stateData.thirdMatchWinner,
          loser: stateData.thirdMatchLoser
        }
      ]
    }
    yield put(toggleEditMatches())
    yield put(clearFormField())
    yield Api.postUpdateMatches({data})
    yield refetch()
  } catch (error) {
    yield put(toggleGlobalSnackbar({message: 'Failed Updating Match'}))
  }
}

function * deleteTournament () {
  try {
    const id = yield select(state => state.tournament.deleteTournamentId)
    yield Api.deleteTournament({id})
    yield put(toggleDeleteTournament())
  } catch (error) {
    yield put(toggleDeleteTournament())
    yield put(toggleGlobalSnackbar({message: 'Failed Deleting Tournament'}))
  }
}

export function * tournamentSaga () {
  yield takeEvery(ACTIONS.SUBMIT_UPDATE_MATCHES, updateSetMatches)
  yield takeEvery(ACTIONS.SUBMIT_DELETE_TOURNAMENT, deleteTournament)
}
