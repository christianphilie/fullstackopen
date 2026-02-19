import { useReducer, useCallback, useRef, useEffect } from 'react'
import { NotificationContext } from './NotificationContext'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        message: action.payload.message,
        isError: action.payload.isError || false,
      }
    case 'CLEAR_NOTIFICATION':
      return {
        message: null,
        isError: false,
      }
    default:
      return state
  }
}

const initialState = {
  message: null,
  isError: false,
}

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, initialState)
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (notification.message) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [notification.message])

  const notifyWith = useCallback((message, isError = false) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: { message, isError },
    })
  }, [])

  const value = {
    notification,
    dispatch,
    notifyWith,
  }

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}
