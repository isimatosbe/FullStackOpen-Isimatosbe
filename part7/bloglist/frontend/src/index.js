import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from "./App";
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import "./output.css";

const store = configureStore({
  reducer: {
    blog: blogReducer,
    notifications: notificationReducer,
    user: userReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
