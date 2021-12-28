import React from 'react'

const CommentList = ({ blog }) => {
  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {blog.comments.map(comment =>
          <li key={Math.random()}>{comment}</li>
        )}
      </ul>
    </div>
  )
}

export default CommentList