import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { addNewBlog } from "../reducers/blogReducer";
import { useField } from "../services/services";

const NewBlog = ({ blogFormRef }) => {
  const dispatch = useDispatch();
  const [title, resetTitle] = useField("text");
  const [author, resetAuthor] = useField("text");
  const [url, resetUrl] = useField("text");

  const createBlog = (event) => {
    event.preventDefault();

    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
    };

    try {
      blogFormRef.current.toggleVisibility();

      dispatch(addNewBlog(blogObject));

      dispatch(
        setNotification(
          `A new blog ${blogObject.title} by ${blogObject.author} has been created!`,
          "message",
          2.5
        )
      );
    } catch (exception) {
      dispatch(setNotification("Error", "error", 2.5));
    }
    
    resetTitle()
    resetAuthor()
    resetUrl()
  };

  return (
    <div class="pl-5">
      <form onSubmit={createBlog}>
        <div>
          Title:
          <input
            class="
            form-control
            px-1
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
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
            class="
            form-control
            px-1
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
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
            class="
            form-control
            px-1
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
            type="text"
            value={url.value}
            name="url"
            placeholder="Blog url"
            onChange={url.onChange}
          />
        </div>
        <button
          class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-2 hover:border-transparent rounded" 
          id="new-blog" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
