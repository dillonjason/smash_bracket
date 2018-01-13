
import Promise from 'es6-promise'
// polyfill for phantomjs
if (window && !window.Promise) {
  window.Promise = Promise
}
