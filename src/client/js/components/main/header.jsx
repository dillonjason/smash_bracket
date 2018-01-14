import React from 'react'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

export const Header = () => {
  return (
    <AppBar>
      <Toolbar>
        <Typography type='title' color='inherit'>
          Smash Brackets
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
