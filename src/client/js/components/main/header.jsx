import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import {withStyles} from 'material-ui/styles'

const styles = theme => ({
  flex: {
    flex: 1
  },
  link: {
    textDecoration: 'none'
  },
  button: {
    color: theme.palette.common.white,
    margin: theme.spacing.unit
  }
})

export const HeaderComponent = ({classes}) => {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant='title' color='inherit' className={classes.flex}>
          Smash Brackets
        </Typography>
        <Link to={`/`} className={classes.link}>
          <Button className={classes.button}>Tournaments</Button>
        </Link>
        <Link to={`/players`} className={classes.link}>
          <Button className={classes.button}>Players</Button>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

HeaderComponent.propTypes = {
  classes: PropTypes.object.isRequired
}

export const Header = withStyles(styles)(HeaderComponent)
