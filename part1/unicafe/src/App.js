import { useState } from 'react'

const Button = (props) => (
    <button onClick={props.handler}>
      {props.text}
    </button> 
)

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td> {props.value}</td>
  </tr>
)

const Statistics = (props) => {
  let total = props.good + props.bad + props.neutral
  let average = (props.good - props.bad) / total
  let positive = 100 * props.good / total
  
  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )    
  }
  else {
    return (
      <table>
        <tbody>
          <StatisticLine text="Good " value={props.good} />
          <StatisticLine text="Neutral " value={props.neutral} />
          <StatisticLine text="Bad " value={props.bad} />
          <StatisticLine text="Total " value={total} />
          <StatisticLine text="Average " value={average} />
          <StatisticLine text="Positive " value={positive + "%"}/>
        </tbody>
      </table>
    )
  }
  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => {
    console.log("Good")
    setGood(good + 1)
  }
  
  const addNeutral = () => {
    console.log("Neutral")
    setNeutral(neutral + 1)
  }
  
  const addBad = () => {
    console.log("Bad")
    setBad(bad + 1)
  }

  return (
    <div>
      <h2>Give feedback</h2>
      <Button text="Good" handler={addGood} />
      <Button text="Neutral" handler={addNeutral} />
      <Button text="Bad" handler={addBad} />

      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App