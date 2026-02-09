import { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogCreateForm from './components/BlogCreateForm'

import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [notification, setNotification] = useState({ message: null })

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const [blogs, setBlogs] = useState([])

  const notifyWith = (message, isError = false) => {
    setNotification({ message, isError })
    setTimeout(() => {
      setNotification({ message: null })
    }, 5000)
  }

  const addBlog = (blog) => {
    blogService.create(blog)
      .then((createdBlog) => {
        setBlogs(blogs.concat(createdBlog))
        blogFormRef.current.toggleVisibility()
        notifyWith(`${createdBlog.title} by ${createdBlog.author} created`)
      })
      .catch((error) => {
        console.log('error creating blog', error)
        notifyWith('Failed to create blog', true)
      })
  }

  const handleLike = (blog) => {
    blogService.like(blog).then(updatedBlog => {
      setBlogs(blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b))
    })
      .catch((error) => {
        console.log('error liking blog', error)
        notifyWith('Failed to like blog', true)
      })
  }

  const handleDelete = (blog) => {
    blogService.remove(blog).then(() => {
      notifyWith(`${blog.title} deleted`)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    })
      .catch((error) => {
        if (error.response.status === 403) {
          console.log('user not authorized to delete blog', error)
          notifyWith('You are not authorized to delete this blog', true)
        } else {
          console.log('error deleting blog', error)
          notifyWith('Failed to delete blog', true)
        }
      })
  }

  const handleLogin = (event) => {
    event.preventDefault()
    loginService
      .login(username, password)
      .then((user) => {
        console.log('user', user)
        notifyWith(`${user.name} logged in`)
        setUser(user)
        blogService.setToken(user.token)
        window.localStorage.setItem('loggedInBloglistUser', JSON.stringify(user))
        setUsername('')
        setPassword('')
      })
      .catch((error) => {
        console.log('error logging in', error)
        notifyWith('Wrong username or password', true)
      })
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBloglistUser')
    setUser(null)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInBloglistUser')
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser))
    }
  }, [])

  return (
    <>
      <Notification notification={notification} />
      {user === null ? (
        <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin} />
      ) : (
        <>
          <p>{user.name} logged in (@{user.username}) <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogCreateForm createBlog={addBlog} />
          </Togglable>
          <BlogList blogs={blogs} handleLike={handleLike} handleDelete={handleDelete} user={user} />
        </>
      )}
    </>
  )
}

export default App