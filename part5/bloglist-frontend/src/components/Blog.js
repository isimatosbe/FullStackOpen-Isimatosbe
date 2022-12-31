import { useState } from 'react'
import blogService from '../services/blogs'

const handleLike = ({ blog, blogs, setBlogs }) => {
  const newBlog = {
    ...blog,
    likes: blog.likes + 1,
    user: blog.user.id
  }

  blogService.update(blog.id, newBlog)

  setBlogs(blogs.map(b => {
    if (b.id === blog.id) {
      return { ...b, likes: b.likes + 1 }
    }
    else {
      return b
    }
  }))
}

const handleRemove = async ({ blog, blogs, setBlogs, setErrorMessage, setErrorClassName }) => {
  if (window.confirm(`Do you really want to remove ${blog.title} by ${blog.author}?`)) {
    try {
      await blogService.deleteBlog(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      setErrorClassName('message')
      setErrorMessage(`Blog ${blog.title} by ${blog.author} successfully deleted!`)
    }
    catch (error) {
      setErrorClassName('error')
      setErrorMessage(error.response.data.error)
    }

    setTimeout(() => {
      setErrorMessage(null)
    }, 2500)
  }
}

const Blog = ({ blog, blogs, setBlogs, setErrorMessage, setErrorClassName }) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className="blogStyle">
      <div>
        {blog.title} by {blog.author}
        <button onClick={() => setVisible(!visible)}>{visible ? 'Hide' : 'View'}</button>
        <div style={{ display: visible ? '' : 'none' }}>
          <p>Url: {blog.url}</p>
          <p>Likes: {blog.likes} <button onClick={() => handleLike({ blog, blogs, setBlogs })}>Like</button></p>
          <p>Creator: {blog.user.name}</p>
          <button onClick={() => handleRemove({ blog, blogs, setBlogs, setErrorMessage, setErrorClassName })}>Remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog