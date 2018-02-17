import React, {Component} from 'react'
import {Route} from 'react-router-dom'

import {Header} from './../components/main/header'

// Views
import {Home} from './home'
import {PlayersView} from './players'
import {Tournament} from './tournament'

export class Main extends Component {
  render () {
    return (
      <div className='main-view' style={{height: '100%'}}>
        <Header />
        <div className='content'>
          <Route exact path='/' component={Home} />
          <Route path='/players' component={PlayersView} />
          <Route path='/tournament/:tournamentId' component={Tournament} />
        </div>
      </div>
    )
  }
}
