import React from 'react'
import '../index.css'
import { Alert } from 'react-bootstrap'

const Notification = ({ notification }) => {
  if (notification.message === '')
    return null

  if (notification.type === 'SUCCESS') {
    return (
      <div className="container">
        <Alert variant='success'>
          {notification.message}
        </Alert>
      </div>
    )
  } else if (notification.type === 'FAILURE') {
    return (
      <div className="container">
        <Alert variant='danger'>
          {notification.message}
        </Alert>
      </div>
    )
  }
}

export default Notification