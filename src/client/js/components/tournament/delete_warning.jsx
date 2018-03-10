import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import flow from 'lodash/flow'

import Button from 'material-ui/Button'
import Dialog, {DialogTitle, DialogContent, DialogContentText, DialogActions} from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide'

import {submitDeleteTournament, toggleDeleteTournament} from '../../store/tournament/actions'

const Transition = (props) => (
  <Slide direction='up' {...props} />
)

export const DeleteWarningComponent = ({tournamentName, deleteTournamentOpen, submitDeleteTournament, toggleDeleteTournament}) => {
  return (
    <Dialog
      open={deleteTournamentOpen}
      transition={Transition}
      keepMounted
      onClose={toggleDeleteTournament}
      aria-labelledby='edit-matches-dialog-title'
      aria-describedby='edit-matches-dialog-description'
    >
      <DialogTitle id='edit-matches-dialog-title'>
        Are you sure you want to remove the {tournamentName} Tournament
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='edit-matches-dialog-description'>
          You are not able to undo this action.  Any and all data associated with this tournament will be removed.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleDeleteTournament} color='primary'>
          Cancel
        </Button>
        <Button onClick={submitDeleteTournament} color='primary'>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

DeleteWarningComponent.propTypes = {
  tournamentName: PropTypes.string.isRequired,
  deleteTournamentOpen: PropTypes.bool.isRequired,
  submitDeleteTournament: PropTypes.func.isRequired,
  toggleDeleteTournament: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  deleteTournamentOpen: state.tournament.deleteTournamentOpen
})

const mapDispatchToProps = (dispatch) => ({
  submitDeleteTournament: bindActionCreators(submitDeleteTournament, dispatch),
  toggleDeleteTournament: bindActionCreators(toggleDeleteTournament, dispatch)
})

const redux = connect(mapStateToProps, mapDispatchToProps)

export const DeleteWarning = flow([
  redux
])(DeleteWarningComponent)
