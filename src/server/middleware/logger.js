import Logger from '../util/logger'
import _ from 'lodash'

let formatMessage = function ({NM_UID, REQUEST_ID, CLIENT_NM_UID, WORKS_FOR_NM_UID}, data) {
  return _.merge(data, {NM_UID, REQUEST_ID, CLIENT_NM_UID, WORKS_FOR_NM_UID})
}

export default async function loggerMiddleware (ctx, next) {
  ctx.logger = {
    info: (msg, data = {}) => {
      Logger.info(msg, formatMessage(ctx, data))
    },
    error: (msg, data = {}) => {
      Logger.error(msg, formatMessage(ctx, data))
    },
    debug: (msg, data = {}) => {
      Logger.debug(msg, formatMessage(ctx, data))
    }
  }
  await next()
}
