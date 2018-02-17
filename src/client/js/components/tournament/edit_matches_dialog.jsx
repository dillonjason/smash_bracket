import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import flow from 'lodash/flow'
import map from 'lodash/map'

import {toggleEditMatches, clearFormField, submitEditMatches} from './../../store/tournament/actions'

import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle} from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import Slide from 'material-ui/transitions/Slide'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'

import {Loading} from '../shared/loading'
import {EditMatchForm} from './edit_match_form'

const Transition = (props) => (
  <Slide direction='up' {...props} />
)

const EditMatchesDialogComponent = ({editMatchesOpen, editSetMatchesName, toggleEditMatches, clearFormField, submitEditMatches, data}) => {
  const {loading, error, Set} = data

  const clearAndClose = () => {
    toggleEditMatches()
    clearFormField()
  }

  return (
    <Dialog
      open={editMatchesOpen}
      transition={Transition}
      keepMounted
      onClose={clearAndClose}
      aria-labelledby='edit-matches-dialog-title'
      aria-describedby='edit-matches-dialog-description'
    >
      <DialogTitle id='edit-matches-dialog-title'>
        Edit Matches for {editSetMatchesName}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='edit-matches-dialog-description'>
          Fill out the form and click submit to update set matches
        </DialogContentText>
        {loading && <Loading />}
        {error && 'Error'}
        {Set && map(Set.matches, (match, index) => (
          [
            <Typography type='subheading'>
              Match {index + 1}
            </Typography>,
            <EditMatchForm key={match.id} matchId={match.id} matchIndex={index} />,
            <Divider />
          ]
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={clearAndClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={submitEditMatches} color='primary'>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

EditMatchesDialogComponent.propTypes = {
  data: PropTypes.object.isRequired,
  editMatchesOpen: PropTypes.bool.isRequired,
  editSetMatchesName: PropTypes.string.isRequired,
  editSetMatchesId: PropTypes.string.isRequired, // eslint-disable-line
  toggleEditMatches: PropTypes.func.isRequired,
  clearFormField: PropTypes.func.isRequired,
  submitEditMatches: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  editMatchesOpen: state.tournament.editMatchesOpen,
  editSetMatchesName: state.tournament.editSetMatchesName
})

const mapDispatchToProps = (dispatch) => ({
  toggleEditMatches: bindActionCreators(toggleEditMatches, dispatch),
  clearFormField: bindActionCreators(clearFormField, dispatch),
  submitEditMatches: bindActionCreators(submitEditMatches, dispatch)
})

const query = gql`
  query EditMatchesDialog($editSetMatchesId: ID) {
    Set(id: $editSetMatchesId) {
      id
      matches {
        id
      }
    }
  }
`

const redux = connect(mapStateToProps, mapDispatchToProps)
const apollo = graphql(query)

export const EditMatchesDialog = flow([
  redux,
  apollo
])(EditMatchesDialogComponent)
