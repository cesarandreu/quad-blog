const log = require('debug')('quad-blog:utils:sync-posts')

/**
 * Sync posts
 * Upserts every post
 * Destroys dangling posts
 * @param {Object} models Model map
 * @param {Array} postList List of post data
 * @returns {Promise} A promise of the results
 */
module.exports = async function loadPosts (models, postList) {
  log('start')
  const {Post} = models

  // Compile markdown
  // Add it as body to each entry
  postList = await Promise.all(
    postList.map(json =>
      Post.compileMarkdown(json.file)
        .then(body => {
          json.body = body
          return json
        })
    )
  )

  // Upsert each post
  const createdList = await Promise.all(
    postList.map(post =>
      Post.upsert(post)
    )
  )

  // Find remaining posts and delete them
  const danglingPosts = await Post.findAll({
    where: {
      $not: [{
        name: postList.map(post => post.name)
      }]
    }
  })
  await Promise.all(
    danglingPosts.map(post => post.destroy())
  )

  log('end')
  return {
    created: createdList.filter(entry => entry).length,
    destroyed: danglingPosts.length
  }
}
