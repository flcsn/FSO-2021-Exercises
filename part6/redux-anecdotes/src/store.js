import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import notificationTimeoutReducer from './reducers/notificationTimeoutReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const Store = () => {
  const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer,
    notificationTimeoutId: notificationTimeoutReducer
  })

  return createStore(
    reducer, 
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  )
}

export default Store