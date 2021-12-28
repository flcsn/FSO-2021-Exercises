import React from 'react'
import { Link } from 'react-router-dom'

const BlogInfo = ({ blog, props }) => {
  const { addLike, removeBlog, user } = props

  return (
    <div className='blogDefaultInfo'>
      <h2>{blog.title}</h2>
      {blog.author}
      {blog.url}
      <br/>
      {blog.likes + ' like(s)'} <button id='likeButton' onClick={(event) => addLike(blog, event)}>like</button>
      <br/>
      {blog.user === null ? 'no creator' : blog.user.id}
      <br/>
      { user === blog.user.username
        ? <button onClick={removeBlog}>remove</button>
        : null }
      <Link href='#' to='/blogs'>return</Link>
    </div>
  )
}

export default BlogInfo