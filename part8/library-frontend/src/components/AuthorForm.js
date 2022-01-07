import React from 'react'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, SET_BIRTHYEAR } from '../queries'

const AuthorForm = ({ authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ setBirthYear ] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [{
      query: ALL_AUTHORS
    }],
    onError: (error) => console.log(JSON.stringify(error))
  }) 

  const updateAuthor = (event) => {
    event.preventDefault()
    setBirthYear({
      variables: {
        name,
        born: Number(born)
      }
    })

    setName('')
    setBorn('')
  } 

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={updateAuthor}>
        <label>name</label>
        <select onChange={({ target }) => setName(target.value)}>
          {authors.map(a => 
            <option key={a.name} value={a.name}>{a.name}</option>
          )}
        </select>
        <br/>
        <label>born</label>
        <input
          type='text'
          value={born}
          onChange={({ target }) => setBorn(target.value)}
        />
        <br/>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AuthorForm