import React from 'react'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <div key={blog.id} style={blogStyle}>
          <Link href='#' to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
        </div>
      )}
    </div>
  )
}

export default BlogList