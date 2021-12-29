import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogList = ({ blogs }) => {
  return (
    <div>
      <h2>Blogs</h2>
      <Table striped>
        <tbody>
          {blogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link href='#' to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList