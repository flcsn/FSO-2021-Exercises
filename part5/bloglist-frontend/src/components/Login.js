import React from 'react'
import { Form, Button } from 'react-bootstrap'

const Login = ({ handleLogin, username, password, usernameChange, passwordChange }) => {
  return (
    <div className='container-fluid'>
      <h2>Log in</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username: </Form.Label>
          <Form.Control
            type='text'
            name='username'
            value={username}
            onChange={usernameChange}
          />
          <Form.Label>Password: </Form.Label>
          <Form.Control
            id='passwordField'
            type='password'
            name='password'
            value={password}
            onChange={passwordChange}
          />
          <Button variant='primary' type='submit'>
            Login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default Login

