const Header = ({ title }) => (
    <div>
      <h1>{title}</h1>
    </div>
  )
  
const Part = ({ part }) => (
  <div>
    <p>{part.name} {part.exercises}</p>
  </div>
)

const Content = ({ parts }) => {
  const total = parts.map(part => part.exercises).reduce((acc, a) => acc + a)
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part} />)}
      <strong>Total of {total} exercises</strong>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

export default Course