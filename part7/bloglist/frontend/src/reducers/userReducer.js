import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";
import loginService from "../services/login";
import userService from "../services/users";

const initialState = {
  user: null,
  userList: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    login(state, action) {
      return { ...state, user: action.payload };
    },
    resetUser(state) {
      return { ...state, user: null };
    },
  },
});

export const { setUser, login, resetUser } = userSlice.actions;

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    let user = null;
    if (loggedUserJSON) {
      user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
    }
    const userList = await userService.getAll();
    dispatch(setUser({ user, userList }));
  };
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username: username,
        password: password,
      });

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      blogService.setToken(user.token);

      dispatch(login(user));
      dispatch(setNotification(`User ${username} logged in!`, "message", 2.5));
    } catch (exception) {
      dispatch(setNotification("Wrong credentials", "error", 2.5));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedNoteappUser");
    dispatch(resetUser());
    dispatch(setNotification("User logged out!", "message", 2.5));
  };
};

export default userSlice.reducer;
