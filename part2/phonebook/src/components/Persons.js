import React from 'react'

const Persons = ({filteredPersons, handleDelete}) => (
  <div>
    {filteredPersons.map((person) => 
      <p key={person.id}>{person.name} {person.number}<button onClick={() => handleDelete(person)}>delete</button></p>)}
  </div>
)

export default Persons