const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString() // changes _id to id
    delete returnedObject._id // removes the _id
    delete returnedObject.__v // removes the __v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
