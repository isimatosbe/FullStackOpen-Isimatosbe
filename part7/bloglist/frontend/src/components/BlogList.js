import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogList = () => {
  const blogs = useSelector((state) => state.blog);

  return (
    <div id="blogForm">
      {[...blogs]
        .sort((a, b) => b.likes > a.likes)
        .map((blog) => (
          <div key={blog.id} class="pl-2">
            <Link
                class="block
                       px-3
                       py-2
                       border-b border-gray-200
                       w-full
                       hover:bg-gray-100 hover:text-gray-500
                       focus:outline-none focus:ring-0 focus:bg-gray-200 focus:text-gray-600
                       transition
                       duration-500
                       cursor-pointer" 
                to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default BlogList;
