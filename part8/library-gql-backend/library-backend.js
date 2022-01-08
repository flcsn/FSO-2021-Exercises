const { ApolloServer, gql } = require('apollo-server')
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core')
const { v1: uuid } = require('uuid')
const Book = require('./models/book')
const Author = require('./models/author')
const mongoose = require('mongoose')
const author = require('./models/author')

const MONGODB_URI = 'mongodb+srv://frankie:Sicarius98@cluster0.yu54g.mongodb.net/gql-library?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log('connected to MongoDB'))
  .catch((error => console.log('error connecting to MongoDB', error.message)))

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const author = await Author.findOne({ name: args.author })
      const genre = args.genre

      if (author && genre)
        return Book.find({ author, genres: genre }).populate('author', { name: 1, born: 1, bookCount: 1 })
      else if (author) 
        return Book.find({ author }).populate('author', { name: 1, born: 1, bookCount: 1 })
      else if (genre)
        return Book.find({ genres: { $in: [genre]} }).populate('author', { name: 1, born: 1, bookCount: 1 })
      return Book.find({}).populate('author', { name: 1, born: 1, bookCount: 1 })
    },
    allAuthors: async () => await Author.find({})
  },
  Author: {
    bookCount: async (root) => {
      const booksAuthored = await Book.find({ author: root })
      return booksAuthored.length
    } 
  },
  Mutation: {
    addBook: async (root, args) => {
      const authors = await Author.find({})
      const authorNames = authors.map(a => a.name)
      if (!authorNames.includes(args.author)) {
        const newAuthor = new Author({ name: args.author })
        await newAuthor.save()  
      }

      const author = await Author.findOne({ name: args.author })
      const newBook = new Book({ 
        ...args,
        author
      })

      await newBook.save()
      return newBook
    },
    editAuthor: async (root, args) => {
      const authorToEdit = await Author.findOne({ name: args.name })
      console.log(authorToEdit)

      if (!authorToEdit)
        return null

      authorToEdit.born = args.setBornTo
      return authorToEdit.save()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground()
  ]
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})