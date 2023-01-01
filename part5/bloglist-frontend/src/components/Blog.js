import { useState } from 'react'
import blogService from '../services/blogs'

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

const Blog = ({ blog, blogs, setBlogs, setErrorMessage, setErrorClassName, handleLike }) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className="blogStyle">
      <div>
        {blog.title} by {blog.author}
        <button id='view-blog' onClick={() => setVisible(!visible)}>{visible ? 'Hide' : 'View'}</button>
        <div style={{ display: visible ? '' : 'none' }}>
          <p>Url: {blog.url}</p>
          <p>Likes: {blog.likes} <button id='like-blog' onClick={() => handleLike({ blog })}>Like</button></p>
          <p>Creator: {blog.user.name}</p>
          <button id='delete-blog' onClick={() => handleRemove({ blog, blogs, setBlogs, setErrorMessage, setErrorClassName })}>Remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog