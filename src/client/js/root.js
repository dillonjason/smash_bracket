import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import 'app.scss'

import {fetchInitData} from './store/app/actions'

import Hello from './components/hello'

export class Root extends Component {
  componentDidMount () {
    this.props.fetchInitData()
  }
  render () {
    return (
      <div className='grid-container clearfix'>
        <Hello isLoaded={this.props.isLoaded} />
      </div>
    )
  }
}

Root.propTypes = {
  isLoaded: React.PropTypes.bool.isRequired,
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
export default connect(mapStateToProps, mapDispatchToProps)(Root)
