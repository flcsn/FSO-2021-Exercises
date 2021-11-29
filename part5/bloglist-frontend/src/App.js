import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [notification, setNotification] = useState({
    message: '',
    type: ''
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }

    try {
      const result = await blogService.create(newBlog)
      console.log(result)
      setBlogs(blogs.concat(newBlog))
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
      setNotification({
        message: `created new blog ${blogTitle} successfully!`,
        type: 'success'
      })
      clearNotification()
    } catch (e) {
      setNotification({
        message: `failed to create new blog ${blogTitle}`,
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
        <Login handleLogin={handleLogin} username={username} password={password}
          usernameChange={({ target }) => setUsername(target.value)} passwordChange={({ target }) => setPassword(target.value)}/>
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
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      <h2>create new</h2>
      <form onSubmit={createNewBlog}>
        <input type='text' name='title' value={blogTitle} onChange={({target}) => setBlogTitle(target.value)}/>
        <input type='text' name='author' value={blogAuthor} onChange={({target}) => setBlogAuthor(target.value)}/>
        <input type='text' name='url' value ={blogUrl} onChange={({target}) => setBlogUrl(target.value)}/>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default App