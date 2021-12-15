import anecdoteService from '../services/anecdotes'

const sortByVotes = (a, b) => {
  if (a.votes > b.votes) return -1
  else if (a.votes < b.votes) return 1
  return 0
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const votedAnecdote = action.data
      const newState = state.map(a => a.id !== votedAnecdote.id ? a : votedAnecdote)
      return newState.sort(sortByVotes)
    case 'CREATE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default: 
      return state 
  } 
}

export const voteFor = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = { 
      ...anecdote, 
      votes: anecdote.votes + 1
    }
    const updatedAnecdote = await anecdoteService.update(votedAnecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const createNew = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const sortedAnecdotes = anecdotes.sort(sortByVotes)
    dispatch({
      type: 'INIT_ANECDOTES',
      data: sortedAnecdotes
    })
  }
}

export default reducer