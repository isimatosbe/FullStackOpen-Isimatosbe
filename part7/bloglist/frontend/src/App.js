import { useEffect, useRef } from "react";
import LoginForm from "./components/LoginForm";
import NewBlog from "./components/NewBlog";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification"
import { initializeBlogs } from "./reducers/blogReducer";
import { useDispatch, useSelector } from 'react-redux'
import BlogList from "./components/BlogList";
import { useField } from "./services/services"
import { initializeUser, logoutUser } from "./reducers/userReducer";
import "./index.css";

const App = () => {
  const dispatch = useDispatch()
  const username = useField("text");
  const password = useField("text");
  const user = useSelector(state => state.user)

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser())
  }, [dispatch]);  

  return (
    <div>
      <Notification />
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
        />
      ) : (
        <div>
          <h2>Blogs</h2>
          <p>
            {user.name} logged-in <button onClick={() => dispatch(logoutUser())}>logout</button>
          </p>
          <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
            <NewBlog blogFormRef={blogFormRef}/>
          </Togglable>

          <BlogList />
        </div>
      )}
    </div>
  );
};

export default App;
