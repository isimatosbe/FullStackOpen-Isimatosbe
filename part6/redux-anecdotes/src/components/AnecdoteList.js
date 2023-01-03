import { voteToAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
    const anecdotes = props.anecdotes

    const vote = (anecdote) => {
        props.voteToAnecdote(anecdote.id)

        props.setNotification(`You have voted "${anecdote.content}"`, 5)
    }

    const filter = props.filter
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter
    }
}

const ConnectedAnecdoteList = connect(mapStateToProps, { voteToAnecdote, setNotification } )(AnecdoteList)
export default ConnectedAnecdoteList