import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
        return action.payload
    },

    resetUser() {
        return null
    }
  }
})

export const { setUser, resetUser } = userSlice.actions

export const initializeUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            blogService.setToken(user.token);
            dispatch(setUser(user))
        }
    }
}

export const loginUser = (username, password) => {
    return async dispatch => {
        try {
            const user = await loginService.login({
              username: username,
              password: password,
            });
      
            window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
            blogService.setToken(user.token);

            dispatch(setUser(user))
            dispatch(setNotification(`Username ${username} logged in!`, "message", 2.5))
          } catch (exception) {
            dispatch(setNotification("Wrong credentials", "error", 2.5))
          }
    }
}

export const logoutUser = () => {
    return async dispatch => {
        window.localStorage.removeItem("loggedNoteappUser");
        dispatch(resetUser());
        dispatch(setNotification("User logged out!", "message", 2.5))
    }
}

export default userSlice.reducer