const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString() // changes every object's _id to id
    delete returnedObject._id // removes the _id field
    delete returnedObject.__v // removes the __v field
  }
})

module.exports = mongoose.model('Blog', blogSchema)
