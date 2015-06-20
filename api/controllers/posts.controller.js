const middleware = require('../utils/middleware')
const compose = require('composition')
const Router = require('koa-router')

// @TODO: Replace koa-router with an async function friendly router
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
    compose([
      PostsController.index
    ])
  )
  .get(
    '/posts/:post',
    compose([
      loadPost,
      PostsController.show
    ])
  )

  return routes.middleware()
}

/**
 * GET /api/posts
 */
PostsController.index = async function index () {
  const {Post} = this.models
  this.body = await Post.findAll({
    order: [
      ['createdAt', 'DESC']
    ]
  })
}

/**
 * GET /api/posts/:post
 */
PostsController.show = async function show () {
  this.body = this.state.post
}
