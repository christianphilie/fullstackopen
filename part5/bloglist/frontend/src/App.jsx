import { useState, useEffect } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogCreateForm from './components/BlogCreateForm'

import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [notification, setNotification] = useState({ message: null })

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const notifyWith = (message, isError = false) => {
    setNotification({ message, isError })
    setTimeout(() => {
      setNotification({ message: null })
    }, 5000)
  }

  const handleCreateBlog = (event) => {
    event.preventDefault()
    blogService
      .create({ title, author, url })
      .then((blog) => {
        notifyWith(`${blog.title} by ${blog.author} created`)
        setBlogs(blogs.concat(blog))
        setTitle('')
        setAuthor('')
        setUrl('')
      })
      .catch((error) => {
        console.log('error creating blog', error)
        notifyWith('Failed to create blog', true)
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
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel="create new blog">
            <BlogCreateForm title={title} author={author} url={url} setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl} handleCreateBlog={handleCreateBlog} />
          </Togglable>
          <BlogList blogs={blogs} />
        </>
      )}
    </>
  )
}

export default App