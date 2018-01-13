import React, { Component } from 'react'

export default class Hello extends Component {
  render () {
    let { isLoaded } = this.props

    return (
      <div>
        <h1>Hello this is the smash_bracket project!</h1>
        <p>{ isLoaded ? 'Data Loaded!' : 'Data Loading...'}</p>
        <button>ui-tk button</button>
      </div>
    )
  }
}

Hello.propTypes = {
  isLoaded: React.PropTypes.bool.isRequired
}
