const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
    .populate('blogs', { title: 1, url: 1, likes: 1 })

  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  const body = req.body

  if (body.password.length < 3) {
    return res.status(400).json({
      error: 'password must be at least 3 characters long'
    })
  }

  const data = {
    username: body.username,
    passwordHash: await bcrypt.hash(body.password, 10),
    name: body.name
  }

  const newUser = new User(data)
  const result = await newUser.save()
  res.json(result)
})

module.exports = usersRouter
