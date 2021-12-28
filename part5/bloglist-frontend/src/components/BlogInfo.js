import React from 'react'
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

const BlogInfo = ({ blog, props }) => {
  const { addLike, removeBlog, user, addComment } = props

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
      { user.username === blog.user.username
        ? <button onClick={(event) => removeBlog(blog, event)}>remove</button>
        : null }
      <Link href='#' to='/blogs'>return</Link>
      <CommentForm blog={blog} addComment={addComment} />
      <CommentList blog={blog} />
    </div>
  )
}

export default BlogInfo