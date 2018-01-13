# smash_bracket
node microapp for smash_bracket

## Getting started
Requires node version 6.2 or higher. Use [nvm](https://github.com/creationix/nvm) for easy switching between node versions.

```
$ npm install
```

#### Local development:
```
$ export NODE_ENV=dev
$ npm run dev
```

#### Running tests:
Open another terminal window, while the app is running (required for integration tests).
```
$ export NODE_ENV=test
$ npm test
```

#### Within the image (for staging/prod):

Does not use webpack dev server, optimizes bundles, etc.
```
$ npm run build
$ npm start
```
