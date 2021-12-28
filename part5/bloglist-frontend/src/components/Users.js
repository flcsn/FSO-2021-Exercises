import React, { useState, useEffect } from 'react'
import UserList from './UserList'
import UserInfo from './UserInfo'
import userService from '../services/users'
import {
  Switch, Route,
  useRouteMatch
} from 'react-router-dom'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll()
      .then(response => setUsers(response))
  })

  const match = useRouteMatch('/users/:id')
  const user = match
    ? users.find(u => u.id === match.params.id)
    : null

  return (
    <div>
      <Switch>
        <Route path='/users/:id'>
          <UserInfo user={user} />
        </Route>
        <Route path='/users'>
          <UserList users={users}/>
        </Route>
      </Switch>
    </div>
  )
}

export default Users