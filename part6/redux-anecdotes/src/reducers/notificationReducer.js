const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data.message
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = (message, timeInSeconds) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message }
    })
    const newTimeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, timeInSeconds*1000)
    dispatch({
      type: 'SET_TIMEOUT_ID',
      data: { 
        timeoutId: newTimeoutId 
      }
    })
  }
}

export default reducer