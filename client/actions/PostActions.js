import PostApiUtils from '../utils/PostApiUtils'
import PostContants from '../constants/PostConstants'

/**
 * Navigate to PostList action
 * Fetches list of posts
 * @param {FluxibleActionContext} context
 */
export async function navigatePostList (context) {
  const res = await context.executeRequest(PostApiUtils.fetchPostList)
  const posts = await res.json()
  context.dispatch(PostContants.RECEIVE_POST_LIST, { posts })
}

/**
 * Navigate to PostItem action
 * Fetches post item
 * @param {FluxibleActionContext} context
 * @param {RouteData} payload
 */
export async function navigatePostItem (context, payload) {
  const postName = payload.getIn(['params', 'post'])
  const res = await context.executeRequest(PostApiUtils.fetchPostItem, postName)
  const post = await res.json()
  context.dispatch(PostContants.RECEIVE_POST_ITEM, { post })
}
