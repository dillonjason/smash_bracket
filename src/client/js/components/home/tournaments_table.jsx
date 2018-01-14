import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import map from 'lodash/map'
import moment from 'moment'
import {Link} from 'react-router-dom'
import Button from 'material-ui/Button'

const styles = theme => ({
  container: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 500
  },
  link: {
    textDecoration: 'none'
  }
})

export const TournamentsTableComponent = ({tournaments, classes}) => {
  return (
    <Paper className={classes.container}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Rounds Remaining</TableCell>
            <TableCell>Winner</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {map(tournaments, tournament => (
            <TableRow key={tournament.id}>
              <TableCell>{moment(tournament.date, 'YYYY-MM-DD').format('MMMM DD, YYYY')}</TableCell>
              <TableCell>0</TableCell>
              <TableCell>Me</TableCell>
              <TableCell>
                <Link to={`/tournament/${tournament.id}`} className={classes.link}>
                  <Button color='accent'>Open Bracket</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

TournamentsTableComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  tournaments: PropTypes.array.isRequired
}

export const TournamentsTable = withStyles(styles)(TournamentsTableComponent)
