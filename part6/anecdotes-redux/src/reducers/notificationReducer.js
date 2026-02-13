import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload ?? state
    },
    clearNotification() {
      return ''
    }
  }
})

const { setNotification, clearNotification } = notificationSlice.actions

let timeoutId = null

export const showNotification = (message, duration) => {
  return async dispatch => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    dispatch(setNotification(message))
    timeoutId = setTimeout(() => dispatch(clearNotification()), duration * 1000)
  }
} 

export default notificationSlice.reducer