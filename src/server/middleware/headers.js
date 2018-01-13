import _ from 'lodash'
import config from 'config'

let configHeaders = config.has('headers') ? config.get('headers') : {}

export default async function (ctx, next) {
  let xHeaders = _.pickBy(ctx.request.headers, (v, k) => _.startsWith(k, 'x'))

  // use config headers be default to enable local dev by modifying config
  ctx.X_HEADERS = _.merge({}, configHeaders, xHeaders)

  ctx.NM_UID = ctx.X_HEADERS['x-nm-nm_uid'] || 'Not Provided'
  ctx.REQUEST_ID = ctx.X_HEADERS['x-request-id'] || 'Not Provided'
  ctx.CLIENT_NM_UID = ctx.X_HEADERS['x-nm-px-auth-client-nm-unique-id'] || 'Not Provided'
  ctx.WORKS_FOR_NM_UID = ctx.X_HEADERS['x-nm-px-auth-works-for-nm-unique-id'] || 'Not Provided'

  await next()
}
