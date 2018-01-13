import './shims/promise.js'
import 'babel-polyfill'
import 'phantomjs-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {BrowserRouter} from 'react-router-dom'

import Root from './root'
import { configureStore } from './store/store'

let store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)
