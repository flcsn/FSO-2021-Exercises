const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const sortByVotes = (a, b) => {
  if (a.votes > b.votes) return -1
  else if (a.votes < b.votes) return 1
  return 0
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
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
      const content = action.data.content
      const newAnecdote = {
        content,
        id: getId(),
        votes: 0
      }
      console.log(newAnecdote)
      return state.concat(newAnecdote)
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

export const createNew = content => {
  return {
    type: 'CREATE',
    data: { content }
  }
}

export default reducer