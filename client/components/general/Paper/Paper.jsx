require('./Paper.less')

import React from 'react'
import cn from 'classnames'

const Paper = React.createClass({
  propTypes: {
    className: React.PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired
  },

  render () {
    const {children, className, ...props} = this.props
    return (
      <div
        className={cn('paper', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
})

export default Paper
