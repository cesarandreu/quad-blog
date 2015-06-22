require('./HeaderBar.less')

import React from 'react'
import cn from 'classnames'

const HeaderBar = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    title: React.PropTypes.string
  },

  render () {
    const { className, title } = this.props
    return (
      <div className={cn('header-bar', className)}>
        {title
          ? <h1 className='header-bar-title'>{title}</h1>
          : null
        }
      </div>
    )
  }
})

export default HeaderBar
