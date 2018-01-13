import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'

import {Home} from './home'
import {Test} from './test'

export class Main extends Component {
  render () {
    console.log('Main')
    return (
      <div>
        <Link to='/smash_bracket'>Home</Link>
        <Link to='/smash_bracket/test'>Test</Link>
        <Route exact path='/smash_bracket' component={Home} />
        <Route path='/smash_bracket/test' component={Test} />
      </div>
    )
  }
}
