const pygmentize = require('pygmentize-bundled')
const marked = require('marked')

marked.setOptions({
  gfm: true,
  highlight (code, language, cb) {
    const config = {
      lang: language,
      format: 'html',
      options: {
        nowrap: true
      }
    }
    pygmentize(config, code, (err, result) =>
      cb(err, `${result}`.trim())
    )
  }
})

module.exports = function (sequelize, DataTypes) {
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },

    // url friendly name
    name: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: true
      }
    },

    // human friendly name
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },

    // compiled html from file
    body: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: true
      }
    },

    // post tags
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },

    // publication date
    createdAt: {
      type: DataTypes.DATE
    }
  }, {
    createdAt: false,
    classMethods: {
      compileMarkdown (markdown) {
        // Strip title from content
        markdown = markdown.replace(/^#\s.*/, '')
        return new Promise((resolve, reject) => {
          marked(markdown, (err, result) =>
            err ? reject(err) : resolve(result)
          )
        })
      }
    }
  })

  return Post
}
