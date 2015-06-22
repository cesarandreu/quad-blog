// Polyfills
import 'whatwg-fetch'

import React from 'react'
import debug from 'debug'
import app from './app'

const log = debug('quad-blog:client:bootstrap')

// Get application node
const mountNode = document.getElementById('app')

// Debug messages
if (process.env.NODE_ENV !== 'production') {
  debug.enable('quad-blog:*,Fluxible:*')
}

// Rehydrate if global.app is defined
// Otherwise bootstrap with a new context
if (global.app) {
  app.rehydrate(global.app, bootstrap)
} else {
  bootstrap(null, app.createContext())
}

/**
 * Bootstrap the app
 */
function bootstrap (err, context) {
  if (err) throw err

  // For chrome dev tool support and debugging
  global.context = context
  global.React = React

  log('React rendering')
  React.render(context.createElement(), mountNode, () => {
    log('React rendered')
  })
}
