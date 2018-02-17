import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import {TableCell, TableRow} from 'material-ui/Table'
import map from 'lodash/map'
import {Link} from 'react-router-dom'
import Button from 'material-ui/Button'

const styles = theme => ({
  link: {
    textDecoration: 'none'
  }
})

const generateMatchData = ({player}) => {
  const wins = player._matchWinsMeta.count
  const totalMatches = player._firstPlayerMatchesMeta.count + player._secondPlayerMatchesMeta.count

  return `${wins}/${totalMatches - wins}`
}

const generateSetData = ({player}) => {
  const wins = player._winningSetsMeta.count
  const totalMatches = player._firstPlayerMatchesMeta.count + player._secondPlayerMatchesMeta.count
  const totalSets = totalMatches / 3

  return `${wins}/${totalSets - wins}`
}

export const PlayerRowComponent = ({player, classes}) => {
  return (
    <TableRow key={player.id}>
      <TableCell>{player.name}</TableCell>
      <TableCell>{map(player.characters, character => character.name).join(', ')}</TableCell>
      <TableCell>{generateMatchData({player})}</TableCell>
      <TableCell>{generateSetData({player})}</TableCell>
      <TableCell>{player._firstPlaceTournamentsMeta.count}</TableCell>
      <TableCell>{player._secondPlaceTournamentsMeta.count}</TableCell>
      <TableCell>{player._thirdPlaceTournamentsMeta.count}</TableCell>
      <TableCell>{player._tournamentsMeta.count}</TableCell>
      <TableCell>
        <Link to={`/players/${player.id}`} className={classes.link}>
          <Button color='accent'>Edit</Button>
        </Link>
      </TableCell>
    </TableRow>
  )
}

PlayerRowComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired
}

export const PlayerRow = withStyles(styles)(PlayerRowComponent)
