import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name,
      born,
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title,
      author {
        name,
        born,
        bookCount
      }
      published,
      genres
    }
  }
`

export const GET_BOOKS_BY_GENRE = gql`
  query booksByGenre($genre: String!) {
    allBooks(genre: $genre) {
      title,
      author {
        name
      }
      genres,
      published
    }
  }
`

export const CURRENT_USER = gql`
  query {
    me {
      username,
      favoriteGenre
    }
  }
`

export const ADD_BOOK = gql`
  mutation addNewBook(
    $title: String!, 
    $author: String!, 
    $published: Int!, 
    $genres: [String!]!
    ) {
    addBook(
      title: $title, 
      author: $author, 
      published: $published, 
      genres: $genres
      ) {
        title,
        author {
          name
        }
        published,
        genres
    }
  }
`

export const SET_BIRTHYEAR = gql`
  mutation setBirthYear(
    $name: String!,
    $born: Int!
  ) {
    editAuthor(
      name: $name,
      setBornTo: $born
    ) {
      name,
      born,
      bookCount
    }
  }
`

export const LOGIN = gql`
  mutation login(
    $username: String!,
    $password: String!
  ) {
    login(
      username: $username,
      password: $password
    ) {
      value
    }
  }
`

