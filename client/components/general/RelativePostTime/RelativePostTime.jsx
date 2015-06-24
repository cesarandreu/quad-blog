import React from 'react'
import moment from 'moment'

const RelativePostTime = React.createClass({
  propTypes: {
    createdAt: React.PropTypes.string.isRequired
  },

  render () {
    const { createdAt } = this.props
    const createdAtMoment = moment(createdAt)

    return (
      <time
        dateTime={createdAt}
        title={createdAtMoment.format('dddd, MMMM Do YYYY, h:mm:ss a')}
      >
        {createdAtMoment.fromNow()}
      </time>
    )
  }
})

export default RelativePostTime
