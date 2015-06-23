import {createImmutableStore} from 'fluxible-immutable-utils'
import RouteConstants from '../constants/RouteConstants'

const ApplicationStore = createImmutableStore({
  storeName: 'ApplicationStore',

  handlers: {
    [RouteConstants.NAVIGATE_SUCCESS]: '_onNavigate'
  },

  _onNavigate () {
    if (global.ga && process.env.NODE_ENV === 'production') {
      global.ga('send', 'pageview')
    }
  }

})

export default ApplicationStore
