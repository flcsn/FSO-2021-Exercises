import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filteredPersons, setFilteredPersons ] = useState(persons)

  const handleSubmission = (event) => {
    event.preventDefault()
    if (persons.filter((person) => person.name === newName).length > 0) {
      alert(`${newName} is already in the phonebook`)
      return
    }
      
    setPersons(persons.concat({
      name: newName,
      number: newNumber,
      id: persons.length+1
    }))
    setNewName("")
    setNewNumber("")
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleQueryChange = (event) => {
    const filter = event.target.value.toUpperCase()
    console.log("filter is ", filter)
    if (filter === "") {
      setFilteredPersons(persons)
      return
    }
    const newFilteredPersons = persons.filter((person) => 
      person.name.toUpperCase().includes(filter))
    console.log("list of filtered persons", newFilteredPersons)
    setFilteredPersons(newFilteredPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter eventHandler={handleQueryChange} />
      <h2> add a new </h2>
      <PersonForm submitHandler={handleSubmission}
        nameHandler={handleNameChange}
        numberHandler={handleNumberChange}
        newName={newName}
        newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App