import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
    
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        
        dispatch(newAnecdote(content))

        dispatch(setNotification(`Anecdote "${content}" created!`))
        setTimeout(() => {
            dispatch(setNotification(null))
          }, 5000)
      }

    return (
        <div>
            <h2>Create new anecdote</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote'/></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm