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
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    default: ''
  },
  companyLogo: {
    type: String,
    default: ''
  },
  companyWebsite: {
    type: String,
    default: ''
  },
  companyDesc: {
    type: String,
    default: ''
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    default: 'member'
  }
}, {
  timestamps: {
    createdAt: 'created_at'
  }
})

userSchema.plugin(uniqueValidator)
userSchema.plugin(autoIncrement.plugin, { model: 'User', field: '_id' })

const User = mongoose.model('User', userSchema)

module.exports = User
