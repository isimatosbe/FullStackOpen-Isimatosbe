import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    message: null,
    className: ''
}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    notificationMessage(state, action) {
      return {
        message: action.payload.message,
        className: action.payload.className
      }
    },
    clearNotification() {
      return {message: null, className: ''}
    }
  }
})

export const { notificationMessage, clearNotification, setTimeoutID } = notificationSlice.actions

export const setNotification = (message, className, seconds) => {
  return async dispatch => {
    dispatch(notificationMessage({message, className}))
    
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds*1000)

  }
}

export default notificationSlice.reducer