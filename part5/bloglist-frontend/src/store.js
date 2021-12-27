import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'

const Store = () => {
  const reducer = combineReducers({
    blogs: blogReducer,
    user: userReducer,
    notification: notificationReducer
  })

  return createStore(
    reducer,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  )
}

export default Store