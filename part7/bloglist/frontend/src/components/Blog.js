import { useState } from "react";
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false);

  const handleRemove = async ({ blog }) => {
    if (
      window.confirm(
        `Do you really want to remove ${blog.title} by ${blog.author}?`
      )
    ) {
      try {
        dispatch(deleteBlog(blog.id))
        
        dispatch(setNotification(`Blog ${blog.title} by ${blog.author} successfully deleted!`, "message", 2.5))
      
      } catch (error) {
        dispatch(setNotification(error.response.data.error, "error", 2.5))
      }
    }
  };

  const like = async (blog) => {
    dispatch(likeBlog(blog.id))

    dispatch(setNotification(`You have liked "${blog.title}"`, "message", 2.5))
  }

  return (
    <div className="blogStyle">
      <div>
        {blog.title} by {blog.author}
        <button id="view-blog" onClick={() => setVisible(!visible)}>
          {visible ? "Hide" : "View"}
        </button>
        <div style={{ display: visible ? "" : "none" }}>
          <p>Url: {blog.url}</p>
          <p>
            Likes: {blog.likes}
            <button id="like-blog" onClick={() => like(blog)}>
              Like
            </button>
          </p>
          <p>Creator: {blog.user.name}</p>
          <button
            id="delete-blog"
            onClick={() => handleRemove({ blog })} >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
