import React from 'react'
import Togglable from './Togglable'

const Blog = ({blog, addLike, removeBlog, user}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
  <div style={blogStyle}>
    {blog.title} 
    {blog.author} 
    <Togglable buttonLabel='view details'>
      {blog.url}
      <br/>
      {blog.likes} <button onClick={addLike}>like</button>
      <br/>
      {blog.user === null ? 'no creator' : blog.user.id}
      <br/>
      { user === blog.user.username 
        ? <button onClick={removeBlog}>remove</button>
        : null }
    </Togglable>
  </div>  
  )
}

export default Blog