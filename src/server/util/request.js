import _ from 'lodash'
import fetch, {Headers} from 'node-fetch'

/* Class used to make http requests */
export class Request {
  /**
   * Create a Request
   * @param {Object} options - Object to hold constructor options.
   * @param {Object} options.headers - The headers to set for the request.
   * @param {Object} options.cookies - The cookie headers to set for the request.
   */
  constructor (options = {}) {
    const { headers = {}, cookies = '' } = options

    _.set(headers, 'Cookie', cookies)

    this.options = {
      headers
    }
  }

  setLogger (logger) {
    this.logger = logger
  }

  /**
   * Replaces all headers (except Cookie) with new set of headers
   * @param {Object} headers - The new headers
   */
  setHeaders (headers = {}) {
    let cookies = _.get(this.options.headers, 'Cookie', {})
    _.set(headers, 'Cookie', cookies)

    this.options.headers = headers
  }

  /**
   * Replaces cookie header value with new cookies
   * @param {Object} cookies - The new cookies
   */
  setCookies (cookies = '') {
    this.options.headers.set('Cookie', cookies)
  }

  /**
   * Make an http GET request
   * @param {String} uri - Request path
   * @param {Object} options - Request options, optional
   * @returns {Promise}
   */
  get (uri, options = {}) {
    return this._makeRequest({ uri, options })
  }

  /**
   * Make an http POST request with data in body
   * @param {String} uri - Request path
   * @param {Object} data - Request body, optional
   * @param {Object} options - Request options, optional
   * @returns {Promise}
   */
  post (uri, data = {}, options = {}) {
    _.set(options, 'body', JSON.stringify(data))

    if (!_.isEmpty(data)) {
      _.set(options, 'headers.Content-Length', Buffer.byteLength(JSON.stringify(data)))
    }

    return this._makeRequest({ uri, options, method: 'POST' })
  }

  /**
   * Sends the http request, for list of options see https://github.com/request/request-promise
   * @param {String} uri - Request path
   * @param {Object} options - Request options, optional
   * @param {String} method - Request method, defaults to GET
   * @returns {Promise}
   * @private
   */
  _makeRequest ({ uri, options = {}, method = 'GET' }) {
    this._checkUri(uri)
    options = _.merge({}, this.options, options)
    let headers = new Headers(_.get(options, 'headers', {}))
    _.assignIn(options, { method, headers })
    let stack = new Error().stack

    if (this.logger) {
      this.logger.info(`API ${method} Request to ${uri}`)
    }

    return fetch(uri, options)
      .then((response) => {
        if (!response.ok) {
          let baseError = `API ${method} Request to ${response.url}\n\n${response.status}\n${response.statusText}`

          if (response.json) {
            return response.json()
              .then((json) => {
                let error = new Error(`${baseError}\n\n${_.get(json, 'message', '')}`)
                error.stack = stack
                throw error
              })
          } else {
            let error = new Error(baseError)
            error.stack = stack
            throw error
          }
        } else {
          return response
        }
      })
  }

  /**
   * Determine if a uri has been provide, else throws
   * @param {String} uri - Request path
   * @private
   */
  _checkUri (uri) {
    if (!uri) {
      throw new Error('No uri provided to request')
    }
  }
}
