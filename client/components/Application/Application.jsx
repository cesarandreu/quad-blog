// Favicon source: http://realfavicongenerator.net/favicon?file_id=p19oa98eds5ap1e9l6551pupgjj6

import React from 'react'
import Main from '../Main'
import AppBar from '../AppBar'
import Helmet from 'react-helmet'
import Immutable from 'immutable'
import { handleHistory } from 'fluxible-router'
import { provideContext } from 'fluxible/addons'

let Application = React.createClass({
  propTypes: {
    currentRoute: React.PropTypes.instanceOf(Immutable.Map).isRequired
  },

  render () {
    const { currentRoute } = this.props
    const Handler = currentRoute.get('handler')
    const title = 'Cesar Andreu'
    const description = 'Blog posts by Cesar Andreu.'
    const canonical = 'https://blog.cesarandreu.com'

    return (
      <Helmet
        title={title}
        meta={[
          { name: 'description', content: description },
          { property: 'og:site_name', content: title },
          { property: 'og:title', content: title },
          { property: 'og:description', content: description },
          { property: 'og:url', content: canonical },
          { name: 'msapplication-TileImage', content: require('./favicon/mstile-144x144.png') },
          { name: 'msapplication-TileColor', content: '#2d89ef' },
          { name: 'theme-color', content: '#ffffff' }
        ]}
        link={[
          { rel: 'canonical', href: canonical },
          { rel: 'apple-touch-icon', href: require('./favicon/apple-touch-icon-72x72.png') },
          { rel: 'apple-touch-icon', sizes: '72x72', href: require('./favicon/apple-touch-icon-72x72.png') },
          { rel: 'apple-touch-icon', sizes: '144x144', href: require('./favicon/apple-touch-icon-144x144.png') },
          { rel: 'apple-touch-icon', sizes: '180x180', href: require('./favicon/apple-touch-icon-180x180.png') },
          { rel: 'icon', sizes: '192x192', href: require('./favicon/android-chrome-192x192.png') },
          { rel: 'shortcut icon', href: require('./favicon/apple-touch-icon-72x72.png') }
        ]}
      >
        <div className='application'>
          <AppBar/>
          <Main>
            <Handler currentRoute={currentRoute}/>
          </Main>
        </div>
      </Helmet>
    )
  }
})

Application = handleHistory(Application)

Application = provideContext(Application)

export default Application
