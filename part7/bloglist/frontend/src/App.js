import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect } from "react";
import Home from "./components/Home";
import Users from "./components/Users";
import Notification from "./components/Notification";
import { useField } from "./services/services";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/LoginForm";
import { logoutUser } from "./reducers/userReducer";
import { initializeUser } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import UserPage from "./components/UserPage";
import BlogPage from "./components/BlogPage";

const App = () => {
  const dispatch = useDispatch();
  const [username, resetUsername] = useField("text");
  const [password, resetPassword] = useField("text");
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
  }, [dispatch]);

  return (
    <Router>
      <Notification />
      {user === null ? (
        <LoginForm username={username} resetUsername={resetUsername}
                   password={password} resetPassword={resetPassword} />
      ) : (
        <div>
          <div class="flex p-2">
            <Link
              class="inline-block rounded border border-white py-1 px-3 text-blue-500 hover:border-gray-200 hover:bg-gray-200"
              to="/"
            >
              Blogs
            </Link>
            <Link
              class="inline-block rounded border border-white py-1 px-3 text-blue-500 hover:border-gray-200 hover:bg-gray-200"
              to="/users"
            >
              Users
            </Link>
            <p>
              {user.name} logged-in
              <button
                class="inline-block rounded border border-white py-1 px-1 text-blue-500 hover:border-gray-200 hover:bg-gray-200"
                onClick={() => dispatch(logoutUser())}
              >
                logout
              </button>
            </p>
          </div>
          <h2 class="pl-5 text-2xl font-bold">Blogs</h2>
          <Routes>
            <Route path="/users/:id" element={<UserPage />} />
            <Route path="/blogs/:id" element={<BlogPage />} />
            <Route path="/users" element={<Users />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      )}
    </Router>
  );
};

export default App;
