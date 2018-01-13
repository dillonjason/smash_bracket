import Router from 'koa-router'
import git from 'git-rev'

import pjson from './../../../package.json'

let statusRouter = new Router({
  prefix: '/smash_bracket'
})

let getHash = function () {
  return new Promise((resolve, reject) => {
    git.long(resolve)
  })
}

statusRouter
  .get('/health', async function (ctx) {
    ctx.body = {
      status: 'UP'
    }
  })
  .get('/info', async function (ctx) {
    let hash = await getHash()
    ctx.body = {
      name: pjson.name,
      description: pjson.description,
      version: pjson.version,
      gitHash: hash
    }
  })

export default statusRouter
