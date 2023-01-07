import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  type: "",
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    notificationMessage(state, action) {
      return {
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    clearNotification() {
      return { message: null, type: "" };
    },
  },
});

export const { notificationMessage, clearNotification, setTimeoutID } =
  notificationSlice.actions;

export const setNotification = (message, type, seconds) => {
  return async (dispatch) => {
    dispatch(notificationMessage({ message, type }));

    setTimeout(() => {
      dispatch(clearNotification());
    }, seconds * 1000);
  };
};

export default notificationSlice.reducer;
