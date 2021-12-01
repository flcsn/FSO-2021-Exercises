import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

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
      <form onSubmit={createNewBlog}>
        <label>title: </label>
        <input type='text' name='title' value={blogTitle} onChange={handleTitleChange}/>
        <br/>
        <label>author: </label>
        <input type='text' name='author' value={blogAuthor} onChange={handleAuthorChange}/>
        <br/>
        <label>url: </label>
        <input type='text' name='url' value ={blogUrl} onChange={handleUrlChange}/>
        <br/>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
})

BlogForm.displayName = 'BlogForm'

BlogForm.propTypes = {
  createNewBlog: PropTypes.func.isRequired
}

export default BlogForm