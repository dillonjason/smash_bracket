import React from 'react'
import PropTypes from 'prop-types'

export const TreeHeader = ({children}) => (
  <div className='tree-header-component'>
    {children}
  </div>
)

TreeHeader.propTypes = {
  children: PropTypes.string.isRequired
}
