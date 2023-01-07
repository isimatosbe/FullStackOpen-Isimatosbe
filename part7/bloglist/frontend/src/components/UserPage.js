import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UserPage = () => {
  const userList = useSelector((state) => state.user.userList);
  const id = useParams().id;
  const user = userList.find((u) => u.id === id);
  const userBlogs = user.blogs;

  return (
    <div class="pl-5">
      <h2 class="pt-2 first-line:text-xl font-bold">User {user.name}</h2>
      <h3 class="pt-2 pb-1 first-line:text-l font-bold">Added blogs</h3>
      <ul class="bg-white rounded-lg w-96 text-gray-900">
        {userBlogs.map((blog) => (
          <li class="py-2 border-b border-gray-200 w-full" key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
