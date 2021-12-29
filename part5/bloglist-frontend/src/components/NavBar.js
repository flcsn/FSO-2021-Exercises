import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavBar = ({ user, handleLogout }) => {
  return (
    <div>
      <Navbar collapseOnSelect expand='lg'>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#' as='span'>
              <Link to='/'> Home </Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link to='/blogs'> Blogs </Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link href='#' to='/users'> Users </Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              Logged in as {user.name}
              <button onClick={handleLogout}>Log out</button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default NavBar