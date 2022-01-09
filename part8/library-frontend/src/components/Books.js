import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [filter, setFilter] = useState('')
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return (
      <div>
        loading...
      </div>
    )
  }

  const books = result.data.allBooks
  let filteredBooks
  if (filter === '')
    filteredBooks = books 
  else {
    filteredBooks = books.filter(book => book.genres.includes(filter))
  }

  const genreSet = new Set()
  books.map(book => book.genres.forEach(genre => genreSet.add(genre)))
  const genreArray = Array.from(genreSet)

  return (
    <div>
      <h2>books</h2>
      {filter === ''
        ? <p> showing <strong>all</strong> books </p>
        : <p> in genre <strong>{filter}</strong> </p>
      }

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <select defaultValue='Filter by genre' onChange={({ target }) => setFilter(target.value)}>
        <option disabled hidden>Filter by genre</option>
        <option value=''>show all</option>
        {genreArray.map(genre => 
          <option key={genre} value={genre}>{genre}</option>
        )}
      </select>
    </div>
  )
}

export default Books