require('module-alias/register')

const http = require('http')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const api = require('./api')
const config = require('./config')

let app = express()
app.server = http.createServer(app)

app.use(morgan('dev'))

app.use(cors())

app.use('/', api())

app.server.listen(config.PORT, () => {
  console.log(`Started on port ${app.server.address().port}`)
})
