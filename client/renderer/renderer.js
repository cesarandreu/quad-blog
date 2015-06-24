import app from '../app'
import React from 'react'
import debug from 'debug'
import fetch from 'node-fetch'
import Helmet from 'react-helmet'
import Html from '../components/Html'
import serialize from 'serialize-javascript'
import {navigateAction} from 'fluxible-router'

const log = debug('quad-blog:client:renderer')
export default function renderer ({scripts=[], styles=[]}={}) {
  return function * rendererMiddleware () {
    const rootUrl = `${this.protocol}://${this.host}`
    const context = app.createContext({ fetch, rootUrl })

    log('Executing navigate action')
    try {
      const url = this.url
      yield context.executeAction(navigateAction, { url })
    } catch (err) {
      log('Navigate error', err)
      if (err.status || err.statusCode) {
        this.throw(err.status || err.statusCode)
      }
      throw err
    }

    log('generating state')
    const state = `window.app=${serialize(app.dehydrate(context))}`

    log('generating markup')
    const markup = React.renderToString(context.createElement())
    const { title, meta, link } = Helmet.rewind()

    log('generating html')
    const html = React.renderToStaticMarkup(
      <Html
        meta={meta}
        link={link}
        title={title}
        state={state}
        markup={markup}
        styles={styles}
        scripts={scripts}
      />
    )

    log('sending body')
    this.body = 200
    this.type = 'html'
    this.body = `<!DOCTYPE html>${html}`
  }
}
