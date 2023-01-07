import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const likeBlogID = async (id) => {
  const blogs = await getAll()
  const blog = blogs.filter(blog => blog.id === id)[0]

  const likedBlog = {...blog, likes: blog.likes + 1}
  const response = await update(id, likedBlog)
  return response;
}

export default { getAll, create, update, setToken, deleteBlog, likeBlogID };
