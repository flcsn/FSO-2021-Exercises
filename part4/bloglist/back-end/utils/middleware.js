const logger = require('./logger')
const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  let token = ""
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7)
  } else token = null

  request.token = token
  next()
}

const userExtractor = (request, response, next) => {
  const token = request.token
  if (!token) {
    return response.status(401).json({
      error: 'missing token'
    })
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken) {
    return response.status(401).json({
      error: 'invalid token'
    })
  }

  request.user = decodedToken.id
  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'malformatted id'
    })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message
    })
  }

  next(error)
}

module.exports = {
  tokenExtractor,
  userExtractor,
  errorHandler
}