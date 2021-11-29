import React from 'react'
import '../index.css'

const Notification = ({notification}) => {
  if (notification.message === '') 
    return null

    if (notification.type === 'success') {
      return (
        <div className="success">
          {notification.message}
        </div>
      )
    } else if (notification.type === 'fail') {
      return (
        <div className="error">
          {notification.message}
        </div>
      )
    }
}

export default Notification