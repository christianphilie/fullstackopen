const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body

  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'user not found' })
  }
  
  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'title and url are required' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author || 'unknown',
    url: body.url,
    likes: body.likes || 0,
    user: request.user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const body = request.body

  const blog = await Blog.findById(request.params.id)
  
  if (!blog) {
    return response.status(404).end()
  }

  const allowedFields = ['title', 'author', 'url', 'likes']
  allowedFields.forEach(field => {
    blog[field] = body[field] ?? blog[field]
  })

  const updatedBlog = await blog.save()
  response.json(updatedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).end()
  }

  if (blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'unauthorized' })
  }
  
  user.blogs = user.blogs.filter(blog => blog.toString() !== request.params.id)
  await user.save()
  await Blog.findByIdAndDelete(request.params.id)

  response.status(204).end()
})

module.exports = blogsRouter
