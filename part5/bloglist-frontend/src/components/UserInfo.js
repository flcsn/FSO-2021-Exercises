import React from 'react'
import { Link } from 'react-router-dom'

const UserInfo = ({ user }) => {
  if (!user)
    return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
      <Link href='#' to='/users'>return</Link>
    </div>
  )
}

export default UserInfo