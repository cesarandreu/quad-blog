/**
 * Database environment config
 */
module.exports = {
  development: {
    username: process.env.DB_USERNAME || null,
    password: null,
    database: 'quad_blog_development',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: process.env.DB_USERNAME || null,
    password: null,
    database: 'quad_blog_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: process.env.DB_USERNAME || null,
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_DATABASE || 'quad_blog',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
  }
}
