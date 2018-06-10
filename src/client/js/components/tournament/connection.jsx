import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui'

const styles = {
  incoming: {

  },
  outgoing: {

  }
}

const ConnectionComponent = ({classes, incoming, outgoing}) => (
  <div className={`${incoming && classes.incoming} ${outgoing && classes.outgoing}`} />
)

ConnectionComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  incoming: PropTypes.bool,
  outgoing: PropTypes.bool
}

export const Connection = withStyles(styles)(ConnectionComponent)
