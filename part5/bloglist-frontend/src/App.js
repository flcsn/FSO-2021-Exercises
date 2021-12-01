import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState({
    message: '',
    type: ''
  })

  const blogFormVisibility = useRef()
  const blogFormValues = useRef()

  const sortByLikes = (a, b) => {
    if (a.likes > b.likes) return -1
    if (a.likes < b.likes) return 1
    return 0
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort(sortByLikes))
    )
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('bloglistUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user)
    }
  }, [])

  const clearNotification = () => {
    setTimeout(() => {
      setNotification({
        message: '',
        type: ''
      })
    }, 5000)
  }

  const handleLogin = async event => {
    try {
      event.preventDefault()
      console.log('logging in with', username, password)
      const user = await blogService.login({ username, password })
      window.localStorage.setItem('bloglistUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user)
      setUsername('')
      setPassword('')
      setNotification({
        message: 'logged in successfully!',
        type: 'success'
      })
      clearNotification()
    } catch (e) {
      console.log(e)
      setNotification({
        message: 'login failed',
        type: 'fail'
      })
      clearNotification()
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    console.log('logging out')
    window.localStorage.removeItem('bloglistUser')
    setUser(null)
    blogService.removeToken()
    setNotification({
      message: 'logged out successfully!',
      type: 'success'
    })
    clearNotification()
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
      const result = await blogService.create(newBlog)
      console.log(result)
      const b = await blogService.getAll()
      setBlogs(b.sort(sortByLikes))
      setNotification({
        message: `created new blog ${newBlog.title} successfully!`,
        type: 'success'
      })
      clearNotification()
    } catch (e) {
      setNotification({
        message: `failed to create new blog ${newBlog.title}`,
        type: 'fail'
      })
      clearNotification()
      console.log(e)
    }
  }

  const addLike = async (blog, event) => {
    event.preventDefault()
    const updatedBlog = { ...blog,  likes: blog.likes + 1 }

    try {
      const result = await blogService.update(updatedBlog)
      console.log(result)
      const b = await blogService.getAll()
      setBlogs(b.sort(sortByLikes))
      setNotification({
        message: `updated blog ${updatedBlog.title} successfully!`,
        type: 'success'
      })
      clearNotification()
    } catch (e) {
      setNotification({
        message: `failed to update blog ${updatedBlog.title}`,
        type: 'fail'
      })
      clearNotification()
      console.log(e)
    }
  }

  const removeBlog = async (blog, event) => {
    event.preventDefault()
    const result = window.confirm(`Remove blog ${blog.title}?`)
    if (!result) return

    try {
      const result = await blogService.remove(blog)
      console.log(result)
      const b = await blogService.getAll()
      setBlogs(b.sort(sortByLikes))
      setNotification({
        message: `removed blog ${blog.title} successfully!`,
        type: 'success'
      })
      clearNotification()
    } catch (e) {
      setNotification({
        message: `failed to remove blog ${blog.title}`,
        type: 'fail'
      })
      clearNotification()
      console.log(e)
    }
  }


  if (!user) {
    return (
      <div>
        <Notification notification={notification} />
        <Login
          handleLogin={handleLogin}
          username={username}
          password={password}
          usernameChange={({ target }) => setUsername(target.value)}
          passwordChange={({ target }) => setPassword(target.value)}
        />
      </div>
    )
  }

  return (
    <div>
      <Notification notification={notification} />
      <h2>blogs</h2>
      <div>
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>log out</button>
        </p>
      </div>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} addLike={event => addLike(blog, event)} removeBlog={event => removeBlog(blog, event)} user={user.username}/>)}
      <Togglable buttonLabel='create new form' ref={blogFormVisibility}>
        <BlogForm createNewBlog={createNewBlog} ref={blogFormValues}/>
      </Togglable>
    </div>
  )
}

export default App