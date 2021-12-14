import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { clearNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const state = useSelector(state => state)
  const anecdotes = state.anecdotes
  const filter = state.filter
  const filteredAnecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filter))
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('voted for', id)
    dispatch(voteFor(id))

    const anecdote = anecdotes.find(a => a.id === id)
    dispatch(setNotification(`Successfully voted for anecdote: '${anecdote.content}'`))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }

  return (
    <div>
    <h2>Anecdotes</h2>
      {filteredAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList