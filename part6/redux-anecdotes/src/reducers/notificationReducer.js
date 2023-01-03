import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    notificationMessage(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return null
     }
  }
})

export const { notificationMessage,clearNotification } = notificationSlice.actions

export const setNotification = (message, seconds) => {
  return async dispatch => {
    dispatch(notificationMessage(message))
    
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds*1000)
  }
}

export default notificationSlice.reducer