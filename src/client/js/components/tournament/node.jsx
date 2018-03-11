import React from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'

import { withStyles } from 'material-ui/styles'
import Card, { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'

const styles = (theme) => ({
  card: {
    width: '200px',
    height: '125px'
  },
  finishedNode: {
    backgroundColor: theme.palette.grey['400'],
    color: theme.palette.common.white
  },
  winner: {
    color: theme.palette.secondary.main
  }
})

export const NodeComponent = ({ nodeData, classes }) => {
  const winner = get(nodeData, 'attributes.winner')
  const firstPlayer = get(nodeData, 'attributes.firstPlayer')
  const secondPlayer = get(nodeData, 'attributes.secondPlayer')
  return (
    <Card className={`${classes.card} ${winner ? classes.finishedNode : ''}`}>
      <CardContent>
        <Typography variant='headline' component='h2'>
          {nodeData.name}
        </Typography>
        <Typography component='p'>
          {!firstPlayer && <span>Placeholder Game</span>}
          {firstPlayer && <span className={firstPlayer === winner ? classes.winner : ''}>{firstPlayer}</span>}
          {secondPlayer && <span><br />vs<br /><span className={secondPlayer === winner ? classes.winner : ''}>{secondPlayer}</span></span>}
        </Typography>
      </CardContent>
    </Card>
  )
}

NodeComponent.propTypes = {
  nodeData: PropTypes.object,
  classes: PropTypes.object
}

export const Node = withStyles(styles)(NodeComponent)
