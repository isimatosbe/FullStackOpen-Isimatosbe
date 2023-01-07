import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, addComment } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useField } from "../services/services";

const BlogPage = () => {
  const dispatch = useDispatch();
  const blogList = useSelector((state) => state.blog);
  const id = useParams().id;

  const [comment, resetComment] = useField("text");

  const like = async (blog) => {
    dispatch(likeBlog(blog.id));

    dispatch(setNotification(`You have liked "${blog.title}"`, "message", 2.5));
  };

  if (blogList !== []) {
    const blog = blogList.find((u) => u.id === id);
    if (!blog) {
      return null;
    }

    const postComment = (event) => {
      event.preventDefault();

      try {
        dispatch(addComment(blog, comment.value));

        dispatch(
          setNotification("Your comment have been posted!", "message", 2.5)
        );
      } catch (exception) {
        dispatch(setNotification("Error", "error", 2.5));
      }

      resetComment()
    };

    return (
      <div class="pl-5">
        <h2 class="pt-2 pb-2 first-line:text-xl font-bold">
          {blog.title} by {blog.author}
        </h2>
        <div class="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
            <p class="px-2 py-2 border-b border-gray-200 w-full"><a href={blog.url}>{blog.url}</a></p>
            <p class="px-2 py-2 border-b border-gray-200 w-full">
            Likes: {blog.likes}
            <button 
                class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-2 hover:border-transparent rounded"
                onClick={() => like(blog)}>Like</button>
            </p>
            <p class="px-2 py-2 w-full rounded-b-lg">Added by {blog.user.name}</p>
        </div>
        
        <h3 class="pt-2 text-l font-bold">Comments</h3>
        <form onSubmit={postComment}>
          <input 
            class=" form-control
            px-3
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
            {...comment} />
          <button
            class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-3 hover:border-transparent rounded" 
            type="submit">Comment</button>
        </form>
        <ul class="bg-white rounded-lg w-96 text-gray-900">
          {blog.comments.map((comment) => (
            <li class="py-2 border-b border-gray-200 w-full" key={comment}>{comment}</li>
          ))}
        </ul>
      </div>
    );
  }
};

export default BlogPage;
