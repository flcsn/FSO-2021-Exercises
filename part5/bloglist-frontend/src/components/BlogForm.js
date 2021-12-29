import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const BlogForm = React.forwardRef(({ createNewBlog }, ref) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleTitleChange = ({ target }) => setBlogTitle(target.value)
  const handleAuthorChange = ({ target }) => setBlogAuthor(target.value)
  const handleUrlChange = ({ target }) => setBlogUrl(target.value)

  useImperativeHandle(ref, () => {
    return { blogTitle, blogAuthor, blogUrl }
  })

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={createNewBlog}>
        <Form.Group>
          <Form.Label>Title: </Form.Label>
          <Form.Control
            id='titleField'
            type='text'
            name='title'
            value={blogTitle}
            onChange={handleTitleChange}
          />
          <Form.Label>Author: </Form.Label>
          <Form.Control
            id='authorField'
            type='text'
            name='author'
            value={blogAuthor}
            onChange={handleAuthorChange}
          />
          <Form.Label>URL: </Form.Label>
          <Form.Control
            id='urlField'
            type='text'
            name='url'
            value ={blogUrl}
            onChange={handleUrlChange}
          />
          <Button variant='primary' id='submitButton' type='submit'> Create blog</Button>
        </Form.Group>
      </Form>
    </div>
  )
})

BlogForm.displayName = 'BlogForm'

BlogForm.propTypes = {
  createNewBlog: PropTypes.func.isRequired
}

export default BlogForm