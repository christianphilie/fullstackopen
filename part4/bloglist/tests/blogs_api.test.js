const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(blog => blog.title)
  assert(titles.includes('Go To Statement Considered Harmful'));
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://test.com/',
    likes: 0
  }
  await api.
    post('/api/blogs').
    send(newBlog).
    expect(201).
    expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(blog => blog.title)
  assert(titles.includes('Test Blog'))
})

test('unique identifier property of blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  assert.ok(blogs[0].id !== undefined)
})


test('a blog without a title is not added', async () => {
  const newBlog = {
    author: 'Jane Austen',
    url: 'https://literature.com/pride-and-prejudice',
    likes: 2
  }

  await api.
    post('/api/blogs').
    send(newBlog).
    expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('a blog without a url is not added', async () => {
  const newBlog = {
    title: 'Enjoyable Reading List',
    author: 'Jane Austen',
    likes: 5
  }

  await api.
    post('/api/blogs').
    send(newBlog).
    expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('a blog without an author is added with the author "unknown"', async () => {
  const newBlog = {
    title: 'New Discoveries in Math',
    url: 'https://mathnews.com/new-discoveries',
    likes: 8
  }

  await api.
    post('/api/blogs').
    send(newBlog).
    expect(201).
    expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const authors = blogsAtEnd.map(blog => blog.author)
  assert(authors.includes('unknown'))
})

test('a blog without a likes property is added with the likes property set to 0', async () => {
  const newBlog = {
    title: 'DevOps Fundamentals',
    author: 'Grace Hopper',
    url: 'https://techblog.dev/devops-fundamentals'
  }

  await api.
    post('/api/blogs').
    send(newBlog).
    expect(201).
    expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const likes = blogsAtEnd.map(blog => blog.likes)
  assert(likes.includes(0))
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToView = blogsAtStart[0]

  const resultBlog = await api.get(`/api/blogs/${blogToView.id}`)
  assert.deepStrictEqual(resultBlog.body, blogToView)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
    
  const ids = blogsAtEnd.map(blog => blog.id)
  assert(!ids.includes(blogToDelete.id))

  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
})

test('a non-existing blog is not found', async () => {
  const nonExistingId = await helper.nonExistingId()
  await api.get(`/api/blogs/${nonExistingId}`).expect(404)
})

after(async () => {
  await mongoose.connection.close()
})