import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS, GET_BOOKS_BY_GENRE} from '../queries'

const NewBook = ({ show, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ addBook ] = useMutation(ADD_BOOK, {
    refetchQueries: [{
      query: ALL_AUTHORS
    }, {
      query: ALL_BOOKS
    }],
    onError: (error) => {
      console.log(JSON.stringify(error))
    },
    update: (store, response) => {
      const dataInStore = store.readQuery({ 
        query: GET_BOOKS_BY_GENRE, 
        variables: { genre: user.favoriteGenre } 
      })
      if (response.data.addBook.genres.includes(user.favoriteGenre)) {
        store.writeQuery({
          query: GET_BOOKS_BY_GENRE,
          variables: { genre: user.favoriteGenre },
          data: {
            ...dataInStore,
            allBooks: [ ...dataInStore.allBooks, response.data.addBook ]
          }
        })
      }
    }
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    
    console.log('add book...')
    addBook({
      variables: {
        title,
        author,
        published: Number(published),
        genres
      }
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
