const Header = (props) => <h2>{props.course}</h2>

const Content = (props) => (
  <div>
    {props.parts.map(part => 
      <Part key={part.id} part={part} />
    )}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => <p><b>total of {props.total} exercises</b></p>

const Course = ({course: { id, name, parts }}) => {
	const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
	
	return (
		<div>
			<Header course={name} />
			<Content parts={parts} />
			<Total total={totalExercises} />
		</div>
	)
}

export default Course
