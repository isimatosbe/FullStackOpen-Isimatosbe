import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { addNewBlog } from "../reducers/blogReducer";
import { useField } from "../services/services";

const NewBlog = ({ blogFormRef } ) => {
  const dispatch = useDispatch()
  const title = useField("text")
  const author = useField("text");
  const url = useField("text");

  const createBlog = (event) => {
    event.preventDefault();
    
    const blogObject = {
                        title: title.value,
                        author: author.value,
                        url: url.value,
                       }

    try {
      blogFormRef.current.toggleVisibility();

      dispatch(addNewBlog(blogObject));
      
      dispatch(
        setNotification(
          `A new blog ${blogObject.title} by ${blogObject.author} has been created!`,
          "message", 2.5
        )
      )
    } catch (exception) {
      dispatch(setNotification("Error", "error", 2.5))
    }
  }

  return (
    <div>
      <form onSubmit={createBlog}>
        <div>
          Title:
          <input
            type="text"
            value={title.value}
            name="Title"
            placeholder="Blog title"
            onChange={title.onChange}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={author.value}
            name="Author"
            placeholder="Blog author"
            onChange={author.onChange}
          />
        </div>
        <div>
          Url:
          <input
            type="text"
            value={url.value}
            name="url"
            placeholder="Blog url"
            onChange={url.onChange}
          />
        </div>
        <button id="new-blog" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
