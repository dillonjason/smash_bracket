import _ from 'lodash'

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
   * @param {Boolean} critical - Request is critical, optional
   * @returns {Promise}
   */
  get ({uri, options = {}, critical}) {
    return this._makeRequest({ uri, options, critical })
  }

  /**
   * Make an http POST request with data in body
   * @param {String} uri - Request path
   * @param {Object} data - Request body, optional
   * @param {Object} options - Request options, optional
   * @param {Boolean} critical - Request is critical, optional
   * @returns {Promise}
   */
  post ({uri, data = {}, options = {}, critical}) {
    _.set(options, 'body', JSON.stringify(data))
    _.set(options, 'headers.content-length', Buffer.byteLength(JSON.stringify(data)))
    _.set(options, 'headers.content-type', 'application/json')

    return this._makeRequest({ uri, options, method: 'POST', critical })
  }

  /**
   * Sends the http request, for list of options see https://github.com/request/request-promise
   * @param {String} uri - Request path
   * @param {Object} options - Request options, optional
   * @param {String} method - Request method, defaults to GET
   * @param {Boolean} critical - Request is critical, optional
   * @returns {Promise}
   * @private
   */
  _makeRequest ({ uri, options = {}, method = 'GET', critical = false }) {
    this._checkUri(uri)
    options = _.merge({}, this.options, options)
    options = _.merge({}, this.options, options)

    // eslint-disable-next-line no-undef
    let headers = new Headers(_.get(options, 'headers', {}))
    _.assignIn(options, { method, headers })

    return fetch(uri, options)
      .then((response) => {
        if (!response.ok) {
          if (critical) {
            response.text()
              .then((html) => {
                document.body.innerHTML = html
              })
          }
          throw Error(response.statusText)
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