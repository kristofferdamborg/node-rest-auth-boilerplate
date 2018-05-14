module.exports = {
  port: process.env.PORT || 7000,
  mongoURI: process.env.MONGO_URI || 'mongodb://testuser:testdb@ds219040.mlab.com:19040/boilerplate-project-test',
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
