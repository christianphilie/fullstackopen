import { useRef } from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'

import { useBlogs } from '../hooks/useBlogs'
import { useUser } from '../hooks/useUser'
import { useNotification } from '../hooks/useNotification'
import { useAuth } from '../hooks/useAuth'
import { useUsers } from '../hooks/useUsers'

import Menu from './Menu'
import BlogList from './BlogList'
import BlogCreateForm from './BlogCreateForm'
import Togglable from './Togglable'
import Users from './Users'
import User from './User'

const LoggedInView = () => {
  const { blogs, createBlog, likeBlog, deleteBlog } = useBlogs()
  const { user } = useUser()
  const { notifyWith } = useNotification()
  const { handleLogout } = useAuth()
  const blogFormRef = useRef()

  const { users = [] } = useUsers()
  const match = useMatch('/users/:id')
  const currentUser = match ? users.find((user) => user.id === match.params.id) : user

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
      <p>
        {user.name} logged in (@{user.username}) <button onClick={handleLogout}>logout</button>
      </p>
      <Menu style={{ marginBottom: 30 }} loggedInUserId={user.id} />
      <Routes>
        <Route
          path="/"
          element={
            <BlogList blogs={blogs} handleLike={handleLike} handleDelete={handleDelete} user={user}>
              <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                <BlogCreateForm createBlog={addBlog} />
              </Togglable>
            </BlogList>
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User user={currentUser} />} />
      </Routes>
    </>
  )
}

export default LoggedInView
