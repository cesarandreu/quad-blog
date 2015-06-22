/**
 * Post API Utils
 */
const PostApiUtils = {
  /**
   * @param {Function} fetcher
   * @returns {Promise} Promise of post list
   */
  fetchPostList (fetcher) {
    return fetcher(`/api/posts`)
  },

  /**
   * @param {Function} fetcher
   * @param {string} post Post name
   * @returns {Promise} Promise of post item
   */
  fetchPostItem (fetcher, post) {
    return fetcher(`/api/posts/${post}`)
  }
}

export default PostApiUtils
