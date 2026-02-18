import { useRef } from 'react'
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom'

import { useBlogs } from '../hooks/useBlogs'
import { useUser } from '../hooks/useUser'
import { useNotification } from '../hooks/useNotification'
import { useAuth } from '../hooks/useAuth'
import { useUsers } from '../hooks/useUsers'

import Menu from './Menu'
import BlogList from './BlogList'
import BlogDetail from './BlogDetail'
import BlogCreateForm from './BlogCreateForm'
import Togglable from './Togglable'

import Users from './Users'
import User from './User'

const LoggedInView = () => {
  const { blogs, createBlog, likeBlog, deleteBlog } = useBlogs()
  const { user } = useUser()
  const { notifyWith } = useNotification()
  const { handleLogout } = useAuth()

  const navigate = useNavigate()
  const blogFormRef = useRef()

  const { users = [] } = useUsers()
  const matchUser = useMatch('/users/:id')
  const userToShow = matchUser ? users.find((user) => user.id === matchUser.params.id) : user

  const matchBlog = useMatch('/blogs/:id')
  const blogToShow = matchBlog ? blogs.find((blog) => blog.id === matchBlog.params.id) : null

  const addBlog = (blog) => {
    createBlog(blog, {
      onSuccess: (createdBlog) => {
        blogFormRef.current.toggleVisibility()
        notifyWith(`${createdBlog.title} by ${createdBlog.author} created`)
      },
      onError: (error) => {
        console.log('error creating blog', error)
        notifyWith('Failed to create blog', true)
      },
    })
  }

  const handleLike = (blog) => {
    likeBlog(blog, {
      onSuccess: (updatedBlog) => {
        notifyWith(`liked blog ${updatedBlog.title}`)
      },
      onError: (error) => {
        console.log('error liking blog', error)
        notifyWith('Failed to like blog', true)
      },
    })
  }

  const handleDelete = (blog) => {
    deleteBlog(blog, {
      onSuccess: () => {
        navigate('/')
        notifyWith(`${blog.title} deleted`)
      },
      onError: (error) => {
        if (error.response.status === 403) {
          console.log('user not authorized to delete blog', error)
          notifyWith('You are not authorized to delete this blog', true)
        } else {
          console.log('error deleting blog', error)
          notifyWith('Failed to delete blog', true)
        }
      },
    })
  }

  return (
    <>
      <Menu loggedInUser={user} handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <BlogList blogs={blogs}>
              <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                <BlogCreateForm createBlog={addBlog} />
              </Togglable>
            </BlogList>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <BlogDetail
              blog={blogToShow}
              handleLike={handleLike}
              handleDelete={handleDelete}
              user={user}
            />
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User user={userToShow} />} />
      </Routes>
    </>
  )
}

export default LoggedInView
