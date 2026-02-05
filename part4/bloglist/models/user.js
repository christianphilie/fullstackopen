const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString() // changes _id to id
    delete returnedObject._id // removes the _id
    delete returnedObject.__v // removes the __v
    delete returnedObject.passwordHash // ensures the passwordHash is not revealed
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User