#!/usr/bin/env iojs -r babel/register
import readPosts from '../utils/read-posts'
import syncPosts from '../utils/sync-posts'
import modelLoader from '../models'
import configMaker from '../config'
import inflection from 'inflection'
import debug from 'debug'
import path from 'path'

/**
 * Update database posts using the files located in "../public/blog"
 */
const log = debug('quad-blog:scripts:update-posts')
const { database } = configMaker()
database.logging = log

const models = modelLoader(database)

const dir = path.resolve(__dirname, '../public/blog')

async function updatePosts () {
  console.log('starting update-posts')

  console.log(`reading posts in dir "${dir}"`)
  const postList = await readPosts(dir)
  console.log('finished reading posts')

  console.log(`synchronizing ${postList.length} posts`)
  const {created, destroyed} = await syncPosts(models, postList)
  console.log(`added ${created} ${inflection.inflect('post', created)}`)
  console.log(`deleted ${destroyed} ${inflection.inflect('post', destroyed)}`)

  console.log('finished updating posts')

  try {
    // Destroy all database connections so it finishes faster
    await models.sequelize.connectionManager.pool.destroyAllNow()
  } catch (err) {}
}

updatePosts().catch(err =>
  console.error('error updating posts', err)
)
