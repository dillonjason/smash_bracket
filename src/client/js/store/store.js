import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducer'
import { rootSaga } from '../sagas/index'

const sagaMiddleware = createSagaMiddleware()

export function configureStore (initialState = {}) {
  let store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(sagaMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )

  sagaMiddleware.run(rootSaga)

  return store
}

export const store = configureStore()
