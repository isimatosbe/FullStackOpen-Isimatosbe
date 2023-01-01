import { useState } from 'react'

const NewBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
                Title:
          <input
            type="text"
            value={title}
            name="Title"
            placeholder='Blog title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
                Author:
          <input type="text"
            value={author}
            name="Author"
            placeholder='Blog author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
                Url:
          <input type="text"
            value={url}
            name="url"
            placeholder='Blog url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='new-blog' type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlog