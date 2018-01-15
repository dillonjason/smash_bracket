import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'
import {withStyles} from 'material-ui/styles'
import {toggleAddTournament} from './../../store/home/actions'

const styles = (theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
})

export const AddFabComponent = ({classes, toggleAddTournament}) => {
  return (
    <Button fab color='accent' aria-label='add' className={classes.fab} onClick={toggleAddTournament}>
      <Icon>add</Icon>
    </Button>
  )
}

AddFabComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleAddTournament: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  toggleAddTournament: bindActionCreators(toggleAddTournament, dispatch)
})

export const AddFab = connect(null, mapDispatchToProps)(withStyles(styles, {withTheme: true})(AddFabComponent))
