const Blog = require('../models/blog')
const blogsRouter = require('express').Router()
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', (request, response) => {
  Blog.find({})
    .populate('user', { username: 1, name: 1, id: 1 })
    .then((blogs) => {
      response.json(blogs)
    })
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const user = request.user
  const blog = new Blog(request.body)

  blog.likes = blog.likes | 0
  blog.user = user._id

  if (!blog.title || !blog.url) {
    return response.status(400).send({ error: 'title or url missing' })
  }

  user.blogs = user.blogs.concat(blog._id)
  await user.save()

  await blog.save()
  response.status(201).json(await blog.withUser())
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(204).end()
  }

  if (user.id.toString() !== blog.user.toString()) {
    return response.status(403).json({ error: 'user not authorized' })
  }

  user.blogs = user.blogs.filter((b) => b.id.toString() !== blog.id.toString())
  await blog.deleteOne()

  response.status(204).end()
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes

  await blog.save()
  response.json(await blog.withUser())
})

blogsRouter.post('/:id/like', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  blog.likes = blog.likes + 1

  await blog.save()
  response.status(201).json(await blog.withUser())
})

blogsRouter.post('/:id/comment', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const comment = request.body.comment

  if (!blog || !comment) {
    return response.status(404).end()
  }

  blog.comments.push(comment)

  await blog.save()
  response.status(201).json(await blog.withUser())
})

module.exports = blogsRouter
