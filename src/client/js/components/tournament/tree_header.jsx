import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

const styles = {
  container: {
    textAlign: 'center',
    width: '200px'
  }
}

const TreeHeaderComponent = ({children, classes}) => (
  <div className={`tree-header-component ${classes.container}`}>
    {children}
  </div>
)

TreeHeaderComponent.propTypes = {
  children: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
}

export const TreeHeader = withStyles(styles)(TreeHeaderComponent)
