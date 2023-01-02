import { createSlice } from '@reduxjs/toolkit'

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: generateId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteTo(state, action) {
      return state.map(anecdote => 
        anecdote.id !== action.payload ? anecdote : {...anecdote, votes: anecdote.votes + 1}
        ).sort((a,b) => b.votes > a.votes)
    },
    newAnecdote(state, action) {
      const content = action.payload
      return state.concat({content: content, votes: 0, id: generateId()})
      }
    }
})

export const { voteTo, newAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer