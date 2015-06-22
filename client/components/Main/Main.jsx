require('./Main.less')

import React from 'react'

const Main = React.createClass({
  propTypes: {
    children: React.PropTypes.node.isRequired
  },

  render () {
    return (
      <main
        className='main'
        role='main'
      >
        {this.props.children}
      </main>
    )
  }
})

export default Main
