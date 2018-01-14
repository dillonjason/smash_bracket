import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {withRouter} from 'react-router-dom'

import 'app.scss'

import {fetchInitData} from './store/app/actions'

import {Main} from './views'

export class Root extends Component {
  componentDidMount () {
    this.props.fetchInitData()
  }

  render () {
    return (
      <Main />
    )
  }
}

Root.propTypes = {
  fetchInitData: React.PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    isLoaded: state.app.isLoaded
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchInitData: bindActionCreators(fetchInitData, dispatch)
  }
}

// Wrap the component to inject dispatch and state into it
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root))
