import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    replaceBlog(state, action) {
        return state.map(blog => 
          blog.id !== action.payload.id ? blog : action.payload
          )
    },
    newBlog(state, action) {
        return state.concat(action.payload)
    },
    setBlogList(state, action) {
        return action.payload
    },
    removeBlog(state, action) {
        return state.filter(blog => blog.id !== action.payload)
    }
  }
})

export const { replaceBlog, newBlog, setBlogList, removeBlog } = blogSlice.actions

export const addNewBlog = (blogObject) => {
  return async dispatch => {
    const createdBlog = await blogService.create(blogObject);
    dispatch(newBlog(createdBlog))
  }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogList(blogs))
    }
}

export const likeBlog = content => {
    return async dispatch => {
        const updatedBlog = await blogService.likeBlogID(content)
        dispatch(replaceBlog(updatedBlog))
    }
}

export const deleteBlog = content => {
    return async dispatch => {
        await blogService.deleteBlog(content);
        dispatch(removeBlog(content))
    }
}

export default blogSlice.reducer