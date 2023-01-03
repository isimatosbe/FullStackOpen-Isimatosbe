import { setNotification } from '../reducers/notificationReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
    
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

        props.createAnecdote(content)

        props.setNotification(`Anecdote "${content}" created!`, 5)
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

const ConnectedAnecdoteForm = connect(null, { createAnecdote, setNotification })(AnecdoteForm)
export default ConnectedAnecdoteForm