import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handler}>
    {props.text}
  </button> 
)

const Leaderboard = ({anecdotes, votes}) => {
  let i = votes.indexOf(Math.max(...votes));
  if (votes[i] === 0) {
    return (
      <p>There are no votes</p>
    )
  }
  else {
    return (
      <p>{anecdotes[i]}</p>
    )
  }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(7))

  const randomChoice = () => {
    let index = Math.floor(Math.random() * 7)
    console.log(index)
    return (
      setSelected(index)
    )
  }

  const Vote = () => {
    const newPoints = [...points]
    newPoints[selected] += 1
    console.log(newPoints)
    return (
      setPoints(newPoints)
    )
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button text="Vote" handler={Vote}/>
      <Button text="Next anecdote" handler={randomChoice}/>

      <h2>Anecdote with most votes</h2>
      <Leaderboard anecdotes={anecdotes} votes={points}/>
    </div>
  )
}

export default App