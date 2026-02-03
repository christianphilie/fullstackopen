const _ = require('lodash')

const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, blog) => blog.likes > max.likes ? blog : max, blogs[0])
}

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return undefined
  }

  const grouped = _.countBy(blogs, 'author')
  const authorWithMost = _.maxBy(Object.keys(grouped), author => grouped[author])

  return authorWithMost
    ? { author: authorWithMost, blogs: grouped[authorWithMost] }
    : undefined
}

const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return undefined
  }

  const likesByAuthor = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes
    return acc
  }, {})

  const authorWithMostLikes = _.maxBy(Object.keys(likesByAuthor), author => likesByAuthor[author])

  return authorWithMostLikes
    ? { author: authorWithMostLikes, likes: likesByAuthor[authorWithMostLikes] }
    : undefined
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }