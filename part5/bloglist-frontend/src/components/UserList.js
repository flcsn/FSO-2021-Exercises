import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserList = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <td>User name</td>
            <td><strong>Blogs created</strong></td>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>
                <Link href='#' to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList