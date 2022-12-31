import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import './index.css'

const Notification = ({ message, className }) => {
  if (message === null) {
    return
  }
  else {
    return (
      <div className={className}>
        {message}
      </div>
    )
  }
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorClassName, setErrorClassName] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      await window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorClassName('error')
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2500)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const addedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(addedBlog))
      setErrorClassName('message')
      setErrorMessage(`A new blog ${blogObject.title} by ${blogObject.author} has been created!`)
    }
    catch (exception) {
      setErrorClassName('error')
      setErrorMessage(exception)
    }

    setTimeout(() => {
      setErrorMessage(null)
    }, 2500)
  }

  const blogForm = () => (
    <div>
      {blogs.sort((a, b) => b.likes > a.likes).map(blog =>
        <Blog key={blog.id} blog={blog}
          blogs={blogs} setBlogs={setBlogs}
          setErrorMessage={setErrorMessage}
          setErrorClassName={setErrorClassName} />
      )}
    </div>
  )

  return (
    <div>
      <Notification message={errorMessage} className={errorClassName} />
      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password}
        /> :
        <div>
          <h2>Blogs</h2>
          <p>{user.name} logged-in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
            <NewBlog
              createBlog={addBlog}
            />
          </Togglable>

          {blogForm()}
        </div>
      }
    </div>
  )
}

export default App
