import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'

export const ApolloError = ({refetch} = {}) => (
  <span>
    Oops something happened fetching data.
    {refetch && <span><br /><Button color='secondary' onClick={refetch}>Try Again</Button></span>}
  </span>
)

ApolloError.propTypes = {
  refetch: PropTypes.func
}
