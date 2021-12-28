import React from 'react'

const CommentForm = ({ blog, addComment }) => {
  return (
    <div>
      <form onSubmit={(event) => addComment(blog, event)}>
        <input type='text' name='comment' placeholder='add a comment!'></input>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default CommentForm