const initialState = {
  message: '',
  type: '',
  timeoutId: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION': {
      clearTimeout(state.timeoutId)
      return action.data
    }
    case 'CLEAR_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const notificationSuccess = (message) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message,
        type: 'SUCCESS',
        timeoutId: setTimeout(() => {
          dispatch({
            type: 'CLEAR_NOTIFICATION'
          })
        }, 5000)
      }
    })
  }
}

export const notificationFail = (message) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message,
        type: 'FAILURE'
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, 5000)
  }
}

export default reducer