#!/usr/bin/env iojs -r babel/register
import { cd, echo, exec, env } from 'shelljs'

/**
 * Download the repo and then update database posts
 */
cd(__dirname)

env['NODE_ENV'] = env['NODE_ENV'] || 'development'
echo(`Refreshing posts using NODE_ENV=${env['NODE_ENV']}`)
echo('\n')

echo('./download-repo.js')
exec('./download-repo.js')
echo('\n')

echo('./update-posts.js')
exec('./update-posts.js')
echo('\n')
