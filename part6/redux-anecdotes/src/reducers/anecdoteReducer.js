import { createSlice } from '@reduxjs/toolkit'
import anecdotes from '../services/anecdotes'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    replaceAnecdote(state, action) {
      return state.map(anecdote => 
        anecdote.id !== action.payload.id ? anecdote : action.payload
        ).sort((a,b) => b.votes > a.votes)
      },
    appendAnecdote(state, action) {
      return state.concat(action.payload)
      },
    setAnecdotes(state, action) {
      return action.payload
    }
    }
})

export const { replaceAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes.sort((a,b) => b.votes > a.votes)))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const votoToAnecdote = content => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.voteTo(content)
    dispatch(replaceAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer