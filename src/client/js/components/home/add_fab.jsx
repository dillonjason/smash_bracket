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

export const AddFabComponent = ({classes, toggleAddTournament, disableAddTournament}) => {
  return (
    <Button variant='fab' color='secondary' aria-label='add' className={classes.fab} onClick={toggleAddTournament} disabled={disableAddTournament}>
      <Icon>add</Icon>
    </Button>
  )
}

AddFabComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleAddTournament: PropTypes.func.isRequired,
  disableAddTournament: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  disableAddTournament: state.home.disableAddTournament
})

const mapDispatchToProps = (dispatch) => ({
  toggleAddTournament: bindActionCreators(toggleAddTournament, dispatch)
})

export const AddFab = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(AddFabComponent))
