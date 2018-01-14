import React, { Component } from 'react'

import 'app.scss'

import {Main} from './views'

export class Root extends Component {
  render () {
    return (
      <Main />
    )
  }
}

// Wrap the component to inject dispatch and state into it
export default Root
