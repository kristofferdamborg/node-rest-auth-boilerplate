const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

// Config
const config = require('./config/config')

// Models
require('./models/User')


// Services
require('./services/passport')

// Connect to mongoDB
mongoose.connect(config.mongoURI)

// Initialize express app
const app = express()

// Allows Cross-Origin Resource Sharing
app.use(cors())

// Console los incoming requests
app.use(morgan('combined'))

// Parses incoming request bodies to JSON
app.use(bodyParser.json())

// Routes
require('./routes/authRoutes')(app)

// Start up app
app.listen(config.port, () => {
  console.log(`App started on port: ${config.port}`)
})
