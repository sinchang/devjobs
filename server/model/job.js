const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const autoIncrement = require('mongoose-auto-increment')
const Schema = mongoose.Schema

autoIncrement.initialize(mongoose.connection)

const jobSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  companyName: {
    type: String,
    required: true,
    default: ''
  },
  companyLogo: {
    type: String,
    required: true,
    default: ''
  },
  companyWebsite: {
    type: String,
    default: ''
  },
  language: {
    type: Array,
    required: true
  },
  author: {
    type: Number,
    ref: 'User'
  }
}, {
  timestamps: {
    createdAt: 'createdAt'
  }
})

jobSchema.plugin(uniqueValidator)
jobSchema.plugin(autoIncrement.plugin, { model: 'Job', field: '_id' })

const Jobs = mongoose.model('Job', jobSchema)

module.exports = Jobs
