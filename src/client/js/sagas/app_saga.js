import { takeEvery } from 'redux-saga'
import { put } from 'redux-saga/effects'

import {Api} from '../util/api'

// Store Imports
import { ACTIONS } from '../store/app/action_types'
import { dataLoaded } from '../store/app/actions'

function * fetchMockData () {
  try {
    const mockData = yield Api.getMockData()
    console.log('Returned\n', mockData)
    yield put(dataLoaded(mockData))
  } catch (error) {
    console.error('Data Load Failed', error)
  }
}

export function * appSaga  () {
  yield takeEvery(ACTIONS.FETCH_INIT_DATA, fetchMockData)
}
