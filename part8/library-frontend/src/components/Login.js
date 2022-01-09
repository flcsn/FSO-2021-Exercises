import React, { useState } from 'react'

const Login = ({ show, handleLogin }) => {  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (!show)
    return null

  const formSubmit = (event) => {
    event.preventDefault()
    
    handleLogin(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={formSubmit}>
        <label>username: </label>
        <input 
          type='text' 
          value={username} 
          onChange={({ target }) => setUsername(target.value)}
        />
        <br/>
        <label>password: </label>
        <input 
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br/>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default Login