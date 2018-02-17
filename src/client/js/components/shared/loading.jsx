import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { CircularProgress } from 'material-ui/Progress'

const styles = {
  container: {
    textAlign: 'center'
  }
}

export const LoadingComponent = ({classes}) => {
  return (
    <div className={classes.container}>
      <CircularProgress size={50} />
    </div>
  )
}

LoadingComponent.propTypes = {
  classes: PropTypes.object.isRequired
}

export const Loading = withStyles(styles)(LoadingComponent)
