const AuthController = require('../controllers/AuthController')
const RegisterPolicy = require('../policies/RegisterPolicy')

module.exports = (app) => {
  app.post('/api/register', 
    RegisterPolicy.validate,
    AuthController.register)

  app.post('/api/login', 
    AuthController.login)
}
