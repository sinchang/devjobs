const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const autoIncrement = require('mongoose-auto-increment')
const Schema = mongoose.Schema

autoIncrement.initialize(mongoose.connection)

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  githubId: {
    type: Number
  },
  role: {
    type: String,
    default: 'member'
  }
}, {
  timestamps: {
    createdAt: 'createdAt'
  }
})

userSchema.plugin(uniqueValidator)
userSchema.plugin(autoIncrement.plugin, { model: 'User', field: '_id' })

const User = mongoose.model('User', userSchema)

module.exports = User
