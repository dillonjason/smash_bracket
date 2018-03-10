import { takeEvery } from 'redux-saga'
import { put, select } from 'redux-saga/effects'
import pick from 'lodash/pick'

import {Api} from '../util/api'

// Store Imports
import { ACTIONS } from '../store/home/action_types'
import {clearFormField, toggleAddTournament, disableAddTournament} from '../store/home/actions'

function * createTournament ({refetch}) {
  try {
    yield put(disableAddTournament(true))
    yield put(toggleAddTournament())
    const data = yield select(state => pick(state.home, ['date', 'players']))
    yield Api.postCreateTournament({data})
    yield refetch()
    yield put(clearFormField())
    yield put(disableAddTournament(false))
  } catch (error) {
    console.error('Post Failed', error)
  }
}

export function * homeSaga () {
  yield takeEvery(ACTIONS.CREATE_TOURNAMENT, createTournament)
}
