const Blog = require('../models/blog')

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
    
module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}