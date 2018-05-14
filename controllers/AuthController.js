const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

const User = mongoose.model('users')

// Assign JWT to a user
function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.auth.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = (app) = {
  async register (req, res) {
    try {
      // Check if user exists
      const user = await User.findOne({
        username: req.body.username
      })

      // If the user exist, return error
      if (user) {
        res.status(400).send({
          error: 'This e-mail is already in use.'
        })
      } else {
        // Create new user and save to DB
        const newUser = await new User(req.body).save()

        // Make sure that user is passed to jwtSignUser function in JSON
        const userJson = newUser.toJSON()

        // Respond with user and JWT
        res.send({
          user: newUser,
          token: jwtSignUser(userJson)
        })
      }
    } catch (err) {
      res.status(400).send({
        error: 'This e-mail is already in use.'
      })
    }
  },
  
  async login (req, res) {
    try {
      const user = await User.findOne({
        username: req.body.username
      })

      if (!user) {
        return res.status(403).send({
          error: 'Login information was invalid, please try again.'
        })
      }

      // Use method from user model to compare passwords
      const isPasswordValid = await user.comparePassword(req.body.password)

      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'Login information was invalid, please try again.'
        })
      }

      // Make sure that user is passed to jwtSignUser function in JSON
      const userJson = user.toJSON()
      
      res.send({
        user: user,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error occurred while trying to login.'
      })
    }
  }
}
