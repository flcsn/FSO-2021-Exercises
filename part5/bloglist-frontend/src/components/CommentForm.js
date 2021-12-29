import React from 'react'
import { Button, Form } from 'react-bootstrap'

const CommentForm = ({ blog, addComment }) => {
  return (
    <div>
      <Form onSubmit={(event) => addComment(blog, event)}>
        <Form.Group>
          <Form.Control
            type='text'
            name='comment'
            placeholder='Add your thoughts!'
          />
          <Button variant='primary' type='submit'>Send comment</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default CommentForm