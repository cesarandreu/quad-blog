require('./About.less')

import React from 'react'
import Helmet from 'react-helmet'
import Paper from '../general/Paper'

const About = React.createClass({
  render () {
    const canonical = 'https://blog.cesarandreu.com/about'
    const title = 'About - Cesar Andreu'

    return (
      <Helmet
        title={title}
        meta={[
          { property: 'og:title', content: title },
          { property: 'og:url', content: canonical }
        ]}
        link={[
          {rel: 'canonical', href: canonical }
        ]}
      >
        <div className='about-page'>
          <Paper className='about-paper'>
            <header className='about-heading'>
              <img
                alt='Cesar Andreu'
                className='about-image'
                src={require('../images/presenting.jpg')}
              />

              <h1 className='about-name'>
                César Andreu
              </h1>

              <h2 className='about-job'>
                Software Engineer
              </h2>
            </header>

            <section className='about-section about-content'>
              <div className='about-title'>
                General Information
              </div>
              <ul className='about-section-body about-content-body'>
                <li>From Puerto Rico.</li>
                <li>Fluent in English and Spanish.</li>
                <li>Working at Treasure Data.</li>
                <li>Residing in the San Francisco Bay Area.</li>
              </ul>
            </section>

            <footer className='about-section about-footer'>
              <div className='about-title'>
                Links
              </div>
              <div className='about-section-body about-social'>
                <a
                  href='https://twitter.com/cesarandreu'
                  title='twitter profile'
                  className='about-social-link'
                >
                  <img
                    src={require('../../vendor/mdi/twitter-box.svg')}
                    alt='twitter'
                  />
                  <span>
                    Twitter
                  </span>
                </a>

                <a
                  href='mailto:cesarandreu@gmail.com'
                  title='email'
                  className='about-social-link'
                >
                  <img
                    src={require('../../vendor/mdi/email.svg')}
                    alt='email'
                  />
                  <span>
                    Email
                  </span>
                </a>

                <a
                  href='https://github.com/cesarandreu'
                  title='github profile'
                  className='about-social-link'
                >
                  <img
                    src={require('../../vendor/mdi/github-box.svg')}
                    alt='github'
                  />
                  <span>
                    GitHub
                  </span>
                </a>
              </div>
            </footer>
          </Paper>
        </div>
      </Helmet>
    )
  }
})

export default About
