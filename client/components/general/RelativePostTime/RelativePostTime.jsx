import React from 'react'
import moment from 'moment'

const RelativePostTime = React.createClass({
  propTypes: {
    createdAt: React.PropTypes.string.isRequired
  },

  render () {
    const { createdAt } = this.props
    return (
      <time
        dateTime={createdAt}
        title={moment(createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a')}
      >
        {moment(createdAt).fromNow()}
      </time>
    )
  }
})

export default RelativePostTime
