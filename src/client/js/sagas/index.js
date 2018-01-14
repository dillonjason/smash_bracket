import { all } from 'redux-saga/effects'

import { appSaga } from './app_saga'
import { homeSaga } from './home_saga'

export function * rootSaga () {
  yield all([
    appSaga(),
    homeSaga()
  ])
}
