import * as Bundler from 'parcel-bundler'

export const parcelMiddleware = () => {
  const html = 'server/html/index.html'
  const options = {}
  const bundler = new Bundler(html, options)
  return bundler.middleware()
}