import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { withStyles } from 'material-ui/styles'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import map from 'lodash/map'
import get from 'lodash/get'
import flow from 'lodash/flow'
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

export class TournamentsTableComponent extends Component {
  componentWillUpdate (nextProps) {
    if (!nextProps.deleteTournamentId && this.props.deleteTournamentId) {
      this.props.refetch()
    }
  }

  render () {
    const {tournaments, classes, date, players, deleteTournamentId} = this.props
    const showOptimistic = moment(date).isValid() && players.length > 0
    return (
      <Paper className={classes.container}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Sets Remaining</TableCell>
              <TableCell>Winner</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {showOptimistic &&
              <TableRow key='optimistic'>
                <TableCell>{moment(date, 'YYYY-MM-DD').format('MMMM DD, YYYY')}</TableCell>
                <TableCell>{(2 * players.length) - 1}</TableCell>
                <TableCell>In Progress</TableCell>
                <TableCell>
                  <Button color='secondary' disabled>Open Bracket</Button>
                </TableCell>
              </TableRow>
            }
            {map(tournaments, tournament => {
              const ignore = tournament.id === deleteTournamentId

              return ignore ? null : (
                <TableRow key={tournament.id}>
                  <TableCell>{moment(tournament.date, 'YYYY-MM-DD').format('MMMM DD, YYYY')}</TableCell>
                  <TableCell>{get(tournament, 'setsRemaining', 0)}</TableCell>
                  <TableCell>{get(tournament, 'firstPlace.name', 'In Progress')}</TableCell>
                  <TableCell>
                    <Link to={`/tournament/${tournament.id}`} className={classes.link}>
                      <Button color='secondary'>Open Bracket</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

TournamentsTableComponent.propTypes = {
  refetch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  tournaments: PropTypes.array.isRequired,
  date: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  players: PropTypes.array,
  deleteTournamentId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  date: state.home.date,
  players: state.home.players,
  deleteTournamentId: state.tournament.deleteTournamentId
})

const redux = connect(mapStateToProps)
const styled = withStyles(styles)

export const TournamentsTable = flow([
  redux,
  styled
])(TournamentsTableComponent)
