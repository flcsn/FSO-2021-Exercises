const mongoose = require('mongoose')
const config = require('../utils/config')
const uniqueValidator = require('mongoose-unique-validator')

const MONGO_URL = config.MONGODB_URI
mongoose.connect(MONGO_URL)

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minLength: 3
  },
  passwordHash: String,
  name: String,
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)