const sortByVotes = (a, b) => {
  if (a.votes > b.votes) return -1
  else if (a.votes < b.votes) return 1
  return 0
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const anecdoteId = action.data.id
      const anecdote = state.find(a => a.id === anecdoteId)
      const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }

      const newState = state.map(a => a.id !== anecdoteId ? a : updatedAnecdote)
      return newState.sort(sortByVotes)
    case 'CREATE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      const anecdotes = action.data.anecdotes
      return anecdotes
    default: 
      return state 
  } 
}

export const voteFor = id => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createNew = anecdote => {
  return {
    type: 'CREATE',
    data: anecdote
  }
}

export const initializeAnecdotes = anecdotes => {
  return {
    type: 'INIT_ANECDOTES',
    data: { anecdotes }
  }
}

export default reducer