import './shims/promise.js'
import 'babel-polyfill'
import 'phantomjs-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {ApolloProvider} from 'react-apollo'
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles'

import Root from './root'
import { configureStore } from './store/store'
import {theme} from './theme'
import {client} from './apollo_client'

const store = configureStore()
const appTheme = createMuiTheme(theme)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider theme={appTheme}>
        <ApolloProvider client={client}>
          <Root />
        </ApolloProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)
