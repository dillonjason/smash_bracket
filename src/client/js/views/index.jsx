import React, {Component} from 'react'
import {Route} from 'react-router-dom'

import {Header} from './../components/main/header'

// Views
import {Home} from './home'

export class Main extends Component {
  render () {
    return (
      <div className='main-view'>
        <Header />
        <div className='content'>
          <Route exact path='/smash_bracket' component={Home} />
        </div>
      </div>
    )
  }
}
