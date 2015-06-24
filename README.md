# Quad Blog

Fourth iteration of my blog.

Some technologies used are: React, Fluxible, Koa, Webpack, Babel, and PostgreSQL.


## Dependencies

Must have PostgreSQL, iojs, and npm intalled.

The repo has been tested with the following versions:

* PostgreSQL v9.4.0
* iojs v2.3.1
* npm v2.11.3

Once the above dependencies are met, install project dependencies by cloning the repo and running `npm install`.


## Environments

Available environments are `development`, `production`, and `test`. Default is `development`.

Environment may be changed by setting `NODE_ENV`.

In order to generate a complete production build, run tasks and scripts with `NODE_ENV=production`.


## Tasks

Defined in `package.json`. Run tasks using `npm run [name]`.

* **clean** Erase `public` and `build` folder
* **build** Create production build for client and then for the server
* **build:client** Production build for the client
* **build:server** Production build for the server
* **db:create** Create database for environment
* **db:drop** Drop database for environment
* **db:migrate** Run database migrations for environment
* **dev** Start development environment
* **dev:client** Run webpack-dev-server to track client-side code
* **dev:server** Run webpack on server and watch output file with nodemon


## Scripts

Located in `scripts` folder. Run scripts by typing `./scripts/[script]`.

* **download-repo.js** Download repo to the output folder
* **update-posts.js** Update database with output folder posts
* **refresh-posts.js** Download the repo and update the database

**NOTE:** If unable to run the above scripts, try `iojs -r babel/register [script]`.


## Development

0. Install PostgreSQL, iojs, and npm
1. `npm install`
2. `npm run db:create`
3. `npm run db:migrate`
4. `./refresh-posts.js`
5. `npm run dev`
6. `open http://localhost:3000/`
