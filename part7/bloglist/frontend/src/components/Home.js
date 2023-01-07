import { useRef } from "react";
import NewBlog from "./NewBlog";
import Togglable from "./Togglable";
import BlogList from "./BlogList";

const Home = () => {
  const blogFormRef = useRef();

  return (
    <div>
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <NewBlog blogFormRef={blogFormRef} />
      </Togglable>

      <BlogList />
    </div>
  );
};

export default Home;
