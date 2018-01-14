import React from 'react'
import Grid from 'material-ui/Grid'

import {AddFab} from '../components/players/add_fab'
import {Players} from '../components/players/players'

export const PlayersView = () => (
  <div className='players-view'>
    <Grid container>
      <Grid item xs={12}>
        <Players />
      </Grid>
    </Grid>
    <AddFab />
  </div>
)
