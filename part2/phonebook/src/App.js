import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filteredPersons, setFilteredPersons ] = useState([])
  const [ notification, setNotification ] = useState({
    message : '',
    type : ''
  })

  const hook = () => {
    personService.getAll()
      .then(data => {
        console.log("response is ", data)
        setPersons(data)
        setFilteredPersons(data)
      })
  }

  useEffect(hook, [])

  const handleSubmission = (event) => {
    event.preventDefault()
    const foundPerson = persons.find(person => person.name === newName)
    let update = false
    if (foundPerson !== undefined) {
      update = window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)
      if (!update) return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    update 
    ? personService.update(foundPerson, newPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
        setNewName("")
        setNewNumber("")
      })
      .then(() => {
        setNotification({
          message: `Created person ${newPerson.name} successfully`,
          type:'success'
        })
        setTimeout(() => {
          setNotification({message:'', type:''})
        }, 5000)
      })
      .catch(() => {
        setNotification({
          message: `${newPerson.name} has already been removed from the server`,
          type:'fail'
        })
        setTimeout(() => {
          setNotification({message:'', type:''})
        }, 5000)
      })
    : personService.create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
      })
      .then(() => {
        setNotification({
          message: `Created person ${newPerson.name} successfully`,
          type:'success'
        })
        setTimeout(() => {
          setNotification({message:'', type:''})
        }, 5000)
      })
      .catch(() => {
        setNotification({
          message: `${newPerson.name} has already been removed from the server`,
          type:'fail'
        })
        setTimeout(() => {
          setNotification({message:'', type:''})
        }, 5000)
      })
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

  const handleDelete = (person) => {
    const result = window.confirm(`Delete ${person.name}?`)
    if (!result) return
    personService.del(person)
      .then(setPersons(persons.filter(p => p.id !== person.id)))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter eventHandler={handleQueryChange} />
      <h2> add a new </h2>
      <PersonForm submitHandler={handleSubmission}
        nameHandler={handleNameChange}
        numberHandler={handleNumberChange}
        newName={newName}
        newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App