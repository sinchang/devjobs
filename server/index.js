/* eslint-disable */
import express from 'express'
import {
  Nuxt,
  Builder
} from 'nuxt'
require('dotenv').config()
import bodyParser from 'body-parser'
import Mongoose from 'mongoose'
import router from './route'

Mongoose.Promise = global.Promise

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

Mongoose.connect(process.env.DB_URL)
const db = Mongoose.connection
db.on('error', () => console.error('connection error'))
db.once('open', () => console.log('Connection with database succeeded.'))

app.set('port', port)

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use('/api', router)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
