import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = ({ user, handleLogout }) => {
  return (
    <div>
      <Link href='#' to='/blogs'> blogs </Link>
      <Link href='#' to='/users'> users </Link>
      <div>
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>log out</button>
        </p>
      </div>
    </div>
  )
}

export default NavBar