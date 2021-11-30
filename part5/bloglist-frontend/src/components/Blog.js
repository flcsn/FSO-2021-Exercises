import React from 'react'
import Togglable from './Togglable'

const Blog = ({blog}) => {
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
      {blog.likes} <button>like</button>
      <br/>
      {blog.user === null ? 'no creator' : blog.user}
      <br/>
    </Togglable>
  </div>  
  )
}

export default Blog