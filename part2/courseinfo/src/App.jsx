const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => 
        <Part key = {part.id} part={part} />
      )}
    </div>
  )
}

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = ({ total }) => <b>total of {total} exercises</b>

const Course = ({ course }) => {
  const total = course.parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)
  return (
    <div>
      <Header course = { course.name } />
      <Content parts = { course.parts } />
      <Total total = {total} />
    </div>
    )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }
  
  return <Course course={course} />
}

export default App