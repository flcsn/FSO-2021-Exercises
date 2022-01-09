const { ApolloServer, gql } = require('apollo-server')
const { ApolloServerPluginLandingPageGraphQLPlayground, UserInputError } = require('apollo-server-core')
const { v1: uuid } = require('uuid')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const MONGODB_URI = 'mongodb+srv://frankie:Sicarius98@cluster0.yu54g.mongodb.net/gql-library?retryWrites=true&w=majority'
const JWT_SECRET = 'SECRET_KEY'

console.log('connecting to database')
mongoose.connect(MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log('connected to MongoDB'))
  .catch((error => console.log('error connecting to MongoDB', error.message)))

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

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
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
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
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => context.currentUser
  },
  Author: {
    bookCount: async (root) => {
      const booksAuthored = await Book.find({ author: root })
      return booksAuthored.length
    } 
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        console.log('login required to use this mutation')
        return
      }
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
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        console.log('login required to use this mutation')
        return
      }
      const authorToEdit = await Author.findOne({ name: args.name })
      console.log(authorToEdit)

      if (!authorToEdit)
        return null

      authorToEdit.born = args.setBornTo
      return authorToEdit.save()
    },
    createUser: (root, args) => {
      const newUser = new User({ ...args })
      return newUser.save()
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'password')
        throw new UserInputError('wrong credentials')

      const userForToken = {
        username: user.username,
        id: user._id
      }

      const token = jwt.sign(userForToken, JWT_SECRET)
      console.log('token is ', token)
      return { value: token }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground()
  ]
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})