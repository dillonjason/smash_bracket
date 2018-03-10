import React from 'react'
import Grid from 'material-ui/Grid'

import {AddFab} from '../components/home/add_fab'
import { Tournaments } from '../components/home/tournaments'

export const Home = () => (
  <div className='home-view' style={{display: 'flex', flex: '1'}}>
    <Grid container>
      <Grid item xs={12}>
        <Tournaments />
      </Grid>
    </Grid>
    <AddFab />
  </div>
)
