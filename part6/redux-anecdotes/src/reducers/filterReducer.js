const reducer = (state = '', action) => {
  console.log('typed')
  switch (action.type) {
    case ('TYPE'):
      return action.data.value
    default:
      return state
  }
}

export const type = (value) => {
  return {
    type: 'TYPE',
    data: { value }
  }
}

export default reducer