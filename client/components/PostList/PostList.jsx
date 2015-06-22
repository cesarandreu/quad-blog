require('./PostList.less')

import React from 'react'
import Immutable from 'immutable'
import Helmet from 'react-helmet'
import { NavLink } from 'fluxible-router'
import HeaderBar from '../general/HeaderBar'
import PostStore from '../../stores/PostStore'
import {connectToStores} from 'fluxible/addons'
import RelativePostTime from '../general/RelativePostTime'

const PostListItem = React.createClass({
  propTypes: {
    createdAt: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired
  },

  render () {
    const { name, title, createdAt } = this.props
    const navParams = { post: name }

    return (
      <li className='post-list-item'>
        <NavLink
          className='post-list-item-link'
          routeName='posts'
          navParams={navParams}
        >
          <header className='post-list-item-header'>
            <h2 className='post-list-item-title'>
              {title}
            </h2>
          </header>

          <section className='post-list-item-information'>
            <span className='post-list-item-publish-date'>
              Posted <RelativePostTime createdAt={createdAt}/>
            </span>
          </section>
        </NavLink>
      </li>
    )
  }
})

let PostList = React.createClass({
  propTypes: {
    posts: React.PropTypes.instanceOf(Immutable.List).isRequired
  },

  render () {
    const { posts } = this.props
    const canonical = 'https://blog.cesarandreu.com'
    const title = 'Posts - Cesar Andreu'

    return (
      <Helmet
        title={title}
        meta={[
          { property: 'og:title', content: title },
          { property: 'og:url', content: canonical }
        ]}
        link={[
          { rel: 'canonical', href: title }
        ]}
      >
        <div className='post-list-page'>
          <HeaderBar
            title='Posts'
            className='post-list-header-bar'
          />

          <ul className='post-list'>
            {posts.map((post, key) =>
              <PostListItem
                key={key}
                name={post.get('name')}
                title={post.get('title')}
                createdAt={post.get('createdAt')}
              />
            ).toArray()}
          </ul>
        </div>
      </Helmet>
    )
  }
})

PostList = connectToStores(PostList, [PostStore], stores => {
  return {
    posts: stores.PostStore.getPostList()
  }
})

export default PostList
