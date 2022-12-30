const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Testing Blog 1',
    author: 'Myself',
    url: 'localhost:3001',
    likes: 1
  },
  {
    title: 'Testing Blog 2',
    author: 'Another Person',
    url: 'localhost:3000',
    likes: 9
  }
]

const initialUser =
  {
    username: 'root',
    name: 'Superuser',
    password: 'salainen'
  }

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'unknown',
    url: 'google.com',
    likes: 0
  })
  
  await blog.save()
  await blog.remove()
    
  return blog.id.toString()
}
    
const blogsInDb = async () => {
  const blog = await Blog.find({})
  return blog.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}
    
module.exports = {
  initialBlogs, 
  initialUser,
  nonExistingId, 
  blogsInDb, 
  usersInDb
}