const middleware = require('../utils/middleware')
const Router = require('koa-router')

export default function PostsController () {
  // Middleware
  const loadPost = middleware.load('Post', {
    key: 'name'
  })

  // Routes
  const routes = new Router({
    prefix: '/api'
  })
  .get(
    '/posts',
      PostsController.index
  )
  .get(
    '/posts/:post',
      loadPost,
      PostsController.show
  )

  return routes.middleware()
}

/**
 * GET /api/posts
 */
PostsController.index = function * index () {
  const {Post} = this.models
  this.body = yield Post.findAll({
    order: [
      ['createdAt', 'DESC']
    ]
  })
}

/**
 * GET /api/posts/:post
 */
PostsController.show = function * show () {
  this.body = this.state.post
}
