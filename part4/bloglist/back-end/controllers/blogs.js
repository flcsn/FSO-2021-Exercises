const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const userExtractor = require('../utils/middleware').userExtractor

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  if (!request.body.title || !request.body.url) 
    response.status(400).end()

  const body = request.body
  const user = await User.findById(request.user)
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const requestor = request.user
  const blogToDelete = await Blog.findById(request.params.id)
  const creatorOfBlog = blogToDelete.user.toString()

  if (requestor !== creatorOfBlog) {
    return response.status(401).json({
      error: "only the creator may delete this blog"
    })
  }

  await Blog.deleteOne(blogToDelete)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }

  const result = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
  response.json(result)
})

module.exports = blogsRouter