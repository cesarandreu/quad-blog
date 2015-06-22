require('./AppBar.less')

import React from 'react'
import { NavLink } from 'fluxible-router'

// Title logo and link
const AppBarTitle = React.createClass({
  render () {
    return (
      <NavLink
        title='home'
        routeName='home'
        className='app-bar-title'
      >
        <div className='app-bar-title-image-container'>
          <img
            src={require('../images/me.jpg')}
            className='app-bar-title-image'
            alt='Cesar Andreu'
          />
        </div>
        <span className='app-bar-title-text'>
          Cesar Andreu
        </span>
      </NavLink>
    )
  }
})

// About link
const AppBarAbout = React.createClass({
  render () {
    return (
      <NavLink
        title='about'
        routeName='about'
        className='app-bar-about app-bar-link'
      >
        About
      </NavLink>
    )
  }
})

// AppBar
const AppBar = React.createClass({
  render () {
    return (
      <div className='app-bar-container'>
        <header
          className='app-bar'
          role='banner'
        >
          <AppBarTitle/>
          <AppBarAbout/>
        </header>
        <div className='app-bar-shadow'/>
      </div>
    )
  }
})

export default AppBar
