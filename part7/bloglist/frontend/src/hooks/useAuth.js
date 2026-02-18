import blogService from '../services/blogs'
import loginService from '../services/login'
import userService from '../services/users'
import { useUser } from './useUser'
import { useNotification } from './useNotification'

export const useAuth = () => {
  const { setUser, logout } = useUser()
  const { notifyWith } = useNotification()

  const handleSignup = (username, name, password) => {
    return userService.signup(username, name, password)
  }

  const handleLogin = (username, password) => {
    loginService
      .login(username, password)
      .then((user) => {
        notifyWith(`${user.name} logged in`)
        setUser(user)
        blogService.setToken(user.token)
        window.localStorage.setItem('loggedInBloglistUser', JSON.stringify(user))
      })
      .catch((error) => {
        console.log('error logging in', error)
        notifyWith('Wrong username or password', true)
      })
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBloglistUser')
    logout()
  }

  return { handleLogin, handleSignup, handleLogout }
}
