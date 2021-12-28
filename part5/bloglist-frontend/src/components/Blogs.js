import React from 'react'
import BlogList from './BlogList'
import BlogInfo from './BlogInfo'
import {
  Switch, Route,
  useRouteMatch
} from 'react-router-dom'

const Blogs = (props) => {
  const { blogs, ...others } = props

  if (blogs.length === 0)
    return null

  const match = useRouteMatch('/blogs/:id')
  const blog = match
    ? blogs.find(b => b.id === match.params.id)
    : null

  return (
    <div>
      <Switch>
        <Route path='/blogs/:id'>
          <BlogInfo blog={blog} props={others}/>
        </Route>
        <Route path='/blogs'>
          <BlogList blogs={blogs}/>
        </Route>
      </Switch>
    </div>
  )
}

export default Blogs