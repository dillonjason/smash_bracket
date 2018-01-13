import qs from 'qs'
import _ from 'lodash'

// eslint-disable-next-line no-undef
let queryString = _.isObject(location) ? location.search : ''
let queryObject = qs.parse(queryString)

export {
  queryString,
  queryObject
}
