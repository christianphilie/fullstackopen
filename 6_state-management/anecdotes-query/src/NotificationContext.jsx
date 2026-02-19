import { createContext, useReducer, useRef } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)
  const timeoutRef = useRef(null)

  const showNotification = (message, seconds = 5) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    notificationDispatch({ type: 'SET_NOTIFICATION', payload: message })
    timeoutRef.current = setTimeout(() => {
      notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
      timeoutRef.current = null
    }, seconds * 1000)
  }

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext