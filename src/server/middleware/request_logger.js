export default async (ctx, next) => {
  ctx.logger.info(`Request to ${ctx.request.url}`)
  await next()
}
