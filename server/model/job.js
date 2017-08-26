const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const autoIncrement = require('mongoose-auto-increment')
const Schema = mongoose.Schema

autoIncrement.initialize(mongoose.connection)

const jobSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 8
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
    // minlength: 160
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isAuthor: {
    type: Boolean,
    default: false
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
    default: '',
    validate: {
      validator (v) {
        /* eslint-disable */
        return !!v.match(/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g);
      },
      message: '{VALUE} is not a valid url!'
    }
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
