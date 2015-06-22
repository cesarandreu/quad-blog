require('./PostItem.less')

import React from 'react'
import Immutable from 'immutable'
import Helmet from 'react-helmet'
import { NavLink } from 'fluxible-router'
import HeaderBar from '../general/HeaderBar'
import { RouteStore } from 'fluxible-router'
import PostStore from '../../stores/PostStore'
import DisqusThread from 'react-disqus-thread'
import { connectToStores } from 'fluxible/addons'
import RelativePostTime from '../general/RelativePostTime'

const PostItemComments = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired
  },

  render () {
    const { name, title } = this.props

    return (
      <section className='post-item-comments'>
        <DisqusThread
          shortname='cesarandreu-blog'
          identifier={name}
          title={title}
        />
      </section>
    )
  }
})

const PostItemHeader = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired
  },

  render () {
    const { title } = this.props
    return (
      <header className='post-item-header'>
        <h1 className='post-item-title'>
          {title}
        </h1>
      </header>
    )
  }
})

const PostItemInfo = React.createClass({
  propTypes: {
    createdAt: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired
  },

  render () {
    const { name, createdAt } = this.props
    const navParams = { post: name }

    return (
      <section className='post-item-information'>
        <NavLink
          className='post-item-permalink post-item-publish-date'
          routeName='posts'
          title='permalink'
          navParams={navParams}
        >
          Posted <RelativePostTime createdAt={createdAt}/>
        </NavLink>
      </section>
    )
  }
})

let PostItem = React.createClass({
  propTypes: {
    post: React.PropTypes.instanceOf(Immutable.Map).isRequired
  },

  render () {
    const { post } = this.props
    const canonical = `https://blog.cesarandreu.com/posts/${post.get('name')}`
    const title = `${post.get('title')} - Posts - Cesar Andreu`
    const createdAt = post.get('createdAt')

    return (
      <Helmet
        title={title}
        meta={[
          { property: 'og:title', content: title },
          { property: 'og:url', content: canonical },
          { property: 'og:type', content: 'article' },
          { property: 'article:section', content: 'Programming' },
          { property: 'article:published_time', content: createdAt }
        ]}
        link={[
          {rel: 'canonical', href: canonical }
        ]}
      >
        <div className='post-item-page'>
          <HeaderBar/>

          <article className='post-item'>
            <PostItemHeader
              title={post.get('title')}
            />

            <PostItemInfo
              name={post.get('name')}
              createdAt={post.get('createdAt')}
            />

            <article
              className='post-item-content'
              dangerouslySetInnerHTML={{__html: post.get('body')}}
            />

            <PostItemComments
              name={post.get('name')}
              title={post.get('title')}
            />
          </article>
        </div>
      </Helmet>
    )
  }
})

PostItem = connectToStores(PostItem, [PostStore, RouteStore], (stores, props) => {
  const { currentRoute } = props
  const postName = currentRoute.getIn(['params', 'post'])
  const post = stores.PostStore.getPostItem(postName)
  return {
    post
  }
})

export default PostItem
