import { useSelector, useDispatch } from 'react-redux'
import { votoToAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)

    const vote = (anecdote) => {
        dispatch(votoToAnecdote(anecdote.id))

        dispatch(setNotification(`You have voted "${anecdote.content}"`, 5))
    }

    const filter = useSelector(state => state.filter)
    const anecdotesToShow = anecdotes.filter(anecdote => 
        anecdote.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1)

    return (
        <div>
            {anecdotesToShow.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList