const Header = (prop) => {
  return (
    <h1> {prop.course} </h1> 
  )
}

const Part = (prop) => {
  return (
    <p> {prop.part} {prop.exercises}</p>
  )
}

const Content = (prop) => {
  return (
    <div>
      <Part part={prop.p1} exercises={prop.ex1} />
      <Part part={prop.p2} exercises={prop.ex2} />
      <Part part={prop.p3} exercises={prop.ex3} />
    </div>
  )
}

const Total = (prop) => {
  return (
    <p>Number of exercises {prop.total}</p>
  )
}

const App = () => {
  // const-definitions
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content p1={part1} ex1={exercises1} 
               p2={part2} ex2={exercises2}
               p3={part3} ex3={exercises3} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App