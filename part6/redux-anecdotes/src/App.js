import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

import { useEffect } from 'react'
import { initializeAnecdote } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdote())
    }, [dispatch])

  return (
    <div>
      <Notification />
      <AnecdoteForm />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />    
    </div>
  )
}

export default App