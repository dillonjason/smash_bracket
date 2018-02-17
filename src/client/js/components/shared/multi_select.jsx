import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import find from 'lodash/find'
import get from 'lodash/get'
import indexOf from 'lodash/indexOf'
import {FormControl} from 'material-ui/Form'
import Input, {InputLabel} from 'material-ui/Input'
import Select from 'material-ui/Select'
import {MenuItem} from 'material-ui/Menu'
import Checkbox from 'material-ui/Checkbox'
import {ListItemText} from 'material-ui/List'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

export const MultiSelect = ({className, inputId, label, value, onChange, options, optionKey, optionText}) => {
  const renderValue = (selected) => {
    return map(selected, selectedOption => get(find(options, option => option[optionKey] === selectedOption), optionText)).join(', ')
  }

  return (
    <FormControl className={className}>
      <InputLabel htmlFor={inputId}>{label}</InputLabel>
      <Select
        multiple
        value={value}
        onChange={onChange}
        input={<Input id={inputId} />}
        renderValue={renderValue}
        MenuProps={MenuProps}
      >
        {map(options, option => (
          <MenuItem key={option[optionKey]} value={option[optionKey]}>
            <Checkbox checked={indexOf(value, option[optionKey]) > -1} />
            <ListItemText primary={option[optionText]} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

MultiSelect.propTypes = {
  className: PropTypes.string,
  inputId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  optionKey: PropTypes.string.isRequired,
  optionText: PropTypes.string.isRequired
}
