import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import flow from 'lodash/flow'

import {toggleGlobalSnackbar} from '../../store/app/actions'

import Snackbar from 'material-ui/Snackbar'

const GlobalSnackBarComponent = ({showGlobalSnackbar, snackbarMessage}) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    open={showGlobalSnackbar}
    autoHideDuration={3000}
    message={snackbarMessage}
    onClose={toggleGlobalSnackbar}
  />
)

GlobalSnackBarComponent.propTypes = {
  showGlobalSnackbar: PropTypes.bool.isRequired,
  snackbarMessage: PropTypes.string.isRequired
}

const mapStateToProp = (state) => ({
  snackbarMessage: state.app.snackbarMessage,
  showGlobalSnackbar: state.app.showGlobalSnackbar
})

const mapDispatchToProps = (dispatch) => ({
  toggleGlobalSnackbar: bindActionCreators(toggleGlobalSnackbar, dispatch)
})

const redux = connect(mapStateToProp, mapDispatchToProps)

export const GlobalSnackBar = flow([
  redux
])(GlobalSnackBarComponent)
