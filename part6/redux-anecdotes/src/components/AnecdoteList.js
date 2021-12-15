import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteFor, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { clearNotification, setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteList = () => {
  useEffect(() => {
    anecdoteService.getAll()
      .then(anecdotes => dispatch(initializeAnecdotes(anecdotes)))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const state = useSelector(state => state)
  const anecdotes = state.anecdotes
  const filter = state.filter
  console.log(anecdotes)
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