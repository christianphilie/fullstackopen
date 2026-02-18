import { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'

import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import BlogList from './components/BlogList'
import BlogCreateForm from './components/BlogCreateForm'

import Notification from './components/Notification'
import { useNotification } from './hooks/useNotification'
import Togglable from './components/Togglable'

const App = () => {
  const { notification, notifyWith } = useNotification()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showSignup, setShowSignup] = useState(false)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const [blogs, setBlogs] = useState([])

  const addBlog = (blog) => {
    blogService
      .create(blog)
      .then((createdBlog) => {
        setBlogs((prevBlogs) => prevBlogs.concat(createdBlog))
        blogFormRef.current.toggleVisibility()
        notifyWith(`${createdBlog.title} by ${createdBlog.author} created`)
      })
      .catch((error) => {
        console.log('error creating blog', error)
        notifyWith('Failed to create blog', true)
      })
  }

  const handleLike = (blog) => {
    blogService
      .like(blog)
      .then((updatedBlog) => {
        setBlogs((prevBlogs) => prevBlogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)))
        notifyWith(`liked blog ${updatedBlog.title}`)
      })
      .catch((error) => {
        console.log('error liking blog', error)
        notifyWith('Failed to like blog', true)
      })
  }

  const handleDelete = (blog) => {
    blogService
      .remove(blog)
      .then(() => {
        notifyWith(`${blog.title} deleted`)
        setBlogs((prevBlogs) => prevBlogs.filter((b) => b.id !== blog.id))
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

  const handleSignup = (event) => {
    event.preventDefault()
    userService
      .signup(username, name, password)
      .then(() => {
        notifyWith('Account created successfully. Please log in.')
        setShowSignup(false)
        setUsername('')
        setName('')
        setPassword('')
      })
      .catch((error) => {
        console.log('error signing up', error)
        const errorMessage = error.response?.data?.error || 'Failed to create account'
        notifyWith(errorMessage, true)
      })
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBloglistUser')
    setUser(null)
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInBloglistUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <>
      <Notification notification={notification} />
      {user === null ? (
        <>
          {showSignup ? (
            <>
              <SignupForm
                username={username}
                name={name}
                password={password}
                setUsername={setUsername}
                setName={setName}
                setPassword={setPassword}
                handleSignup={handleSignup}
              />
              <button onClick={() => setShowSignup(false)}>back to login</button>
            </>
          ) : (
            <>
              <LoginForm
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                handleLogin={handleLogin}
              />
              <button onClick={() => setShowSignup(true)}>sign up</button>
            </>
          )}
        </>
      ) : (
        <>
          <p>
            {user.name} logged in (@{user.username}) <button onClick={handleLogout}>logout</button>
          </p>
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
