import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogCreateForm from './components/BlogCreateForm'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = (event) => {
    event.preventDefault()
    blogService
      .create({ title, author, url })
      .then((blog) => {
        console.log('blog', blog)
        setBlogs(blogs.concat(blog))
        setTitle('')
        setAuthor('')
        setUrl('')
      })
      .catch((error) => {
        console.log('error creating blog', error)
      })
  }

  const handleLogin = (event) => {
    event.preventDefault()
    loginService
      .login(username, password)
      .then((user) => {
        console.log('user', user)
        setUser(user)
        blogService.setToken(user.token)
        window.localStorage.setItem('loggedInBloglistUser', JSON.stringify(user))
        setUsername('')
        setPassword('')
      })
      .catch((error) => {
        console.log('error logging in', error)
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

  if (user === null) {
    return <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin} />
  } else {
    return (
      <div>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        <BlogCreateForm title={title} author={author} url={url} setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl} handleCreateBlog={handleCreateBlog} />
        <BlogList blogs={blogs} />
      </div>
    ) 
  }
}

export default App