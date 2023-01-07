import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Users = () => {
  const userList = useSelector((state) => state.user.userList);

  return (
    <div class="pl-5">
      <h2 class="pt-2 pb-2 first-line:text-xl font-bold">Users</h2>
      <table>
        <thead class="border-b bg-gray-800">
          <tr>
            <th class="text-sm font-medium text-white px-6 py-4">User</th>
            <th class="text-sm font-medium text-white px-6 py-4">Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {[...userList]
            .sort((a,b) => b.blogs.length > a.blogs.length)
            .map((user) => (
            <tr 
                class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                key={user.id}>
              <td>
                <Link 
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                    to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td class="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
