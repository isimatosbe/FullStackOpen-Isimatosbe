import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    message: null,
    timeoutID: null
}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    notificationMessage(state, action) {
      return {...state, message: action.payload}
    },
    clearNotification(state, action) {
      return {message: null, timeoutID: null}
    },
    setTimeoutID(state, action) {
      clearTimeout(state.timeoutID)
      return {...state, timeoutID: action.payload}
    }
  }
})

export const { notificationMessage, clearNotification, setTimeoutID } = notificationSlice.actions

export const setNotification = (message, seconds) => {
  return async dispatch => {
    dispatch(notificationMessage(message))
    
    const timeoutID = setTimeout(() => {
      dispatch(clearNotification())
    }, seconds*1000)

    dispatch(setTimeoutID(timeoutID))
  }
}

export default notificationSlice.reducer