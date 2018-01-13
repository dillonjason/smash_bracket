import config from 'config'
import winston from 'winston'
import _ from 'lodash'

const transports = []
if (config.get('isDevelopment')) {
  transports.push(new winston.transports.Console({
    level: 'debug',
    colorize: true,
    stringify: true,
    prettyPrint: true,
    humanReadableUnhandledException: true,
    stderrLevels: ['error', 'debug', 'info']
  }))
} else {
  transports.push(new winston.transports.Console({
    handleExceptions: true,
    json: true,
    stderrLevels: ['error', 'debug', 'info'],
    stringify: function (obj) {
      _.set(obj, 'log_level', _.get(obj, 'level', ''))
      _.set(obj, 'log_level', _.toUpper(obj['level']))
      _.set(obj, 'log', _.get(obj, 'messsage', ''))
      _.set(obj, 'app_group', config.get('appGroup'))
      _.set(obj, 'app_name', config.get('appName'))
      delete obj.level
      delete obj.log
      return JSON.stringify(obj)
    }
  }))
}

const winstonLogger = new winston.Logger({
  transports,
  exitOnError: false
})

export default class Logger {
  /**
   * Function which attempts to log a request, if data is a request will auto get meta info
   * @param {Object} options - {severity, msg, data}
   */
  static log (options) {
    const severity = _.get(options, 'severity', 'info')
    let defaultMsg = 'Request'
    let data = _.get(options, 'data', {})

    const msg = _.get(options, 'msg', defaultMsg)
    winstonLogger.log(severity, msg, data)
  }

  /**
   * Function that will only log if in development mode
   * @param {String} msg
   * @param {Object} data
   */
  static debug (msg, data) {
    if (config.get('isDevelopment')) {
      this.info(msg, data)
    }
  }

  /**
   * Function to simplify calls to log to auto set severity to info
   * @param {String} msg
   * @param {Object} data
   */
  static info (msg, data) {
    this.log({
      severity: 'info',
      msg,
      data
    })
  }

  /**
   * Function to simplify calls to log to auto set severity to error
   * @param {String} msg
   * @param {Object} data
   */
  static error (msg, data) {
    this.log({
      severity: 'error',
      msg,
      data
    })
  }
}
