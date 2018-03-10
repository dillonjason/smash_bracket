import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Card, { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'

const styles = {
  card: {
    width: '200px',
    height: '125px'
  }
}

export const NodeComponent = ({ nodeData, classes }) => (
  <Card className={classes.card}>
    <CardContent>
      <Typography variant='headline' component='h2'>
        {nodeData.name}
      </Typography>
      <Typography component='p'>
        {!nodeData.attributes.firstPlayer && <span>Placeholder Game</span>}
        {nodeData.attributes.firstPlayer && <span>{nodeData.attributes.firstPlayer}</span>}
        {nodeData.attributes.secondPlayer && <span><br />vs<br />{nodeData.attributes.secondPlayer}</span>}
      </Typography>
    </CardContent>
  </Card>
)

NodeComponent.propTypes = {
  nodeData: PropTypes.object,
  classes: PropTypes.object
}

export const Node = withStyles(styles)(NodeComponent)
