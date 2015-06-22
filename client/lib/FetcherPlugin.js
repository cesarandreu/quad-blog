import debug from 'debug'
import invariant from 'invariant'

const log = debug('quad-blog:client:FetcherPlugin')

/**
 * Create FetcherPlugin
 * Adds actionContext.executeRequest(fn, payload)
 * @param {Object} options
 * @param {GlobalFetch.fetch} [fetch]
 * @returns FetcherPlugin
 */
export default function FetcherPlugin (options={}) {
  return {
    name: 'FetcherPlugin',
    plugContext
  }

  function plugContext ({ fetch=options.fetch, rootUrl }={}) {
    const fetcher = new Fetcher({ fetch, rootUrl })
    return {
      plugActionContext (actionContext) {
        actionContext.fetcher = fetcher
        actionContext.executeRequest = fetcher.executeRequest
      }
    }
  }
}

export class Fetcher {
  /**
   * @param {GlobalFetch.fetch} [fetch=global.fetch]
   * @param {string} [rootUrl='']
   */
  constructor ({ fetch=global.fetch, rootUrl='' }={}) {
    Object.assign(this, { fetch, rootUrl })
    this.fetcher = this.fetcher.bind(this)
    this.executeRequest = this.executeRequest.bind(this)
  }

  /**
   * @param {Function} fn
   * @param {*} [payload={}]
   * @returns {Promise} Result of invoking fn with fetcher and payload
   */
  executeRequest (fn, payload = {}) {
    invariant(typeof fn === 'function', 'Fetcher#executeRequest requires a function')
    log(`Executing request ${fn.displayName || fn.name} with payload`, payload)
    try {
      return Promise.resolve(fn(this.fetcher, payload))
    } catch (err) {
      return Promise.reject(err)
    }
  }

  /**
   * Like fetch, but more fetching
   * @param {string} [url='']
   * @param {Object} [options={}]
   * @returns {Promise} Result of invoking fetch with url and options
   */
  fetcher (url='', options={}) {
    if (url.charAt(0) === '/') {
      url = `${this.rootUrl}${url}`
    }

    const fetch = this.fetch
    return fetch(url, options)
      .then(Fetcher.status)
  }

  /**
   * Resolve when status code is 2XX
   * Otherwise reject
   * @param {Response} res
   * @returns {Promise}
   */
  static status (res) {
    return res.ok
      ? Promise.resolve(res)
      : Promise.reject(res)
  }
}
