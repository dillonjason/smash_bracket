import React from 'react'
import {PropTypes} from 'prop-types'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

import { withStyles } from 'material-ui/styles'
import Select from 'material-ui/Select'
import {MenuItem} from 'material-ui/Menu'
import {FormControl, FormHelperText} from 'material-ui/Form'
import {InputLabel} from 'material-ui/Input'
import Avatar from 'material-ui/Avatar'

import map from 'lodash/map'
import flow from 'lodash/flow'
import find from 'lodash/find'

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200
  }
})

const CharacterSelectComponent = ({value = '', onChange, data, id, label = 'Character', classes}) => {
  const {loading, error, allCharacters} = data
  const renderValue = (selected) => {
    let render = null
    if (selected) {
      const character = find(allCharacters, {id: selected})
      render = (
        <div style={{display: 'flex'}}>
          <Avatar alt={character.name} src={character.icon.url} />
          {character.name}
        </div>
      )
    }

    return render
  }

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor={id} disabled={!(loading && error)}>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        inputProps={{
          id
        }}
        renderValue={renderValue}
      >
        {allCharacters && map(allCharacters, character => (
          <MenuItem value={character.id} key={character.id}>
            <Avatar alt={character.name} src={character.icon.url} />
            {character.name}
          </MenuItem>
        ))}
      </Select>
      {loading && <FormHelperText>Loading Characters</FormHelperText>}
      {error && <FormHelperText>Error Getting Characters</FormHelperText>}
    </FormControl>
  )
}

CharacterSelectComponent.propTypes = {
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  id: PropTypes.string.isRequired
}

const query = gql`
  query {
    allCharacters(orderBy: name_ASC) {
      id
      name
      icon {
        url
      }
    }
  }
`

const apollo = graphql(query)
const styleWrapper = withStyles(styles, {withTheme: true})

export const CharacterSelect = flow([
  apollo,
  styleWrapper
])(CharacterSelectComponent)
