import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import NewBlog from './NewBlog'

test('renders title and author', () => {
  const blog = {
    title: 'Full Stack open 2022',
    author: 'Matti Luukkainen',
    url: 'https://fullstackopen.com/en/',
    likes: 69,
    user: '63aede41924d426387520917'
  }

  render(<Blog blog={blog} />)

  const elementTitle = screen.findByText('Full Stack open 2022')
  const elementAuthor = screen.findByText('Matti Luukkainen')
  const elementUrl = screen.queryByText('https://fullstackopen.com/en/')
  const elementLikes = screen.queryByText(69)

  expect(elementTitle).toBeDefined()
  expect(elementAuthor).toBeDefined()
  expect(elementUrl).toBeNull()
  expect(elementLikes).toBeNull()
})

test('shows url and likes when clicking view', async () => {
  const blog = {
    title: 'Full Stack open 2022',
    author: 'Matti Luukkainen',
    url: 'https://fullstackopen.com/en/',
    likes: 69,
    user: '63aede41924d426387520917'
  }

  const { container } = render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const viewButton = container.querySelector('#view-blog')
  await user.click(viewButton)

  const elementUrl = screen.findByText('https://fullstackopen.com/en/')
  const elementLikes = screen.findByText(69)

  expect(elementUrl).toBeDefined()
  expect(elementLikes).toBeDefined()

})


test('clicking the button twice calls event handler twice', async () => {
  const blog = {
    title: 'Full Stack open 2022',
    author: 'Matti Luukkainen',
    url: 'https://fullstackopen.com/en/',
    likes: 69,
    user: '63aede41924d426387520917'
  }

  const mockHandler = jest.fn()

  const { container } = render(<Blog blog={blog} handleLike={mockHandler} />)

  const user = userEvent.setup()
  const viewButton = container.querySelector('#view-blog')
  await user.click(viewButton)

  const likeButton = container.querySelector('#like-blog')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('NewBlog component calls the handler with correct details', async () => {
  const mockHandler = jest.fn()

  const { container } = render(<NewBlog createBlog={mockHandler} />)
  const newButton = container.querySelector('#new-blog')

  const inputTitle = screen.getByPlaceholderText('Blog title')
  await userEvent.type(inputTitle, 'Testing title form...')

  const inputAuthor = screen.getByPlaceholderText('Blog author')
  await userEvent.type(inputAuthor, 'Testing author form...')

  const inputUrl = screen.getByPlaceholderText('Blog url')
  await userEvent.type(inputUrl, 'Testing url form...')

  await userEvent.click(newButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('Testing title form...')
  expect(mockHandler.mock.calls[0][0].author).toBe('Testing author form...')
  expect(mockHandler.mock.calls[0][0].url).toBe('Testing url form...')
})