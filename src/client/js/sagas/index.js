import { all } from 'redux-saga/effects'

import { homeSaga } from './home_saga'
import { tournamentSaga } from './tournament_saga'

export function * rootSaga () {
  yield all([
    homeSaga(),
    tournamentSaga()
  ])
}
