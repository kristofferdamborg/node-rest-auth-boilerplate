const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const { Schema } = mongoose

const SALT_FACTOR = 10

const userSchema = new Schema({
  username: String,
  password: String
})

userSchema.pre('save', function(next) {
  const user = this

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next()
  }

  // Generate salt
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) {
      return next(err)
    }

    // Hash the password using the new salt
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err)
      }

      // Override the cleartext password with the hashed one
      user.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

mongoose.model('users', userSchema)
