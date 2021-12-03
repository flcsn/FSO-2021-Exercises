import React from 'react'

const Login = ({ handleLogin, username, password, usernameChange, passwordChange }) => {
  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <input id='usernameField' type='text' name='username' value={username} onChange={usernameChange}/>
        <input id='passwordField' type='password' name='password' value={password} onChange={passwordChange}/>
        <button id='loginButton' type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login

