const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_TIMEOUT_ID':
      clearTimeout(state)
      return action.data.timeoutId
    default: 
      return state
  } 
}

export default reducer