const PersonForm = ({ newName, onNameChange, newNumber, onNumberChange, onAddPerson }) => {
  return (
    <form onSubmit={onAddPerson}>
      <div>name: <input value={newName} onChange={onNameChange} /></div>
      <div>number: <input value={newNumber} onChange={onNumberChange} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

export default PersonForm