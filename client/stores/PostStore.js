import {createImmutableStore} from 'fluxible-immutable-utils'
import PostConstants from '../constants/PostConstants'
import Immutable from 'immutable'

const PostStore = createImmutableStore({
  storeName: 'PostStore',

  handlers: {
    [PostConstants.RECEIVE_POST_ITEM]: '_receivePostItem',
    [PostConstants.RECEIVE_POST_LIST]: '_receivePostList'
  },

  initialize () {
    this._state = Immutable.fromJS({
      postList: [],
      posts: {}
    })
  },

  getState () {
    return this._state
  },

  getPostList () {
    const posts = this._state.get('posts')
    return this._state.get('postList').map(id => posts.get(id))
  },

  getPostItem (postName) {
    return this._state.getIn(['posts', postName])
  },

  /**
   * @param {Object[]} posts List of post items
   */
  _receivePostList ({ posts }={}) {
    const postList = posts.map(post => post.name)
    const postMap = posts.reduce((postMap, post) => {
      postMap[post.name] = post
      return postMap
    }, {})

    const state = Immutable.fromJS({
      postList: postList,
      posts: postMap
    })
    this.setState(state)
  },

  /**
   * @param {Object} post Post item
   */
  _receivePostItem ({ post }={}) {
    const postName = post.name
    const postItem = Immutable.fromJS(post)

    const state = this.getState().setIn(['posts', postName], postItem)
    this.setState(state)
  }
})

export default PostStore
