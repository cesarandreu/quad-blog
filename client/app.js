// Styles
require('./components/styles/imports.less')
require('./components/styles/base.less')

// Modules
import Fluxible from 'fluxible'

// Plugins
import FetcherPlugin from './lib/FetcherPlugin'

// Components
import Application from './components/Application'

// Stores
import PostStore from './stores/PostStore'
import RouteStore from './stores/RouteStore'

// Initialize application
const app = new Fluxible({
  component: Application,
  stores: [
    PostStore,
    RouteStore
  ]
})

app.plug(FetcherPlugin({
  fetch: global.fetch
}))

export default app
