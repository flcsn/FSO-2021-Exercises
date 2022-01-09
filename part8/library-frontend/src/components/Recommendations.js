import React, { useEffect, useState } from 'react'
import { GET_BOOKS_BY_GENRE } from '../queries'
import { useLazyQuery } from '@apollo/client'

const Recommendations = ({ show, user }) => {
  const [ recommendations, setRecommendations ] = useState([])
  const [getBook, result] = useLazyQuery(GET_BOOKS_BY_GENRE)

  useEffect(() => {
    if (user)
      getBook({ variables: { genre: user.favoriteGenre }})
  }, [user]) //eslint-disable-line

  useEffect(() => {
    if (result.data)
      setRecommendations(result.data.allBooks)
  }, [result]) //eslint-disable-line

  if (!show)
    return null

  if (!recommendations) {
    return (
      <div>
        generating recommendations...
      </div>
    )
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{user.favoriteGenre}</strong></p>
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
          {recommendations.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations