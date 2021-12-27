import blogService from '../services/blogs'
import { notificationFail, notificationSuccess } from './notificationReducer'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'LOG_IN_SUCCESS':
      return action.data
    case 'LOG_IN_FAIL':
      console.log(action.error)
      return null
    case 'LOG_OUT':
      return null
    default:
      return state
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    const credentials = {
      username: username.value,
      password: password.value
    }
    console.log('logging in with', credentials)
    let user = null
    try {
      user = await blogService.login(credentials)
    } catch (e) {
      console.log(e.message)
      dispatch(notificationFail('login failed'))
      return
    }
    window.localStorage.setItem('bloglistUser', JSON.stringify(user))
    blogService.setToken(user)
    dispatch({
      type: 'LOG_IN_SUCCESS',
      data: user
    })
    dispatch(notificationSuccess('logged in successfully!'))
  }
}

export const logout = () => {
  return async dispatch => {
    console.log('logging out')
    window.localStorage.removeItem('bloglistUser')
    blogService.removeToken()
    dispatch({
      type: 'LOG_OUT'
    })
    dispatch(notificationSuccess('logged out successfully!'))
  }
}

export const saveLocalUser = (user) => {
  console.log('local user is', user)
  blogService.setToken(user)
  return {
    type: 'LOG_IN_SUCCESS',
    data: user
  }
}



export default reducer