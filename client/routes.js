// Actions
import { navigatePostItem, navigatePostList } from './actions/PostActions'

// Components
import About from './components/About'
import PostList from './components/PostList'
import PostItem from './components/PostItem'

// Route config
export default {
  home: {
    name: 'home',
    path: '/',
    method: 'GET',
    handler: PostList,
    action: navigatePostList
  },
  about: {
    name: 'about',
    path: '/about',
    method: 'GET',
    handler: About
  },
  posts: {
    name: 'posts',
    path: '/posts/:post',
    method: 'GET',
    handler: PostItem,
    action: navigatePostItem
  }
}
