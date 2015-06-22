import React from 'react'

const Head = React.createClass({
  propTypes: {
    styles: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    title: React.PropTypes.string.isRequired,
    link: React.PropTypes.string.isRequired,
    meta: React.PropTypes.string.isRequired
  },

  render () {
    const { styles, title, link, meta } = this.props

    const headChildren = [
      <meta
        charSet='utf-8'
      />,

      <meta
        httpEquiv='X-UA-Compatible'
        content='IE=edge'
      />,

      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
      />,

      meta,

      <title>{title}</title>,

      link,

      ...styles.map((href, key) => <link href={href} key={key} rel='stylesheet'></link>)
    ]

    const head = headChildren.reduce((result, item) => {
      if (typeof item !== 'string') {
        item = React.renderToStaticMarkup(item)
      }
      return `${result}${item}`
    }, '')

    return <head dangerouslySetInnerHTML={{__html: head}}/>
  }
})

const Html = React.createClass({
  propTypes: {
    scripts: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    styles: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    markup: React.PropTypes.string.isRequired,
    state: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    meta: React.PropTypes.string.isRequired,
    link: React.PropTypes.string.isRequired
  },

  render () {
    const {scripts, styles, markup, state, title, meta, link} = this.props

    return (
      <html lang='en'>
        <Head
          styles={styles}
          title={title}
          meta={meta}
          link={link}
        />
        <body>
          <div id='app' dangerouslySetInnerHTML={{__html: markup}}/>
          <script dangerouslySetInnerHTML={{__html: state}}></script>
          {scripts.map((src, key) =>
            <script src={src} key={key} defer></script>
          )}
        </body>
      </html>
    )
  }
})

export default Html
