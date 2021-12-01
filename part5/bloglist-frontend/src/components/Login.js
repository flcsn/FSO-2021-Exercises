import React from 'react'

const Login = ({ handleLogin, username, password, usernameChange, passwordChange }) => {
  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <input type='text' name='username' value={username} onChange={usernameChange}/>
        <input type='password' name='password' value={password} onChange={passwordChange}/>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default Login

