import React from 'react'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, removeBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blogDefaultInfo'>
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

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired
}

export default Blog