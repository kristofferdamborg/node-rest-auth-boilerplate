module.exports = {
  port: process.env.PORT,
  mongoURI: process.env.MONGO_URI,
  auth: {
    jwtSecret: process.env.JWT_SECRET
  }
}
