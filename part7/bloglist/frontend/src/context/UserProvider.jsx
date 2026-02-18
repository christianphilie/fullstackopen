import { useReducer, useCallback } from 'react'
import { UserContext } from './UserContext'

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

const initialState = null

export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, initialState)

  const setUser = useCallback((newUser) => {
    dispatch({ type: 'SET_USER', payload: newUser })
  }, [])

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' })
  }, [])

  const value = {
    user,
    setUser,
    logout,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
