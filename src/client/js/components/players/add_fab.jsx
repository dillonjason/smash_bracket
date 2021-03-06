import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'
import {withStyles} from 'material-ui/styles'

const styles = (theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
})

export const AddFabComponent = ({classes}) => {
  return (
    <Button variant='fab' color='secondary' aria-label='add' className={classes.fab}>
      <Icon>add</Icon>
    </Button>
  )
}

AddFabComponent.propTypes = {
  classes: PropTypes.object.isRequired
}

export const AddFab = withStyles(styles, {withTheme: true})(AddFabComponent)
