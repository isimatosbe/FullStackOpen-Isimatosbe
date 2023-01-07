import Blog from "./Blog";
import { useSelector } from "react-redux";

const BlogList = () => {
    const blogs = useSelector(state => state.blog)

    return (
        <div id="blogForm">
            {[...blogs]
                .sort((a, b) => b.likes > a.likes)
                .map((blog) => (
                    <Blog key={blog.id} blog={blog} />
                ))}
        </div>
    )
};

export default BlogList