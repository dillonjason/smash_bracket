import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import map from 'lodash/map'

import {PlayerRow} from './player_row'

const styles = theme => ({
  container: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 500
  }
})

export const PlayersTableComponent = ({players, classes}) => {
  return (
    <Paper className={classes.container}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Main Characters</TableCell>
            <TableCell>Match W/L</TableCell>
            <TableCell>Set W/L</TableCell>
            <TableCell>First Place</TableCell>
            <TableCell>Second Place</TableCell>
            <TableCell>Third Place</TableCell>
            <TableCell>Total Tournaments</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {map(players, player => <PlayerRow player={player} />)}
        </TableBody>
      </Table>
    </Paper>
  )
}

PlayersTableComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired
}

export const PlayersTable = withStyles(styles)(PlayersTableComponent)
