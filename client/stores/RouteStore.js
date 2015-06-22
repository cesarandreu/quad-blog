import { RouteStore } from 'fluxible-router'
import routes from '../routes'

const router = RouteStore.withStaticRoutes(routes)

export default router
