import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'

import { CURRENT_USER, LOGIN } from './queries'
import { useApolloClient, useLazyQuery, useMutation } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const client = useApolloClient()

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => console.log(error.graphQLErrors[0].message)
  })
  const [getUser, userResult] = useLazyQuery(CURRENT_USER)

  const handleLogin = (username, password) => {
    console.log('logging in with', username, password)
    login({ variables: { username, password } })
  }

  const handleLogout = () => {
    console.log('logging out')
    setToken(null)
    window.localStorage.removeItem('library-user-token')
    client.resetStore()
    setPage('login')
  }

  useEffect(() => {
    const t = localStorage.getItem('library-user-token')
    if (t) {
      setToken(t)
      getUser()
    }
  }, []) // eslint-disable-line

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      window.localStorage.setItem('library-user-token', token)
      console.log('login successful')
      getUser()
    }
  }, [result.data]) // eslint-disable-line

  useEffect(() => {
    if (userResult.data) {
      console.log('userResult.data', userResult.data)
      setUser(userResult.data.me)
      console.log('user is', user)
    }
  }, [userResult]) // eslint-disable-line

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommendations')}>recommendations</button>}
        {token
          ? <button onClick={() => handleLogout()}>logout</button>
          : <button onClick={() => setPage('login')}>login</button>
        } 
      </div>

      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} user={user} />
      <Recommendations show={page === 'recommendations'} user={user}/>
      {!token && <Login show={page === 'login'} handleLogin={handleLogin}/>}
    </div>
  )
}

export default App