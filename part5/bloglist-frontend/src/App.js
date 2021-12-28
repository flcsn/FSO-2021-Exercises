import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, createBlog, addLike as like, deleteBlog } from './reducers/blogReducer'
import { login, logout, saveLocalUser } from './reducers/userReducer'
import { useField } from './hooks/index'
import { BrowserRouter as Router } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('bloglistUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      dispatch(saveLocalUser(user))
    }
  }, [])

  const state = useSelector(state => state)
  const blogs = state.blogs
  const user = state.user
  const notification = state.notification

  const username = useField('text')
  const password = useField('password')

  const blogFormVisibility = useRef()
  const blogFormValues = useRef()

  const handleLogin = async event => {
    event.preventDefault()

    try {
      dispatch(login(username, password))
      username.clearOnSubmit()
      password.clearOnSubmit()
    } catch (e) {
      console.log(e)
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    dispatch(logout())
  }

  const createNewBlog = async event => {
    event.preventDefault()
    blogFormVisibility.current.toggleVisibility()

    const newBlog = {
      title: blogFormValues.current.blogTitle,
      author: blogFormValues.current.blogAuthor,
      url: blogFormValues.current.blogUrl
    }

    try {
      dispatch(createBlog(newBlog))
    } catch (e) {
      console.log(e)
    }
  }

  const addLike = async (blog, event) => {
    event.preventDefault()
    try {
      dispatch(like(blog))
    } catch (e) {
      console.log(e)
    }
  }

  const removeBlog = async (blog, event) => {
    event.preventDefault()
    const result = window.confirm(`Remove blog ${blog.title}?`)
    if (!result) return

    try {
      dispatch(deleteBlog(blog))
    } catch (e) {
      console.log(e)
    }
  }


  if (!user) {
    return (
      <div>
        <Notification notification={notification} />
        <Login
          handleLogin={handleLogin}
          username={username.value}
          password={password.value}
          usernameChange={username.onChange}
          passwordChange={password.onChange}
        />
      </div>
    )
  }

  return (
    <div>
      <Notification notification={notification} />
      <h2>Blogs</h2>
      <div>
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>log out</button>
        </p>
      </div>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} addLike={(event) => addLike(blog, event)} removeBlog={event => removeBlog(blog, event)} user={user.username}/>)}
      <Togglable buttonLabel='create new blog' ref={blogFormVisibility}>
        <BlogForm createNewBlog={createNewBlog} ref={blogFormValues}/>
      </Togglable>
      <Router>
        <Users />
      </Router>
    </div>
  )
}

export default App