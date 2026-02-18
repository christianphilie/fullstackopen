import { useEffect } from 'react'

import blogService from './services/blogs'

import Notification from './components/Notification'
import AuthView from './components/AuthView'
import BlogView from './components/BlogView'

import { useNotification } from './hooks/useNotification'
import { useUser } from './hooks/useUser'

const App = () => {
  const { notification } = useNotification()
  const { user, setUser } = useUser()

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInBloglistUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [setUser])

  return (
    <>
      <Notification notification={notification} />
      {user ? <BlogView /> : <AuthView />}
    </>
  )
}

export default App
