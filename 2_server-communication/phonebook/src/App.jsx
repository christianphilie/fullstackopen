import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({ message: '', type: '' })

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleAddPerson = (e) => {
    e.preventDefault()

    // if person already exists, update the number
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find(person => person.name === newName)
        personService.update(
          personToUpdate.id, 
          { name: newName, number: newNumber }
        ).then(returnedPerson => {
            setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
            setNewName('')
            setNewNumber('')
            showNotification(`${newName} was updated successfully`, 'success')
          })
          .catch(error => {
            showNotification(`Information of ${newName} has already been removed from server`, 'error')
            setPersons(persons.filter(person => person.id !== personToUpdate.id))
          })
        }
    } 
    // if person does not exist, create a new person
    else {
      personService.create(
        { name: newName, number: newNumber }
      ).then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          showNotification(`${newName} was added successfully`, 'success')
        })
    }
  }

  const handleDeletePerson = (id) => {
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      personService.remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: '', type: '' })
    }, 5000)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification.message} type={notification.type} />
      <Filter filterValue={filter} onFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm newName={newName} onNameChange={handleNameChange} newNumber={newNumber} onNumberChange={handleNumberChange} onAddPerson={handleAddPerson} />
      <h2>Numbers</h2>
      <Persons personsToShow={persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))} onDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App