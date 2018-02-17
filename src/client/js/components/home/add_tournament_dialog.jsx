import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {toggleAddTournament, clearFormField, submitAddTournament} from './../../store/home/actions'

import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle} from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import Slide from 'material-ui/transitions/Slide'

import {AddTournamentForm} from './add_tournament_form'

const Transition = (props) => (
  <Slide direction='up' {...props} />
)

const AddTournamentDialogComponent = ({addTournamentOpen, toggleAddTournament, clearFormField, submitAddTournament}) => {
  const clearAndClose = () => {
    toggleAddTournament()
    clearFormField()
  }

  return (
    <Dialog
      open={addTournamentOpen}
      transition={Transition}
      keepMounted
      onClose={clearAndClose}
      aria-labelledby='add-tournament-dialog-title'
      aria-describedby='add-tournament-dialog-description'
    >
      <DialogTitle id='add-tournament-dialog-title'>
        Add Tournament
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='add-tournament-dialog-description'>
          Fill out the form and click submit to add a tournament
        </DialogContentText>
        <AddTournamentForm />
      </DialogContent>
      <DialogActions>
        <Button onClick={clearAndClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={submitAddTournament} color='primary'>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

AddTournamentDialogComponent.propTypes = {
  addTournamentOpen: PropTypes.bool.isRequired,
  toggleAddTournament: PropTypes.func.isRequired,
  clearFormField: PropTypes.func.isRequired,
  submitAddTournament: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  addTournamentOpen: state.home.addTournamentOpen
})

const mapDispatchToProps = (dispatch) => ({
  toggleAddTournament: bindActionCreators(toggleAddTournament, dispatch),
  clearFormField: bindActionCreators(clearFormField, dispatch),
  submitAddTournament: bindActionCreators(submitAddTournament, dispatch)
})

export const AddTournamentDialog = connect(mapStateToProps, mapDispatchToProps)(AddTournamentDialogComponent)
