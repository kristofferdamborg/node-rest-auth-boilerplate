const Joi = require('joi')

module.exports = {
  validate (req, res, next) {
    // Define validation schema
    const schema = {
      username: Joi.string().email().min(3).max(30).required(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }

    // Passes the validation results into an error object
    const {error} = Joi.validate(req.body, schema)
    
    if (error) {
      switch (error.details[0].context.key) {
        case 'username':
          res.status(400).send({
            error: 'Enter a valid e-mail.'
          })
          break
        case 'password':
          res.status(400).send({
            error: 'The password must be 8-32 characters and only include letters and numbers.'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid registration information.'
          })
      }
    } else {
      next()
    }
  }
}
