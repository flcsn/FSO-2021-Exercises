import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteFor, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const state = useSelector(state => state)
  const anecdotes = state.anecdotes
  const filter = state.filter
  console.log(anecdotes)
  const filteredAnecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filter))

  const vote = (id) => {
    const anecdote = anecdotes.find(a => a.id === id)
    console.log('voted for', anecdote.content)
    dispatch(voteFor(anecdote))
    dispatch(setNotification(`Successfully voted for anecdote: '${anecdote.content}'`, 5))
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