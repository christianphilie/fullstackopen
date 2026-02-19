const Persons = ({ personsToShow, onDeletePerson }) => {
  return (
    <div>
      {personsToShow.map(person => (
        <div key={person.name}>
          {person.name} {person.number} 
          <button onClick={() => onDeletePerson(person.id)}>delete</button>
        </div>
      ))} 
    </div>
  )
}

export default Persons